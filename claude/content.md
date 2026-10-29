# Site content (source of truth)

## Resolve before publishing

- [ ] **Feature count on the ML resume.**  The paper reports 27 modeling features in Experiments 1 and 2 (41 inputs after missing-indicator encoding) and 33 in Experiment 3, selected from 53 candidates. Pick one number and use it everywhere.
- [ ] **"Tree-based models outperformed the neural network on every test-set metric."** True on point estimates, but the paper states the 95% confidence intervals overlapped substantially and no model is statistically distinguishable as best. The site says "highest point estimates, with overlapping confidence intervals"; consider softening the resume line too.
- [ ] **Disc degeneration preprint title.** The two resumes list different titles for the same DOI. Use the title exactly as it appears on medRxiv.
- [ ] **AWS Cloud Practitioner date.** Resumes say August 2026; confirm against the certificate.
- [ ] **eICU and MIMIC-IV status.** The paper is SICdb-only. Currently working towards validating the model with eICU and MIMIC-IV 
- [ ] **Manuscript status.** Manuscript in preparation for submission (being restructured for a new journal). Decide whether to name co-authors and the title publicly before submission, or list it as "manuscript in preparation, details on request."

---

## Identity

- **Name:** Vamsi Sudersanam
- **One-liner:** I build machine learning for critical care: models that predict when a patient on non-invasive breathing support is about to need a ventilator, and the pipelines that make those predictions trustworthy.
- **Short bio:** Computer Science graduate (Milwaukee School of Engineering, 2026). First author on a critical-care survival-analysis manuscript in preparation for submission and co-author on a radiomics preprint, from research at the Medical College of Wisconsin. Also a software engineer: production test automation at Real Time Automation and a full-stack deep RL training platform. Applying to PhD programs in biomedical informatics for Fall 2027.
- **Contact:** sudersanamvamsi@gmail.com · github.com/Vamsichris04 · linkedin.com/in/sudersanam

## Research

### Predicting failure of non-invasive respiratory support

- **Where / when:** Medical College of Wisconsin and MSOE, Jul 2025 – present
- **Status:** First author; manuscript in preparation for submission. Co-authors: Yiyang Wang (MSOE), Rahul S. Nanchal (MCW).
- **Stack:** Python, SQL, scikit-survival, XGBoost, PyTorch (DeepHit), SHAP, Optuna, CUDA

**The problem.** When a patient in the ICU has acute hypoxemic respiratory failure, clinicians first try non-invasive support: high-flow nasal cannula or non-invasive ventilation. It often fails, and the timing of the switch to a ventilator matters in both directions. Delaying intubation in a patient who is failing is associated with worse outcomes; intubating a patient who would have recovered exposes them to the risks of an invasive airway. Existing tools are either single thresholds like the ROX index or general severity scores like SAPS-3, and neither integrates the full clinical picture over time.

**The approach.** I framed failure as a time-to-event problem rather than a yes/no label, so that patients who improve and come off support still contribute information instead of being discarded.

- Cohort: 8,489 adults started on non-invasive support for acute hypoxemic respiratory failure, drawn from SICdb (27,000+ ICU admissions, 2013–2021). 2,589 (30.5%) were intubated within 72 hours. Failure happens early: 77.1% of intubations occurred within the first 2 hours.
- Every feature window is anchored to t0, the moment support starts, and bounded to prevent temporal leakage. Feature selection combined a missingness filter, domain-informed exclusions, and iterative VIF removal.
- Two experiments: prediction at t0 using only prior data; and the same design with the blood gas window extended 30 minutes, which is an early-reassessment model rather than a baseline one.
- Four model families (Random Survival Forest, XGBoost AFT, XGBoost Cox, DeepHit) across both experiments, evaluated with C-index, time-dependent AUC, Brier score and IBS, risk tertiles with log-rank tests, permutation importance, and SHAP.

**Results.**

- At t0, XGBoost AFT reached 0.914 AUROC (95% CI 0.898–0.930) and 0.868 C-index, with 86.5% sensitivity and 83.8% specificity at the Youden-optimal threshold. RSF and DeepHit were close behind, and the confidence intervals overlapped, so no model is statistically distinguishable as best.
- Risk tertiles separated cleanly: high-risk patients were intubated within 2 hours about 60% of the time, low-risk patients about 1%.
- The ROX index at its published cutoff of 4.88 caught 3.6% of patients who went on to be intubated in this cohort. As a continuous predictor it reached 0.555 AUROC. The multivariable models were substantially better.

**The finding I didn't expect.** The strongest predictors under strict pre-t0 extraction were not measured physiology but missingness itself: whether a ventilator trigger-sensitivity setting was recorded, and whether a blood gas was drawn before support started. Absence of a pre-t0 blood gas was associated with *higher* risk, which is the opposite of the "they weren't sick enough to test" hypothesis. Rapid deterioration plausibly leaves no time to draw one. The trigger-sensitivity indicator is partly a proxy for modality, since HFNC has no such setting, so it mixes treatment type with acuity. These models exploit documentation patterns specific to one hospital system, and external validation is needed before claiming they generalize.

**In progress.** Extending the work to MIMIC-IV and eICU. 

### Disc degeneration grading from MRI

- **Where / when:** Medical College of Wisconsin, Jan 2025 – May 2025
- **Status:** Co-author, medRxiv preprint (2026)
- **Stack:** Python, Pyradiomics, XGBoost, scikit-learn
- **Summary:** Graded intervertebral disc degeneration from quantitative MRI radiomics across 277 multi-site, multi-field-strength scans, reaching up to 0.89 AUC with an interpretable XGBoost classifier.
- **My contribution:** Built the Pyradiomics feature-extraction pipeline and benchmarked 8 image-normalization strategies. Ran repeated-scan stability analysis (one-sample t-tests on feature deltas) to keep reproducible biomarkers, more than doubling the stable-feature count compared with no normalization.

### Manuscripts

- Muftuler, L. T., Drobek, A., Bukowy, J. D., Duwe, K., **Sudersanam, V.**, Harrington, J., Van Zant, E., Duenweg, S. R., & Shanbhag, D. D. (2026). A Systematic Evaluation of MRI Normalization for Multi-Site Radiomics-Based Disc Degeneration Classification. *medRxiv.* DOI: 10.64898/2026.01.13.26343807
- **Sudersanam, V. K.**, Wang, Y., & Nanchal, R. S. Predicting Failure of Non-Invasive Respiratory Support in Acute Hypoxemic Respiratory Failure Using the Salzburg Intensive Care Database. *Manuscript in preparation for submission*

## Engineering

### RL Studio: full-stack deep RL training platform

- **When:** May 2025 – Mar 2026 (MSOE senior design)
- **Stack:** Next.js, TypeScript, Tailwind, FastAPI, PyTorch, Stable-Baselines3, Gymnasium, VisX, GitHub Actions
- **Summary:** An educational web app for configuring and launching Atari agent training with DQN, Rainbow, and PPO, playing the same games live in the browser, and viewing training analytics.
- **What I built:**
  - FastAPI backend with REST endpoints to create, reset, step, and render Gymnasium environments, plus a WebSocket stream for live frames and rewards during training.
  - Config-driven training service wrapping Stable-Baselines3, with user-configurable hyperparameters, eval/checkpoint callbacks, and JSON progress logging.
  - Next.js + React + TypeScript + Tailwind frontend with guided hyperparameter tuning, real-time training charts, and live game playback; GitHub Actions CI for ESLint, Prettier, and TypeScript checks.
- **Media:** `TODO: short screen recording or GIF of training and live playback.`
- **Link:** `TODO`

### GPT from scratch

- **When:** Sep 2026
- **Stack:** Python, PyTorch
- **Summary:** A GPT-style decoder-only transformer implemented from scratch in PyTorch (token and positional embeddings, multi-head causal self-attention, pre-norm residual blocks, feed-forward layers with dropout) without high-level transformer libraries.
- **Process:** Trained character-level with AdamW, tracking train/validation loss to diagnose overfitting; scaled from a bigram baseline to a multi-layer transformer.
- **Media:** `TODO: a sample of generated text and a loss-curve image.`
- **Link:** `TODO: GitHub repo URL.`

### Automated regression pipeline (Real Time Automation)

- **When:** May 2025 – May 2026, Software Engineer Intern
- **Summary:** Designed an unattended nightly pipeline (crontab + Allure on Azure DevOps) running 300+ regression tests across 7 industrial protocols and publishing trend reports, replacing manual test runs for 30+ engineers and enabling failure analysis across releases.
- **Also:** Wrote the majority of the regression suite (MQTT, HTTP/S, SQL, FTP, WebSockets, email, Modbus, PLC read/write, Selenium front-end checks) for the company's IoT Historian product; took part in weekly code review on Azure DevOps.

### Repair workflow automation (MSOE IT Help Desk)

- **When:** Feb 2023 – May 2026, Student Manager
- **Summary:** Built a Power Automate + SharePoint pipeline that takes laptop asset tags, pulls device metadata from a central tracker, and drafts vendor repair emails, saving 3–4 hours of manual work each week. Managed scheduling, training, and device QA for 20+ student technicians.

## Skills (short form for the site)

- **ML and statistics:** survival analysis (RSF, XGBoost AFT/Cox, DeepHit), calibration and discrimination metrics, SHAP, Bayesian optimization, deep learning, reinforcement learning
- **Clinical data:** SICdb, MIMIC-IV, eICU; cohort extraction, time-anchored feature engineering, missing-data handling
- **Languages:** Python, SQL, TypeScript, Java, C/C++, R
- **Tools:** PyTorch, FastAPI, Next.js/React, Docker, Git, AWS, Databricks, MLflow, Azure DevOps

## Certifications

- AWS Certified AI Practitioner (August 2026)
- AWS Certified Cloud Practitioner (August 2026)
