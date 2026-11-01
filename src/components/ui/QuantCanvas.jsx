import { useEffect, useMemo, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { FlaskConical, RefreshCw, Sigma } from 'lucide-react';
import { generateShocks, HORIZON_YEARS, MAX_PATHS, S0, simulateGBM, STEPS } from '../../lib/gbm';
import MathFormula from '../MathFormula';

const MAX_DRAWN_PATHS = 150;
const REVEAL_MS = 1100;
const HISTOGRAM_BINS = 28;
const PAD = { top: 14, right: 8, bottom: 24, left: 40 };

// Validated for CVD separation on the card surface: indigo = distribution, amber = downside tail.
const COLORS = {
  surface: '#0b1120',
  grid: 'rgba(148, 163, 184, 0.12)',
  axis: '#64748b',
  label: '#cbd5e1',
  path: '148, 163, 184',
  band: 'rgba(129, 140, 248, 0.16)',
  median: '#818cf8',
  tail: '#f59e0b',
  histogram: 'rgba(129, 140, 248, 0.55)',
};

const SLIDERS = [
  { key: 'mu', symbol: 'μ', label: 'Drift', min: -0.2, max: 0.4, step: 0.01, format: (v) => `${(v * 100).toFixed(0)}%` },
  { key: 'sigma', symbol: 'σ', label: 'Volatility', min: 0.05, max: 0.8, step: 0.01, format: (v) => `${(v * 100).toFixed(0)}%` },
  { key: 'paths', symbol: 'N', label: 'Simulated Paths', min: 50, max: MAX_PATHS, step: 50, format: (v) => v.toLocaleString('en-US') },
];

const niceTicks = (min, max, count = 5) => {
  const rough = (max - min) / count;
  const magnitude = 10 ** Math.floor(Math.log10(rough));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * magnitude).find((candidate) => candidate >= rough);
  const ticks = [];
  for (let tick = Math.ceil(min / step) * step; tick <= max; tick += step) ticks.push(tick);
  return ticks;
};

const getScales = (width, height, result) => {
  const histogramWidth = Math.round(Math.min(110, width * 0.16));
  const plot = {
    left: PAD.left,
    right: width - PAD.right - histogramWidth - 8,
    top: PAD.top,
    bottom: height - PAD.bottom,
  };
  const yMin = Math.min(...result.bands.p5, result.terminalQ01) * 0.96;
  const yMax = Math.max(...result.bands.p95, result.terminalQ99) * 1.04;

  return {
    plot,
    histogramWidth,
    yMin,
    yMax,
    x: (step) => plot.left + (step / STEPS) * (plot.right - plot.left),
    y: (value) => plot.bottom - ((value - yMin) / (yMax - yMin)) * (plot.bottom - plot.top),
  };
};

const drawAxes = (ctx, scales, width) => {
  const { plot, x, y, yMin, yMax } = scales;
  ctx.font = '10px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
  ctx.lineWidth = 1;
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'right';

  for (const tick of niceTicks(yMin, yMax)) {
    const yPos = Math.round(y(tick)) + 0.5;
    ctx.strokeStyle = COLORS.grid;
    ctx.beginPath();
    ctx.moveTo(plot.left, yPos);
    ctx.lineTo(width - PAD.right, yPos);
    ctx.stroke();
    ctx.fillStyle = COLORS.axis;
    ctx.fillText(tick.toFixed(0), plot.left - 8, yPos);
  }

  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  [0, 3, 6, 9, 12].forEach((month) => {
    ctx.fillText(month === 0 ? '0' : `${month}m`, x((month / 12) * STEPS), plot.bottom + 16);
  });
};

const drawLine = (ctx, values, steps, count, scales, color, lineWidth) => {
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.beginPath();
  for (let i = 0; i < count; i += 1) {
    const xPos = scales.x(steps[i]);
    const yPos = scales.y(values[i]);
    if (i === 0) ctx.moveTo(xPos, yPos);
    else ctx.lineTo(xPos, yPos);
  }
  ctx.stroke();
};

const drawHistogram = (ctx, result, scales, width, progress) => {
  const { plot, yMin, yMax, y, histogramWidth } = scales;
  const counts = new Array(HISTOGRAM_BINS).fill(0);
  const binSize = (yMax - yMin) / HISTOGRAM_BINS;

  for (const value of result.terminal) {
    const bin = Math.floor((value - yMin) / binSize);
    if (bin >= 0 && bin < HISTOGRAM_BINS) counts[bin] += 1;
  }

  const peak = Math.max(...counts);
  const left = width - PAD.right - histogramWidth;
  const tailCutoff = result.bands.p5[result.bands.p5.length - 1];
  const binPixels = (plot.bottom - plot.top) / HISTOGRAM_BINS;

  counts.forEach((count, bin) => {
    if (count === 0) return;
    const binMid = yMin + (bin + 0.5) * binSize;
    ctx.fillStyle = binMid < tailCutoff ? COLORS.tail : COLORS.histogram;
    ctx.fillRect(left, y(binMid) - binPixels / 2 + 1, (count / peak) * histogramWidth * progress, Math.max(binPixels - 2, 1));
  });
};

const drawLabel = (ctx, text, x, y, color) => {
  ctx.font = '600 10px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  ctx.lineWidth = 3;
  ctx.strokeStyle = COLORS.surface;
  ctx.strokeText(text, x, y);
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
};

const drawChart = (ctx, width, height, result, progress) => {
  const scales = getScales(width, height, result);
  const { plot, x, y } = scales;
  const { prices, paths, bands } = result;
  const columns = STEPS + 1;
  const visibleSteps = Math.max(1, Math.round(progress * STEPS));
  const visibleBands = Math.max(1, Math.floor(visibleSteps / bands.steps[1]) + 1);

  ctx.clearRect(0, 0, width, height);
  drawAxes(ctx, scales, width);

  ctx.save();
  ctx.beginPath();
  ctx.rect(plot.left, plot.top, plot.right - plot.left, plot.bottom - plot.top);
  ctx.clip();

  const drawnPaths = Math.min(paths, MAX_DRAWN_PATHS);
  ctx.strokeStyle = `rgba(${COLORS.path}, ${Math.max(0.1, Math.min(0.4, 18 / drawnPaths))})`;
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let path = 0; path < drawnPaths; path += 1) {
    const row = path * columns;
    ctx.moveTo(x(0), y(prices[row]));
    for (let step = 1; step <= visibleSteps; step += 1) ctx.lineTo(x(step), y(prices[row + step]));
  }
  ctx.stroke();

  ctx.fillStyle = COLORS.band;
  ctx.beginPath();
  for (let i = 0; i < visibleBands; i += 1) {
    if (i === 0) ctx.moveTo(x(bands.steps[i]), y(bands.p95[i]));
    else ctx.lineTo(x(bands.steps[i]), y(bands.p95[i]));
  }
  for (let i = visibleBands - 1; i >= 0; i -= 1) ctx.lineTo(x(bands.steps[i]), y(bands.p5[i]));
  ctx.closePath();
  ctx.fill();

  drawLine(ctx, bands.p5, bands.steps, visibleBands, scales, COLORS.tail, 1.5);
  drawLine(ctx, bands.p50, bands.steps, visibleBands, scales, COLORS.median, 2);
  ctx.restore();

  drawHistogram(ctx, result, scales, width, progress);

  if (progress === 1) {
    const last = bands.steps.length - 1;
    drawLabel(ctx, `Median ${bands.p50[last].toFixed(1)}`, plot.right - 4, y(bands.p50[last]) - 10, COLORS.label);
    drawLabel(ctx, `5th pct ${bands.p5[last].toFixed(1)}`, plot.right - 4, y(bands.p5[last]) + 11, COLORS.label);
  }

  return scales;
};

function MetricTile({ label, value, detail }) {
  return (
    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/90 min-w-0">
      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">{label}</span>
      <span className="text-xl sm:text-2xl font-bold text-slate-100 font-mono block mt-0.5">{value}</span>
      <span className="text-[11px] text-slate-400 block">{detail}</span>
    </div>
  );
}

function LegendKey({ className, children }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={className} aria-hidden="true" />
      {children}
    </span>
  );
}

function ProofOfWork({ result, seed }) {
  const { metrics, closedForm } = result;
  const rows = [
    { label: 'E[S_T]', simulated: metrics.expectedTerminal, exact: closedForm.expectedTerminal, digits: 2 },
    { label: 'VaR 95%', simulated: metrics.var95, exact: closedForm.var95, digits: 2 },
    { label: 'Sharpe proxy', simulated: metrics.sharpe, exact: closedForm.sharpe, digits: 3 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <div className="space-y-3 min-w-0">
        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/90">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-1">Asset price SDE</span>
          <MathFormula math="dS_t = \mu S_t \, dt + \sigma S_t \, dW_t" block={true} />
        </div>
        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/90">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-1">Exact log-normal transition</span>
          <MathFormula
            math="S_{t+\Delta t} = S_t \exp\left[\left(\mu - \tfrac{1}{2}\sigma^2\right)\Delta t + \sigma\sqrt{\Delta t}\, Z\right]"
            block={true}
          />
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          Because the transition is exact, no Euler discretisation bias enters. Slider moves reuse the same seeded shocks (common random numbers), so a path reacts to a parameter change rather than to fresh noise.
        </p>
      </div>

      <div className="space-y-3 min-w-0">
        <div className="overflow-x-auto rounded-xl border border-slate-800/90 bg-slate-950/80">
          <table className="w-full text-xs font-mono">
            <caption className="sr-only">Simulated metrics compared with closed-form values</caption>
            <thead>
              <tr className="text-slate-500 text-[10px] uppercase tracking-wider border-b border-slate-800">
                <th scope="col" className="text-left font-medium p-2.5">Metric</th>
                <th scope="col" className="text-right font-medium p-2.5">Simulated</th>
                <th scope="col" className="text-right font-medium p-2.5">Closed form</th>
                <th scope="col" className="text-right font-medium p-2.5">Gap</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="text-slate-300 border-b border-slate-800/60 last:border-0">
                  <th scope="row" className="text-left font-medium p-2.5 text-slate-200">{row.label}</th>
                  <td className="text-right p-2.5">{row.simulated.toFixed(row.digits)}</td>
                  <td className="text-right p-2.5">{row.exact.toFixed(row.digits)}</td>
                  <td className="text-right p-2.5 text-slate-400">{(row.simulated - row.exact).toFixed(row.digits)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          The simulation is checked live against theory: VaR uses the empirical 5th percentile of <span className="font-mono">S_T</span>, and Sharpe is the annualised ratio of pooled daily simple returns with <span className="font-mono">r_f = 0</span>, which tends to <span className="font-mono">μ/σ</span>. Gaps shrink at rate <span className="font-mono">1/√N</span>.
        </p>
        <p className="text-[11px] font-mono text-slate-500">
          S₀ = {S0} · T = {HORIZON_YEARS}y · Δt = 1/{STEPS} · seed {seed.toString(16)} · synthetic data, not investment advice
        </p>
      </div>
    </div>
  );
}

export default function QuantCanvas() {
  const shouldReduceMotion = useReducedMotion();
  const [params, setParams] = useState({ mu: 0.08, sigma: 0.25, paths: 300 });
  const [seed, setSeed] = useState(0x2f6e2b1);
  const [mode, setMode] = useState('lab'); // 'lab' | 'proof'
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [hasEntered, setHasEntered] = useState(false);
  const [hover, setHover] = useState(null);

  const sectionRef = useRef(null);
  const frameRef = useRef(null);
  const canvasRef = useRef(null);
  const scalesRef = useRef(null);
  const shouldAnimateRef = useRef(true);

  const shocks = useMemo(() => generateShocks(seed), [seed]);
  const result = useMemo(() => simulateGBM(shocks, params), [shocks, params]);
  const { metrics, closedForm } = result;

  useEffect(() => {
    const frame = frameRef.current;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  // Hold the opening reveal until the lab scrolls into view, since it sits below the hero.
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setHasEntered(true);
    }, { threshold: 0.2 });
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!hasEntered || size.width === 0 || size.height === 0) return undefined;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(size.width * dpr);
    canvas.height = Math.round(size.height * dpr);
    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const paint = (progress) => {
      scalesRef.current = drawChart(ctx, size.width, size.height, result, progress);
    };

    if (shouldReduceMotion || !shouldAnimateRef.current) {
      paint(1);
      return undefined;
    }

    let frameId;
    const start = performance.now();
    const tick = (now) => {
      const elapsed = Math.min((now - start) / REVEAL_MS, 1);
      paint(1 - (1 - elapsed) ** 3);
      if (elapsed < 1) frameId = requestAnimationFrame(tick);
      else shouldAnimateRef.current = false;
    };
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [hasEntered, result, size, shouldReduceMotion]);

  const updateParam = (key, value) => {
    shouldAnimateRef.current = false;
    setParams((current) => ({ ...current, [key]: value }));
  };

  const runSimulation = () => {
    shouldAnimateRef.current = true;
    setHover(null);
    setSeed(Math.floor(Math.random() * 0xffffffff));
  };

  const handlePointerMove = (e) => {
    const scales = scalesRef.current;
    if (!scales) return;
    const { plot } = scales;
    const pointerX = e.clientX - e.currentTarget.getBoundingClientRect().left;
    const ratio = Math.min(Math.max((pointerX - plot.left) / (plot.right - plot.left), 0), 1);
    const index = Math.round((ratio * STEPS) / result.bands.steps[1]);
    setHover({ index, left: scales.x(result.bands.steps[index]), flip: ratio > 0.55, top: plot.top, bottom: plot.bottom });
  };

  const summary = `Fan chart of ${params.paths} simulated price paths over one year from a start of ${S0}. Terminal median ${result.bands.p50.at(-1).toFixed(1)}, 5th percentile ${result.bands.p5.at(-1).toFixed(1)}, 95th percentile ${result.bands.p95.at(-1).toFixed(1)}.`;

  return (
    <section
      ref={sectionRef}
      id="quant-lab"
      aria-labelledby="quant-lab-title"
      className="scroll-mt-24 bg-slate-900/60 border border-slate-800/90 rounded-2xl p-5 sm:p-7 space-y-5 shadow-xl"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <span className="text-xs font-mono uppercase tracking-widest text-indigo-400">Monte Carlo · Geometric Brownian Motion</span>
          <h2 id="quant-lab-title" className="text-2xl font-bold tracking-tight text-white mt-1">Stress-test an asset yourself</h2>
          <p className="text-slate-400 text-sm mt-1 max-w-xl">
            Set drift and volatility, then watch risk metrics update live across up to {MAX_PATHS.toLocaleString('en-US')} simulated one-year price paths.
          </p>
        </div>

        <div className="inline-flex items-center p-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-xs font-mono" role="group" aria-label="Quant Lab view">
          {[
            { id: 'lab', label: 'Interactive Quant Lab', icon: FlaskConical },
            { id: 'proof', label: 'Proof-of-Work', icon: Sigma },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setMode(id)}
              aria-pressed={mode === id}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-medium whitespace-nowrap text-[11px] sm:text-xs transition ${
                mode === id ? 'bg-indigo-600 text-white shadow' : 'text-indigo-300 hover:text-indigo-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5 hidden sm:block" /> {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <MetricTile label="Expected terminal value" value={metrics.expectedTerminal.toFixed(2)} detail={`Theory ${closedForm.expectedTerminal.toFixed(2)} · S₀ = ${S0}`} />
        <MetricTile label="VaR 95% · 1 year" value={metrics.var95.toFixed(2)} detail={metrics.var95 < 0 ? 'Negative: tail still ends above S₀' : `Loss per ${S0} invested`} />
        <MetricTile label="Sharpe ratio proxy" value={metrics.sharpe.toFixed(2)} detail="Annualised, with r_f = 0" />
      </div>

      <div className={mode === 'lab' ? 'grid grid-cols-1 lg:grid-cols-12 gap-5' : 'hidden'}>
        <div className="lg:col-span-9 min-w-0 space-y-2">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-400">
            <LegendKey className="w-4 h-0.5 rounded-full bg-slate-500">Sample paths</LegendKey>
            <LegendKey className="w-3 h-3 rounded-sm bg-indigo-400/25">5th–95th pct</LegendKey>
            <LegendKey className="w-4 h-0.5 rounded-full bg-indigo-400">Median</LegendKey>
            <LegendKey className="w-4 h-0.5 rounded-full bg-amber-500">5th pct / VaR tail</LegendKey>
            <span className="ml-auto font-mono text-slate-500">
              Terminal distribution at right{params.paths > MAX_DRAWN_PATHS ? ` · drawing ${MAX_DRAWN_PATHS} of ${params.paths}` : ''}
            </span>
          </div>

          <div
            ref={frameRef}
            className="relative h-64 sm:h-80 rounded-xl bg-[#0b1120] border border-slate-800/90 overflow-hidden touch-pan-y"
            onPointerMove={handlePointerMove}
            onPointerLeave={() => setHover(null)}
          >
            <canvas ref={canvasRef} role="img" aria-label={summary} className="absolute inset-0 w-full h-full" />

            {hover && (
              <>
                <div
                  className="absolute w-px bg-slate-400/60 pointer-events-none"
                  style={{ left: hover.left, top: hover.top, height: hover.bottom - hover.top }}
                />
                <div
                  className="absolute top-4 w-36 p-2 rounded-lg bg-slate-950/95 border border-slate-700 text-[11px] font-mono pointer-events-none shadow-lg"
                  style={hover.flip ? { left: hover.left - 152 } : { left: hover.left + 8 }}
                >
                  <span className="block text-slate-500 mb-1">Day {result.bands.steps[hover.index]}</span>
                  {[
                    { label: '95th', value: result.bands.p95[hover.index], key: 'bg-indigo-400/40' },
                    { label: 'Median', value: result.bands.p50[hover.index], key: 'bg-indigo-400' },
                    { label: '5th', value: result.bands.p5[hover.index], key: 'bg-amber-500' },
                  ].map((row) => (
                    <span key={row.label} className="flex items-center gap-1.5">
                      <span className={`w-3 h-0.5 rounded-full shrink-0 ${row.key}`} aria-hidden="true" />
                      <span className="text-slate-100 font-semibold">{row.value.toFixed(1)}</span>
                      <span className="text-slate-400 ml-auto">{row.label}</span>
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="lg:col-span-3 flex flex-col justify-between gap-4 min-w-0">
          <div className="space-y-4">
            {SLIDERS.map((slider) => (
              <div key={slider.key}>
                <label htmlFor={`gbm-${slider.key}`} className="flex items-baseline justify-between text-xs text-slate-400 mb-1.5">
                  <span>{slider.label} <span className="font-mono text-slate-500">({slider.symbol})</span></span>
                  <span className="font-mono font-semibold text-slate-100">{slider.format(params[slider.key])}</span>
                </label>
                <input
                  id={`gbm-${slider.key}`}
                  type="range"
                  min={slider.min}
                  max={slider.max}
                  step={slider.step}
                  value={params[slider.key]}
                  onChange={(e) => updateParam(slider.key, Number(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>
            ))}
          </div>

          <button
            onClick={runSimulation}
            className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" /> Run Simulation
          </button>
        </div>
      </div>

      {mode === 'proof' && <ProofOfWork result={result} seed={seed} />}
    </section>
  );
}
