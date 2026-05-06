/**
 * Control Map — maps rule IDs to COSO/GAO/OMB control metadata and corrective actions.
 */
export const CTRL_MAP = {
  R001:{ctrl:"Payment Verification (3-way match)",coso:"Control Activities",  gao:"OV1.10",fix:"Reject duplicate invoice. Request unique invoice number. File finding per 2 CFR 200.305(b)."},
  R002:{ctrl:"New Vendor Vetting Protocol",        coso:"Control Activities",  gao:"AM2.02",fix:"Suspend payment. Verify SAM.gov. Obtain CFO sign-off per 2 CFR 200.318."},
  R003:{ctrl:"Budget Variance Monitoring",         coso:"Monitoring",          gao:"OV1.05",fix:"Request budget modification or reject over-allocation per 2 CFR 200.405."},
  R005:{ctrl:"Procurement Competition Controls",   coso:"Control Activities",  gao:"AM1.03",fix:"Require sole-source justification or re-compete procurement per 2 CFR 200.320."},
  R006:{ctrl:"Vendor Debarment Screening",         coso:"Control Environment", gao:"AM2.01",fix:"HALT PAYMENT. Notify Program Officer and OIG immediately per 2 CFR 200.213."},
  R007:{ctrl:"Conflict of Interest Disclosure",    coso:"Control Environment", gao:"OV2.01",fix:"HALT PAYMENT. Refer to Ethics Officer. File COI disclosure per 2 CFR 200.318(c)."},
  R008:{ctrl:"Period of Performance Monitoring",   coso:"Monitoring",          gao:"OV1.05",fix:"Reject expenditure or obtain prior approval per 2 CFR 200.309."},
  R009:{ctrl:"Transaction Structuring Detection",  coso:"Control Activities",  gao:"AM1.05",fix:"Flag for BSA review. Report structuring pattern to OIG per 31 U.S.C. 5324."},
  R010:{ctrl:"Supporting Document Verification",   coso:"Control Activities",  gao:"AM3.01",fix:"Halt payment. Obtain all required supporting documentation per 2 CFR 200.302(b)(7)."},
};

/** RBAC role definitions */
export const ROLES = {
  admin:       {label:"System Admin",       icon:"🛡",color:"#7C3AED",views:["overview","alerts","transactions","cases","compliance","settings"],canClose:true, canRules:true, seeAll:true},
  compliance:  {label:"Compliance Officer", icon:"👤",color:"#1D4ED8",views:["overview","alerts","transactions","cases","compliance"],          canClose:true, canRules:false,seeAll:true},
  investigator:{label:"Investigator",       icon:"🔍",color:"#0D9488",views:["overview","alerts","transactions","cases"],                       canClose:false,canRules:false,seeAll:false},
  auditor:     {label:"External Auditor",   icon:"📋",color:"#92640A",views:["overview","compliance"],                                          canClose:false,canRules:false,seeAll:false},
};

/** Initial detection rules */
export const INIT_RULES = [
  {id:"R001",name:"Duplicate Invoice",           on:true,sev:"HIGH",    omb:"2 CFR 200.305(b)",thr:null,  cat:"Financial"},
  {id:"R002",name:"New Vendor Large Pay",         on:true,sev:"HIGH",    omb:"2 CFR 200.318",   thr:50000, cat:"Vendor"},
  {id:"R003",name:"Overbudget Category",          on:true,sev:"MEDIUM",  omb:"2 CFR 200.405",   thr:1.1,   cat:"Budget"},
  {id:"R005",name:"Sole Source No Docs >$250K",   on:true,sev:"HIGH",    omb:"2 CFR 200.320",   thr:250000,cat:"Procurement"},
  {id:"R006",name:"Debarred Vendor",              on:true,sev:"CRITICAL",omb:"2 CFR 200.213",   thr:null,  cat:"Vendor"},
  {id:"R007",name:"Conflict of Interest",         on:true,sev:"CRITICAL",omb:"2 CFR 200.318(c)",thr:null,  cat:"Governance"},
  {id:"R008",name:"Period of Performance",        on:true,sev:"HIGH",    omb:"2 CFR 200.309",   thr:null,  cat:"Compliance"},
  {id:"R009",name:"Transaction Structuring",      on:true,sev:"HIGH",    omb:"31 U.S.C. 5324",  thr:50000, cat:"Financial"},
  {id:"R010",name:"Missing Supporting Documents", on:true,sev:"MEDIUM",  omb:"2 CFR 200.302",   thr:null,  cat:"Documentation"},
];

/** Compliance matrix controls */
export const COMPLIANCE_MATRIX_DEF = [
  {id:"CC-001",ctrl:"Payment Verification",       coso:"Control Activities",  gao:"OV1.10",omb:"2 CFR 200.305",    rule:"R001"},
  {id:"CC-002",ctrl:"Procurement Competition",    coso:"Control Activities",  gao:"AM1.03",omb:"2 CFR 200.320",    rule:"R005"},
  {id:"CC-003",ctrl:"Vendor Debarment Screen",    coso:"Control Environment", gao:"AM2.01",omb:"2 CFR 200.213",    rule:"R006"},
  {id:"CC-004",ctrl:"Conflict of Interest",       coso:"Control Environment", gao:"OV2.01",omb:"2 CFR 200.318(c)", rule:"R007"},
  {id:"CC-005",ctrl:"Period of Performance",      coso:"Monitoring",          gao:"OV1.05",omb:"2 CFR 200.309",    rule:"R008"},
  {id:"CC-006",ctrl:"FFR Reporting Timeliness",   coso:"Information & Comm.", gao:"OV4.01",omb:"2 CFR 200.328",    rule:"R004"},
  {id:"CC-007",ctrl:"New Vendor Vetting",         coso:"Control Activities",  gao:"AM2.02",omb:"2 CFR 200.318",    rule:"R002"},
  {id:"CC-008",ctrl:"Budget Variance Monitor",    coso:"Monitoring",          gao:"OV1.05",omb:"2 CFR 200.405",    rule:"R003"},
  {id:"CC-009",ctrl:"Transaction Structuring",    coso:"Control Activities",  gao:"AM1.05",omb:"31 U.S.C. 5324",   rule:"R009"},
  {id:"CC-010",ctrl:"Supporting Document Verify", coso:"Control Activities",  gao:"AM3.01",omb:"2 CFR 200.302",    rule:"R010"},
];
