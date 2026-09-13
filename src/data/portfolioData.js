export const personalInfo = {
    name: "Ruchira Lakshitha",
    role: "Data Science & Applied Statistics Undergraduate",
    tagline: "Applying stochastic processes and formal statistical inference to production ML systems.",
    bio: "Final-year Industrial Mathematics & Applied Statistics undergraduate at the University of Ruhuna, holding an Advanced Diploma in Data Science from NIBM. Focused on time-series forecasting, quantitative modeling, and engineering scalable machine learning pipelines.",
    email: "your.email@example.com", // ඔබේ email එක මෙතැනට දාන්න
    github: "https://github.com/yourusername", // ඔබේ GitHub profile link එක මෙතැනට දාන්න
    linkedin: "https://linkedin.com/in/yourusername", // ඔබේ LinkedIn profile link එක මෙතැනට දාන්න
    location: "Sri Lanka",
    status: "Actively Seeking Data Science / ML Internship (Available in 3 Months)"
};

export const skillsData = [
    {
        category: "Mathematical & Statistical Rigor",
        badgeColor: "indigo",
        skills: [
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
            "Deep Learning Fundamentals"
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
            "FastAPI (Basics)",
            "Docker (Basics)"
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
        techStack: ["Python", "Statsmodels", "arch", "XGBoost", "Matplotlib"],
        githubUrl: "https://github.com/yourusername",
        metrics: "Directional Brier score improved from 0.248 (Baseline) to 0.192; robust across market regimes."
    },
    {
        id: 2,
        title: "Enterprise Customer Churn with Explainable AI",
        subtitle: "Classification & Feature Attribution",
        formula: "\\phi_i = \\sum_{S \\subseteq N \\setminus \\{i\\}} \\frac{|S|!(|N|-|S|-1)!}{|N|!} (v(S \\cup \\{i\\}) - v(S))",
        description: "Engineered an end-to-end classification system identifying at-risk accounts. Resolved class imbalance using SMOTE-Tomek and decoded black-box predictions for business stakeholders using TreeSHAP summary plots.",
        methodology: "LightGBM + SMOTE-Tomek + TreeSHAP Engine",
        techStack: ["Python", "Scikit-Learn", "LightGBM", "SHAP", "Power BI"],
        githubUrl: "https://github.com/yourusername",
        metrics: "Attained 0.88 ROC-AUC and 0.74 PR-AUC with clear factor attribution."
    },
    {
        id: 3,
        title: "Industrial Process Yield Optimization",
        subtitle: "Operations Research & Quality Control",
        formula: "\\min_{x} c^T x \\quad \\text{subject to} \\quad Ax \\le b, \\; x \\ge 0",
        description: "Formulated a linear programming model to optimize resource allocation in industrial batch processing. Integrated automated Shewhart control charts for continuous anomaly tracking.",
        methodology: "Simplex Method + Statistical Process Control (SPC)",
        techStack: ["R", "SciPy Optimize", "NumPy", "Seaborn"],
        githubUrl: "https://github.com/yourusername",
        metrics: "Modeled theoretical waste reduction of 8.5% within operational limits."
    }
];

export const educationData = [
    {
        institution: "University of Ruhuna, Sri Lanka",
        degree: "B.Sc. in Industrial Mathematics & Applied Statistics (Reading)",
        period: "2022 — Present (Final Year)",
        focus: "Specialized training in probability theory, mathematical statistics, stochastic processes, linear algebra, and multivariate modeling."
    },
    {
        institution: "National Institute of Business Management (NIBM)",
        degree: "Advanced Diploma in Data Science",
        period: "Completed",
        focus: "Practical curriculum covering Python for Data Science, Machine Learning pipelines, relational databases with SQL, and business analytics."
    }
];