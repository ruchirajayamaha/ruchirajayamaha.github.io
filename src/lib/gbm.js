// Geometric Brownian Motion Monte Carlo engine, free of React and canvas concerns.

export const S0 = 100;
export const HORIZON_YEARS = 1;
export const STEPS = 252;
export const MAX_PATHS = 1000;

// Quantiles are taken on every third trading day: full resolution adds cost, not visible detail.
const BAND_STRIDE = 3;
const Z_95 = 1.6448536269514722;

// Seeded so a run is reproducible and shocks can be reused across slider changes.
const mulberry32 = (seed) => {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

// Standard normal draws via Box-Muller, laid out as MAX_PATHS rows of STEPS columns.
export function generateShocks(seed) {
  const random = mulberry32(seed);
  const shocks = new Float32Array(MAX_PATHS * STEPS);

  for (let i = 0; i < shocks.length; i += 2) {
    const radius = Math.sqrt(-2 * Math.log(1 - random()));
    const angle = 2 * Math.PI * random();
    shocks[i] = radius * Math.cos(angle);
    if (i + 1 < shocks.length) shocks[i + 1] = radius * Math.sin(angle);
  }

  return shocks;
}

// Linear interpolation between order statistics of an ascending array.
const quantile = (sorted, q) => {
  const position = (sorted.length - 1) * q;
  const lower = Math.floor(position);
  const upper = Math.min(lower + 1, sorted.length - 1);
  return sorted[lower] + (sorted[upper] - sorted[lower]) * (position - lower);
};

export function closedFormMetrics({ mu, sigma }) {
  const logDrift = (mu - 0.5 * sigma * sigma) * HORIZON_YEARS;
  const logVol = sigma * Math.sqrt(HORIZON_YEARS);

  return {
    expectedTerminal: S0 * Math.exp(mu * HORIZON_YEARS),
    var95: S0 * (1 - Math.exp(logDrift - Z_95 * logVol)),
    sharpe: mu / sigma,
  };
}

// Applies the exact log-normal transition, so no Euler discretisation bias enters at any step size.
export function simulateGBM(shocks, { mu, sigma, paths }) {
  const dt = HORIZON_YEARS / STEPS;
  const drift = (mu - 0.5 * sigma * sigma) * dt;
  const diffusion = sigma * Math.sqrt(dt);
  const columns = STEPS + 1;
  const prices = new Float32Array(paths * columns);

  let returnSum = 0;
  let returnSquaredSum = 0;

  for (let path = 0; path < paths; path += 1) {
    const row = path * columns;
    const shockRow = path * STEPS;
    let price = S0;
    prices[row] = price;

    for (let step = 0; step < STEPS; step += 1) {
      const next = price * Math.exp(drift + diffusion * shocks[shockRow + step]);
      const simpleReturn = next / price - 1;
      returnSum += simpleReturn;
      returnSquaredSum += simpleReturn * simpleReturn;
      prices[row + step + 1] = next;
      price = next;
    }
  }

  const bandSteps = [];
  for (let step = 0; step <= STEPS; step += BAND_STRIDE) bandSteps.push(step);

  const bands = { steps: bandSteps, p5: [], p50: [], p95: [] };
  const cross = new Float32Array(paths);
  for (const step of bandSteps) {
    for (let path = 0; path < paths; path += 1) cross[path] = prices[path * columns + step];
    cross.sort();
    bands.p5.push(quantile(cross, 0.05));
    bands.p50.push(quantile(cross, 0.5));
    bands.p95.push(quantile(cross, 0.95));
  }

  // The final band step is day 252, so `cross` now holds the sorted terminal distribution.
  const terminal = cross;
  const expectedTerminal = terminal.reduce((sum, value) => sum + value, 0) / paths;

  const observations = paths * STEPS;
  const meanReturn = returnSum / observations;
  const returnVariance = returnSquaredSum / observations - meanReturn * meanReturn;

  return {
    prices,
    paths,
    bands,
    terminal,
    terminalQ01: quantile(terminal, 0.01),
    terminalQ99: quantile(terminal, 0.99),
    metrics: {
      expectedTerminal,
      var95: S0 - bands.p5[bands.p5.length - 1],
      sharpe: (meanReturn * STEPS) / (Math.sqrt(returnVariance) * Math.sqrt(STEPS)),
    },
    closedForm: closedFormMetrics({ mu, sigma }),
  };
}
