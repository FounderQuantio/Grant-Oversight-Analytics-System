// ============================================================
// GFDS V4 — Sample Data
// All mock data used across the four modules
// ============================================================

// ── Risk Dashboard ──────────────────────────────────────────

export const riskMetrics = {
  totalFlagged: 47,
  highRisk: 12,
  pendingReview: 23,
  resolvedThisMonth: 8,
  totalGrantValue: 284500000,
  atRiskValue: 14200000,
}

export const riskTrendData = [
  { month: 'Jul', flagged: 38, resolved: 30, highRisk: 8 },
  { month: 'Aug', flagged: 42, resolved: 35, highRisk: 10 },
  { month: 'Sep', flagged: 35, resolved: 32, highRisk: 7 },
  { month: 'Oct', flagged: 51, resolved: 38, highRisk: 14 },
  { month: 'Nov', flagged: 44, resolved: 40, highRisk: 11 },
  { month: 'Dec', flagged: 47, resolved: 39, highRisk: 12 },
]

export const riskDistribution = [
  { category: 'Duplicate Invoice',    count: 18, value: 4200000,  severity: 'HIGH' },
  { category: 'Abnormal Vendor Amount', count: 12, value: 6800000, severity: 'HIGH' },
  { category: 'Duplicate Address',    count: 9,  value: 1900000,  severity: 'MEDIUM' },
  { category: 'Expired Documentation', count: 5,  value: 800000,  severity: 'MEDIUM' },
  { category: 'Missing Reports',      count: 3,  value: 500000,   severity: 'LOW' },
]

export const complianceScoreData = [
  { name: 'Procurement',    score: 87, benchmark: 90 },
  { name: 'Reporting',      score: 92, benchmark: 90 },
  { name: 'Cost Principles', score: 78, benchmark: 85 },
  { name: 'Subrecipient',   score: 83, benchmark: 85 },
  { name: 'Closeout',       score: 91, benchmark: 88 },
  { name: 'Documentation',  score: 76, benchmark: 85 },
]

// ── Transaction Monitor ──────────────────────────────────────

export const transactions = [
  {
    id: 'TXN-2024-001',
    vendor: 'Apex Construction LLC',
    amount: 287500,
    date: '2024-12-10',
    grantProgram: 'IIJA Infrastructure Grant',
    category: 'Construction',
    status: 'FLAGGED',
    riskLevel: 'HIGH',
    flags: ['Duplicate Invoice', 'Amount Variance +34%'],
    invoiceRef: 'INV-AC-4421',
  },
  {
    id: 'TXN-2024-002',
    vendor: 'BuildRight Solutions',
    amount: 94200,
    date: '2024-12-09',
    grantProgram: 'CDBG Housing Program',
    category: 'Construction',
    status: 'UNDER REVIEW',
    riskLevel: 'MEDIUM',
    flags: ['New Vendor — No Prior Activity'],
    invoiceRef: 'INV-BR-0089',
  },
  {
    id: 'TXN-2024-003',
    vendor: 'Metro Tech Services',
    amount: 41800,
    date: '2024-12-08',
    grantProgram: 'HUD Community Development',
    category: 'Technology',
    status: 'CLEARED',
    riskLevel: 'LOW',
    flags: [],
    invoiceRef: 'INV-MT-2201',
  },
  {
    id: 'TXN-2024-004',
    vendor: 'NorthStar Consulting Group',
    amount: 156000,
    date: '2024-12-07',
    grantProgram: 'EPA Environmental Grant',
    category: 'Consulting',
    status: 'FLAGGED',
    riskLevel: 'HIGH',
    flags: ['Duplicate Invoice', 'Same Address as TXN-2024-008'],
    invoiceRef: 'INV-NS-7734',
  },
  {
    id: 'TXN-2024-005',
    vendor: 'Regional Water Authority',
    amount: 512000,
    date: '2024-12-06',
    grantProgram: 'IIJA Infrastructure Grant',
    category: 'Utilities',
    status: 'CLEARED',
    riskLevel: 'LOW',
    flags: [],
    invoiceRef: 'INV-RW-0344',
  },
  {
    id: 'TXN-2024-006',
    vendor: 'Sunrise Equipment Rental',
    amount: 78400,
    date: '2024-12-05',
    grantProgram: 'DOT Transportation Grant',
    category: 'Equipment',
    status: 'UNDER REVIEW',
    riskLevel: 'MEDIUM',
    flags: ['Split Invoice Pattern Detected'],
    invoiceRef: 'INV-SE-1192',
  },
  {
    id: 'TXN-2024-007',
    vendor: 'Apex Construction LLC',
    amount: 287500,
    date: '2024-12-03',
    grantProgram: 'IIJA Infrastructure Grant',
    category: 'Construction',
    status: 'FLAGGED',
    riskLevel: 'HIGH',
    flags: ['Duplicate of TXN-2024-001', 'Same Amount & Vendor'],
    invoiceRef: 'INV-AC-4421',
  },
  {
    id: 'TXN-2024-008',
    vendor: 'NorthStar Advisory LLC',
    amount: 156000,
    date: '2024-12-02',
    grantProgram: 'EPA Environmental Grant',
    category: 'Consulting',
    status: 'FLAGGED',
    riskLevel: 'HIGH',
    flags: ['Related Entity — Same Address as TXN-2024-004'],
    invoiceRef: 'INV-NA-0012',
  },
]

export const transactionSummary = {
  totalVolume: 1613400,
  flaggedCount: 4,
  flaggedValue: 887000,
  clearedCount: 2,
  underReviewCount: 2,
}

// ── Pre-Award Applications ───────────────────────────────────

export const applications = [
  {
    id: 'APP-2024-0041',
    applicant: 'Greenfield Community Development Corp',
    program: 'CDBG Housing Revitalization',
    requestedAmount: 850000,
    submissionDate: '2024-11-28',
    status: 'RISK FLAGGED',
    riskScore: 78,
    flags: ['Address matches 3 prior applicants', 'Board member conflict of interest'],
    reviewer: 'M. Thompson',
    dueDate: '2025-01-15',
  },
  {
    id: 'APP-2024-0042',
    applicant: 'Metro Urban Renewal Initiative',
    program: 'HUD Choice Neighborhoods',
    requestedAmount: 2400000,
    submissionDate: '2024-11-25',
    status: 'UNDER REVIEW',
    riskScore: 42,
    flags: ['Budget narrative incomplete'],
    reviewer: 'S. Patel',
    dueDate: '2025-01-20',
  },
  {
    id: 'APP-2024-0043',
    applicant: 'TechBridge Workforce Solutions',
    program: 'DOL Workforce Development',
    requestedAmount: 620000,
    submissionDate: '2024-11-22',
    status: 'APPROVED',
    riskScore: 18,
    flags: [],
    reviewer: 'J. Williams',
    dueDate: '2024-12-30',
  },
  {
    id: 'APP-2024-0044',
    applicant: 'Coastal Infrastructure Partners',
    program: 'IIJA Resilience Grant',
    requestedAmount: 4100000,
    submissionDate: '2024-11-20',
    status: 'RISK FLAGGED',
    riskScore: 85,
    flags: [
      'Duplicate application — same EIN as APP-2024-0029',
      'Prior audit finding — questioned costs 2022',
      'Unrealistic budget projections',
    ],
    reviewer: 'A. Rodriguez',
    dueDate: '2025-01-10',
  },
  {
    id: 'APP-2024-0045',
    applicant: 'Heartland Regional Planning Commission',
    program: 'EPA Clean Water Act Grant',
    requestedAmount: 1750000,
    submissionDate: '2024-11-18',
    status: 'UNDER REVIEW',
    riskScore: 31,
    flags: ['Missing environmental impact certification'],
    reviewer: 'L. Chen',
    dueDate: '2025-02-01',
  },
]

// ── Compliance Control Matrix ────────────────────────────────

export const complianceControls = [
  // Governance & Ethics
  {
    id: 'GE-01', domain: 'Governance & Ethics', ref: '2 CFR 200.303',
    control: 'Code of Conduct & Ethics Policy',
    status: 'COMPLIANT', lastReview: '2024-10-15', owner: 'Chief Compliance Officer',
    evidence: 'COC-2024-v3.pdf', notes: '',
  },
  {
    id: 'GE-02', domain: 'Governance & Ethics', ref: 'GAO Principle 2',
    control: 'Board Oversight & Independence',
    status: 'PARTIAL', lastReview: '2024-09-30', owner: 'Board Secretary',
    evidence: 'BOD-Minutes-Q3.pdf', notes: 'Audit committee charter requires update',
  },
  {
    id: 'GE-03', domain: 'Governance & Ethics', ref: '2 CFR 200.318',
    control: 'Conflict of Interest Policy',
    status: 'NON-COMPLIANT', lastReview: '2024-08-01', owner: 'General Counsel',
    evidence: null, notes: 'COI disclosures not collected for current fiscal year',
  },
  // Financial Management
  {
    id: 'FM-01', domain: 'Financial Management', ref: '2 CFR 200.302',
    control: 'Financial Management System Standards',
    status: 'COMPLIANT', lastReview: '2024-11-01', owner: 'CFO',
    evidence: 'FMS-Audit-Report-2024.pdf', notes: '',
  },
  {
    id: 'FM-02', domain: 'Financial Management', ref: '2 CFR 200.305',
    control: 'Payment Controls & Authorization',
    status: 'COMPLIANT', lastReview: '2024-10-28', owner: 'Controller',
    evidence: 'Pay-Auth-Matrix.xlsx', notes: '',
  },
  {
    id: 'FM-03', domain: 'Financial Management', ref: '2 CFR 200.303',
    control: 'Internal Controls Over Financial Reporting',
    status: 'PARTIAL', lastReview: '2024-09-15', owner: 'Internal Audit',
    evidence: 'ICFR-Assessment-Q3.pdf', notes: 'Three control gaps identified — remediation in progress',
  },
  // Procurement
  {
    id: 'PC-01', domain: 'Procurement', ref: '2 CFR 200.317',
    control: 'Procurement Standards for States',
    status: 'COMPLIANT', lastReview: '2024-11-10', owner: 'Procurement Director',
    evidence: 'Proc-Policy-2024.pdf', notes: '',
  },
  {
    id: 'PC-02', domain: 'Procurement', ref: '2 CFR 200.322',
    control: 'Domestic Preferences (Buy American)',
    status: 'PARTIAL', lastReview: '2024-10-01', owner: 'Procurement Director',
    evidence: 'BA-Waiver-Log.xlsx', notes: 'Two active waivers pending COFAR review',
  },
  {
    id: 'PC-03', domain: 'Procurement', ref: '2 CFR 200.326',
    control: 'Contract Provisions & Requirements',
    status: 'NON-COMPLIANT', lastReview: '2024-07-15', owner: 'General Counsel',
    evidence: null, notes: 'Six contracts missing mandatory debarment clauses',
  },
  // Subrecipient Monitoring
  {
    id: 'SR-01', domain: 'Subrecipient Monitoring', ref: '2 CFR 200.330',
    control: 'Subrecipient vs Contractor Determination',
    status: 'COMPLIANT', lastReview: '2024-11-05', owner: 'Grants Manager',
    evidence: 'Sub-Determination-Log.pdf', notes: '',
  },
  {
    id: 'SR-02', domain: 'Subrecipient Monitoring', ref: '2 CFR 200.332',
    control: 'Requirements Passed Through to Subrecipients',
    status: 'PARTIAL', lastReview: '2024-10-10', owner: 'Grants Manager',
    evidence: 'SubAgreements-Q4.zip', notes: 'Two subaward agreements missing performance reporting clauses',
  },
  // Cost Principles
  {
    id: 'CP-01', domain: 'Cost Principles', ref: '2 CFR 200.405',
    control: 'Allowability of Costs',
    status: 'COMPLIANT', lastReview: '2024-11-15', owner: 'Controller',
    evidence: 'Cost-Review-Report.pdf', notes: '',
  },
  {
    id: 'CP-02', domain: 'Cost Principles', ref: '2 CFR 200.430',
    control: 'Compensation for Personal Services',
    status: 'COMPLIANT', lastReview: '2024-10-30', owner: 'HR Director',
    evidence: 'Payroll-Allocation-Q4.xlsx', notes: '',
  },
  {
    id: 'CP-03', domain: 'Cost Principles', ref: '2 CFR 200.414',
    control: 'Indirect Cost Rate Agreement',
    status: 'NON-COMPLIANT', lastReview: '2024-06-01', owner: 'CFO',
    evidence: null, notes: 'NICRA expired June 2024 — renewal pending with cognizant agency',
  },
  // Records & Documentation
  {
    id: 'RD-01', domain: 'Records & Documentation', ref: '2 CFR 200.334',
    control: 'Retention Requirements for Records',
    status: 'COMPLIANT', lastReview: '2024-10-20', owner: 'Records Manager',
    evidence: 'Records-Policy-v5.pdf', notes: '',
  },
  {
    id: 'RD-02', domain: 'Records & Documentation', ref: '2 CFR 200.337',
    control: 'Access to Records',
    status: 'COMPLIANT', lastReview: '2024-10-20', owner: 'Records Manager',
    evidence: 'Access-Log-2024.pdf', notes: '',
  },
]

export const complianceDomainSummary = [
  { domain: 'Governance & Ethics',    total: 3,  compliant: 1, partial: 1, nonCompliant: 1 },
  { domain: 'Financial Management',   total: 3,  compliant: 2, partial: 1, nonCompliant: 0 },
  { domain: 'Procurement',            total: 3,  compliant: 1, partial: 1, nonCompliant: 1 },
  { domain: 'Subrecipient Monitoring', total: 2, compliant: 1, partial: 1, nonCompliant: 0 },
  { domain: 'Cost Principles',        total: 3,  compliant: 2, partial: 0, nonCompliant: 1 },
  { domain: 'Records & Documentation', total: 2, compliant: 2, partial: 0, nonCompliant: 0 },
]
