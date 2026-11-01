export const personalInfo = {
    name: "Ruchira Jayamaha",
    role: "Financial Mathematics & Industrial Statistics Undergraduate",
    tagline: "Applying financial mathematics, stochastic processes, and formal statistical inference to production ML systems.",
    bio: "Final-year Financial Mathematics & Industrial Statistics undergraduate at the University of Ruhuna, holding an Advanced Diploma in Data Science from NIBM. Focused on financial mathematics, time-series forecasting, quantitative modeling, and engineering scalable machine learning pipelines.",
    email: "ruchiralakshithainfo@gmail.com",
    github: "https://github.com/ruchirajayamaha",
    linkedin: "https://www.linkedin.com/in/ruchira-jayamaha",
    website: "https://ruchirajayamaha.me",
    location: "Sri Lanka",
    status: "Open for Data Science, ML & Quant Analytics Roles"
};

export const skillsData = [
    {
        category: "Mathematical & Statistical Rigor",
        badgeColor: "indigo",
        skills: [
            "Financial Mathematics",
            "Probability Distributions",
            "Hypothesis Testing & A/B Testing",
            "Linear Algebra & Matrix Decompositions",
            "Multivariate Statistics",
            "Stochastic Processes",
            "Time Series (ARIMA / SARIMA / GARCH)",
            "Mathematical Optimization (LP / Simplex)"
        ]
    },
    {
        category: "Data Science & Machine Learning",
        badgeColor: "emerald",
        skills: [
            "Supervised & Unsupervised Learning",
            "Gradient Boosting (XGBoost, LightGBM)",
            "Class Imbalance Handling (SMOTE)",
            "Model Evaluation (ROC-AUC, PR-AUC, F1-Score)",
            "Explainable AI (SHAP)",
            "Deep Learning & Neural Architectures"
        ]
    },
    {
        category: "Programming & Data Engineering",
        badgeColor: "sky",
        skills: [
            "Python (Pandas, NumPy, Scikit-Learn, Statsmodels)",
            "R (Statistical Computing, ggplot2)",
            "SQL (PostgreSQL, Window Functions, CTEs)",
            "Git & GitHub Version Control",
            "FastAPI",
            "Docker (Containerization)"
        ]
    },
    {
        category: "Analytics & Visualization",
        badgeColor: "amber",
        skills: [
            "Power BI (DAX, Interactive Dashboards)",
            "Matplotlib & Seaborn",
            "Plotly (Interactive Visuals)",
            "Jupyter Lab & VS Code",
            "Advanced Excel"
        ]
    }
];

export const projectsData = [
    {
        id: 1,
        title: "CSE Volatility Dynamics & Directional Regimes",
        subtitle: "Stochastic Modeling & Econometrics",
        formula: "\\sigma_t^2 = \\omega + \\alpha \\epsilon_{t-1}^2 + \\beta \\sigma_{t-1}^2",
        description: "Evaluated daily log-returns on Colombo Stock Exchange equities. Modeled volatility clustering via Maximum Likelihood GARCH(1,1) under Student-t innovations, passing conditional variance into an expanding walk-forward XGBoost classifier.",
        methodology: "MLE GARCH(1,1) + Expanding Window TimeSeriesSplit (5 Folds)",
        quantChips: ["N=Daily CSE Equities", "T=5-Yr Horizon", "Walk-Forward CV"],
        techStack: ["Python", "Statsmodels", "arch", "XGBoost", "Matplotlib"],
        githubUrl: "https://github.com/ruchirajayamaha",
        metrics: "Directional Brier score improved 22.6% (0.248 → 0.192) via expanding walk-forward validation — robust across shifting market regimes, not just in-sample.",
        evidence: {
            crossValidation: "Expanding-window TimeSeriesSplit (5 folds)",
            evaluationMetric: "Brier score (0.248 → 0.192)",
            productionReadiness: "Research prototype, offline backtest"
        },
        pipeline: [
            { title: "Preprocessing & Outlier Filtering", detail: "Daily closes converted to log-returns, with anomalous prints screened before estimation." },
            { title: "GARCH Volatility Modeling", detail: "GARCH(1,1) fitted by Maximum Likelihood under Student-t innovations to capture fat tails." },
            { title: "Walk-Forward CV", detail: "Expanding TimeSeriesSplit refits on each fold's past, so no future data reaches the model." },
            { title: "XGBoost Inference", detail: "Conditional variance feeds the classifier, which outputs next-day directional probabilities." }
        ],
        insight: {
            summary: "Daily returns are close to uncorrelated, but their squares are not: calm and turbulent periods cluster. A constant-variance model or a flat rolling window misses this. GARCH(1,1) lets variance react to the latest shock while mean-reverting to a long-run level, and it gives the classifier a one-step-ahead risk state rather than a backward-looking average. A random K-fold split would also leak future regimes into training, which is why validation only ever moves forward in time.",
            formula: "\\bar{\\sigma}^2 = \\frac{\\omega}{1 - \\alpha - \\beta}, \\quad \\alpha + \\beta < 1"
        },
        snippets: [
            {
                language: "Python",
                filename: "walk_forward_garch.py",
                code: `import numpy as np
import pandas as pd
from arch import arch_model
from sklearn.metrics import brier_score_loss
from sklearn.model_selection import TimeSeriesSplit
from xgboost import XGBClassifier


def garch_variance_forecast(returns: pd.Series, last_obs: int) -> pd.Series:
    """One-step-ahead variance, with parameters fitted only on returns[:last_obs]."""
    model = arch_model(returns, vol="GARCH", p=1, q=1, dist="t")
    fitted = model.fit(last_obs=last_obs, disp="off")
    return fitted.forecast(horizon=1, start=0, reindex=False).variance["h.1"]


returns = 100 * np.log(prices).diff().dropna()  # prices: daily close series
target = (returns.shift(-1) > 0).astype(int).iloc[:-1]  # next-day direction

scores = []
for train_idx, test_idx in TimeSeriesSplit(n_splits=5).split(target):
    # Refit on each fold's past so test data never informs the parameters
    sigma2 = garch_variance_forecast(returns, last_obs=int(test_idx[0]))
    features = pd.DataFrame({"sigma2": sigma2, "ret": returns}).iloc[:-1]

    clf = XGBClassifier(n_estimators=300, max_depth=3, learning_rate=0.03)
    clf.fit(features.iloc[train_idx], target.iloc[train_idx])
    prob_up = clf.predict_proba(features.iloc[test_idx])[:, 1]
    scores.append(brier_score_loss(target.iloc[test_idx], prob_up))

print(f"Walk-forward Brier: {np.mean(scores):.3f}")`
            }
        ]
    },
    {
        id: 2,
        title: "Enterprise Customer Churn with Explainable AI",
        subtitle: "Classification & Feature Attribution",
        formula: "\\phi_i = \\sum_{S \\subseteq N \\setminus \\{i\\}} \\frac{|S|!(|N|-|S|-1)!}{|N|!} (v(S \\cup \\{i\\}) - v(S))",
        description: "Engineered an end-to-end classification system identifying at-risk accounts. Resolved class imbalance using SMOTE-Tomek and decoded black-box predictions for business stakeholders using TreeSHAP summary plots.",
        methodology: "LightGBM + SMOTE-Tomek + TreeSHAP Engine",
        quantChips: ["N=Telecom Cohort", "SMOTE-Tomek", "TreeSHAP Attribution"],
        techStack: ["Python", "Scikit-Learn", "LightGBM", "SHAP", "Power BI"],
        githubUrl: "https://github.com/ruchirajayamaha",
        metrics: "0.88 ROC-AUC / 0.74 PR-AUC — PR-AUC reported deliberately for severe class imbalance; TreeSHAP yields instant factor attribution for business stakeholders.",
        evidence: {
            crossValidation: "Stratified 5-fold, resampling inside training folds",
            evaluationMetric: "ROC-AUC 0.88, PR-AUC 0.74",
            productionReadiness: "Prototype, offline evaluation"
        },
        pipeline: [
            { title: "Feature Engineering", detail: "Account behavior aggregated into rolling usage and engagement features with SQL window functions." },
            { title: "Imbalance Handling", detail: "SMOTE-Tomek oversamples the churn class and removes borderline pairs, on training data only." },
            { title: "LightGBM Classification", detail: "Gradient-boosted trees rank accounts by churn risk and are evaluated on PR-AUC as well as ROC-AUC." },
            { title: "TreeSHAP Attribution", detail: "Shapley values explain each prediction and feed summary views for business stakeholders." }
        ],
        insight: {
            summary: "When churners are rare, a model that predicts 'stays' for everyone scores high accuracy and tells you nothing, so PR-AUC is reported because its baseline equals the churn rate. For explanations, gain-based feature importance is global and can be inconsistent. Shapley values are the unique attribution satisfying efficiency, symmetry, dummy and additivity, so each customer's factors sum exactly to their score, and TreeSHAP computes them exactly in polynomial time on tree ensembles rather than over all 2^|N| feature subsets.",
            formula: "\\sum_{i \\in N} \\phi_i = f(x) - \\mathbb{E}[f(X)]"
        },
        snippets: [
            {
                language: "Python",
                filename: "churn_pipeline.py",
                code: `import shap
from imblearn.combine import SMOTETomek
from imblearn.pipeline import Pipeline
from lightgbm import LGBMClassifier
from sklearn.model_selection import StratifiedKFold, cross_validate

# imblearn's Pipeline resamples training folds only, so validation keeps true prevalence
pipeline = Pipeline([
    ("resample", SMOTETomek(random_state=42)),
    ("model", LGBMClassifier(n_estimators=400, learning_rate=0.03, verbose=-1)),
])

cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
scores = cross_validate(pipeline, X, y, cv=cv, scoring=["roc_auc", "average_precision"])
print(scores["test_roc_auc"].mean(), scores["test_average_precision"].mean())

pipeline.fit(X, y)
explainer = shap.TreeExplainer(pipeline.named_steps["model"])
shap.summary_plot(explainer.shap_values(X), X)`
            },
            {
                language: "SQL",
                filename: "usage_features.sql",
                code: `WITH monthly_usage AS (
    SELECT customer_id,
           date_trunc('month', usage_date) AS month,
           SUM(minutes_used) AS minutes,
           COUNT(*) FILTER (WHERE event = 'support_call') AS support_calls
    FROM usage_events
    GROUP BY customer_id, date_trunc('month', usage_date)
)
SELECT customer_id,
       month,
       AVG(minutes) OVER last_3m AS minutes_3m_avg,
       SUM(support_calls) OVER last_3m AS support_calls_3m,
       minutes - LAG(minutes) OVER (PARTITION BY customer_id ORDER BY month) AS minutes_delta
FROM monthly_usage
WINDOW last_3m AS (
    PARTITION BY customer_id ORDER BY month
    ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
);`
            }
        ]
    },
    {
        id: 3,
        title: "Industrial Process Yield Optimization",
        subtitle: "Operations Research & Quality Control",
        formula: "\\min_{x} c^T x \\quad \\text{subject to} \\quad Ax \\le b, \\; x \\ge 0",
        description: "Formulated a linear programming model to optimize resource allocation in industrial batch processing. Integrated automated Shewhart control charts for continuous anomaly tracking.",
        methodology: "Simplex Method + Statistical Process Control (SPC)",
        quantChips: ["Simplex Algorithm", "Multi-Constraint LP", "Shewhart SPC"],
        techStack: ["R", "SciPy Optimize", "NumPy", "Seaborn"],
        githubUrl: "https://github.com/ruchirajayamaha",
        metrics: "Modeled an 8.5% reduction in production waste via LP-based resource reallocation, validated against real operational and capacity constraints.",
        evidence: {
            crossValidation: "Not applicable: checked against capacity constraints",
            evaluationMetric: "Production waste (8.5% modeled reduction)",
            productionReadiness: "Decision-support model, not deployed"
        },
        pipeline: [
            { title: "Problem Formulation", detail: "Costs, resource usage and capacity limits translated into a linear objective and constraint matrix." },
            { title: "Simplex Optimization", detail: "The LP is solved for the batch allocation that meets every operational constraint at lowest cost." },
            { title: "Sensitivity Analysis", detail: "Shadow prices show which capacity limits bind and what relaxing each one is worth." },
            { title: "Statistical Process Control", detail: "Shewhart control charts monitor batches and flag out-of-control runs for review." }
        ],
        insight: {
            summary: "Allocating to the cheapest or highest-yield line first ignores that lines compete for the same capacity. An LP handles every constraint at once, and when an optimum exists it sits at a vertex of the feasible polytope, which is what lets Simplex search a finite set of corners. Duality adds what a heuristic cannot: each constraint's shadow price measures the marginal value of relaxing it, so the output is a ranked case for where extra capacity pays off, not just a plan.",
            formula: "\\min\\{c^T x : Ax \\le b,\\, x \\ge 0\\} = \\max\\{b^T y : A^T y \\le c,\\, y \\le 0\\}"
        },
        snippets: [
            {
                language: "Python",
                filename: "allocate_batches.py",
                code: `import numpy as np
from scipy.optimize import linprog

# Placeholder figures for three process lines
cost = np.array([12.0, 9.5, 14.0])
resources = np.array([[2.0, 1.0, 3.0],   # machine hours per batch
                      [1.0, 2.0, 1.0]])  # raw material per batch
capacity = np.array([480.0, 400.0])
yield_per_batch = np.array([0.92, 0.85, 0.97])
min_output = 180.0

# The demand floor flips sign to fit the A_ub x <= b_ub form
A_ub = np.vstack([resources, -yield_per_batch])
b_ub = np.append(capacity, -min_output)

result = linprog(cost, A_ub=A_ub, b_ub=b_ub, bounds=(0, None), method="highs")
print("Batches:", result.x, "Cost:", result.fun)
print("Shadow prices:", result.ineqlin.marginals)`
            },
            {
                language: "R",
                filename: "control_chart.R",
                code: `library(qcc)

# yield_batches: matrix with one row per rational subgroup
chart <- qcc(yield_batches, type = "xbar", nsigmas = 3)

out_of_control <- which(
  chart$statistics > chart$limits[, "UCL"] |
    chart$statistics < chart$limits[, "LCL"]
)`
            }
        ]
    }
];

export const educationData = [
    {
        id: 1,
        institution: "University of Ruhuna, Sri Lanka",
        degree: "B.Sc. (Hons) in Financial Mathematics and Industrial Statistics",
        period: "Undergraduate (Final Year)",
        focus: "Specialized training in financial mathematics, stochastic processes, econometric modeling, industrial statistics, and mathematical optimization.",
        code: "UoR",
        badgeColor: "indigo",
        logo: `${import.meta.env.BASE_URL}ruhuna-logo.png`
    },
    {
        id: 2,
        institution: "National Institute of Business Management (NIBM)",
        degree: "Advanced Diploma in Data Science",
        period: "Completed",
        focus: "Practical curriculum covering data science workflows, machine learning models, relational databases (SQL), and enterprise analytics.",
        code: "NIBM",
        badgeColor: "emerald",
        logo: `${import.meta.env.BASE_URL}nibm-logo.png`
    },
    {
        id: 3,
        institution: "Bandaranayake College, Gampaha",
        degree: "G.C.E. Advanced Level — Physical Science Stream",
        period: "Secondary Education",
        focus: "Advanced mathematics, physics, and chemistry foundational education.",
        code: "BCG",
        badgeColor: "amber",
        logo: `${import.meta.env.BASE_URL}bcg-logo.png`
    }
];