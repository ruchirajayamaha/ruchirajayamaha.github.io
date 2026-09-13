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
    status: "Open for Data Science / ML Opportunities"
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
        metrics: "Directional Brier score improved 22.6% (0.248 → 0.192) via expanding walk-forward validation — robust across shifting market regimes, not just in-sample."
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
        metrics: "0.88 ROC-AUC / 0.74 PR-AUC — PR-AUC reported deliberately for severe class imbalance; TreeSHAP yields instant factor attribution for business stakeholders."
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
        metrics: "Modeled an 8.5% reduction in production waste via LP-based resource reallocation, validated against real operational and capacity constraints."
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