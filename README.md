# FraudGuard — Grant Intelligence Platform v4.1 Enterprise

> **Rules- and statistics-based grant fraud detection dashboard aligned with OMB 2 CFR Part 200, GAO Green Book, and the COSO Framework.**
> *Muhammad Bilal FCA · FCCA · CFA — MIT License*

---

## Overview

FraudGuard GFDS v4 is a production-ready React application that provides financial governance officers, compliance teams, and external auditors with real-time fraud detection across federally funded grant programs.

**Six real fraud datasets embedded (DS1–DS6):**

| Dataset | Scenario | Region | Records |
|---------|----------|--------|---------|
| DS1 | Clean Baseline | Texas (SW) | 25 |
| DS2 | Duplicate Invoice Payments | Tennessee (SE) | 25 |
| DS3 | Vendor Fraud Network | Arizona/SW | 25 |
| DS4 | Procurement Violations (Sole-Source) | Midwest | 25 |
| DS5 | Transaction Structuring (31 U.S.C. 5324) | Florida | 25 |
| DS6 | Statistical Anomalies / Missing Docs | Pacific NW | 25 |

---

## Features

| Module | Capability |
|--------|-----------|
| **Overview Dashboard** | KPI strip, risk distribution donut, 8-week spend sparklines, top risk vendors |
| **Alert Queue** | 10 OMB detection rules (R001–R010), severity filter, corrective actions, one-click case creation |
| **Transaction Monitor** | 150 real transactions, statistical Z-score scoring, CGRS composite risk, batch payment hold |
| **Case Management** | Full workflow (OPEN → ESCALATED → CLOSED), notes, evidence bundle, OIG HTML export |
| **Compliance Matrix** | CC-001–CC-010 controls mapped to COSO / GAO Green Book / OMB references |
| **Settings** | Toggle R001–R010 detection rules live, audit log |
| **Onboarding Wizard** | 3-step org setup, data source selection, animated scan launch |
| **RBAC** | 4 roles: System Admin, Compliance Officer, Investigator, External Auditor |
| **Global Search** | Live search across transactions, vendors, alerts |
| **Statistical Engine** | Z-score anomaly detection per grant/category baseline |
| **Graph Engine** | Shared address, bank routing, procurement concentration detection |
| **ROI Calculator** | Fraud savings vs. implementation cost with interactive sliders |
| **Report Export** | OIG-style HTML audit package per case |

---

## Tech Stack

- **Framework**: React 18 + Vite 5
- **Routing**: React Router v6
- **State Management**: useReducer + Context API (no Redux)
- **Styling**: Inline styles with JS design tokens
- **Deployment**: Vercel / Netlify ready (SPA redirects pre-configured)

---

## Project Structure

```
gfds-v4/
├── public/favicon.svg
├── src/
│   ├── components/
│   │   ├── ui/            Badge, Btn, Card, Chip, Empty, Inp, Pick, Sec, Spin, Tip
│   │   ├── layout/        Header, Sidebar, GSearch, Notifications
│   │   ├── charts/        Spark, MBar, Donut
│   │   ├── Explainability.jsx
│   │   ├── ROICalculator.jsx
│   │   └── TxnPanel.jsx
│   ├── pages/             Wizard, Overview, Transactions, Alerts, Cases, Compliance, Settings
│   ├── context/           AppContext.jsx  (global state + AppProvider + useAppState hook)
│   ├── hooks/             useDetection.js
│   ├── services/          rulesEngine.js, mlEngine.js, graphEngine.js, reportExport.js
│   ├── data/              referenceData.js (35 vendors, 23 grants), transactions.js (DS1-DS6)
│   ├── utils/             tokens.js (DS, RM, ROLES, NAV), formatters.js
│   └── styles/            globals.css
├── .env.example
├── .gitignore
├── index.html
├── netlify.toml
├── vercel.json
└── vite.config.js
```

---

## Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev
# -> http://localhost:5173

# 3. Production build
npm run build

# 4. Preview production build
npm run preview
# -> http://localhost:4173
```

---

## Deployment

### Vercel

```bash
# CLI
npm install -g vercel
vercel --prod

# Or: push to GitHub -> import at vercel.com/new -> Deploy (Vite auto-detected)
```

### Netlify

```bash
# CLI
npm install -g netlify-cli
netlify deploy --build --prod

# Or: drag dist/ folder to app.netlify.com/drop after running npm run build
```

---

## Original JSX → Modular File Map

| Original §Section | Module Location |
|---|---|
| §1 Design Tokens | `src/utils/tokens.js` |
| §2 RBAC | `src/utils/tokens.js` → ROLES, NAV |
| §3 Vendor/Grant Reference Data | `src/data/referenceData.js` |
| §4 DS1–DS6 Transaction Data | `src/data/transactions.js` |
| §5–6 Rules + Statistical Engines | `src/services/rulesEngine.js`, `mlEngine.js` |
| §7 Graph Engine | `src/services/graphEngine.js` |
| §8 Report Export | `src/services/reportExport.js` |
| §9 Global State | `src/context/AppContext.jsx` |
| §10 UI Atoms | `src/components/ui/` |
| §11–14 Layout Components | `src/components/layout/` |
| §15–17 Wizard / ROI / Explain | `src/pages/Wizard.jsx`, `src/components/` |
| §18–24 Page Views | `src/pages/` |
| §25 App Shell | `src/App.jsx` |

---

## Compliance References

- **OMB Uniform Guidance**: 2 CFR Part 200
- **GAO Green Book**: Standards for Internal Control in the Federal Government
- **COSO Framework**: Internal Control — Integrated Framework
- **31 U.S.C. 5324**: Anti-structuring statute (Bank Secrecy Act)

---

## Author

**Muhammad Bilal** FCA · FCCA · CFA  
MIT License © 2024
