export type UserRole = "client" | "studio";

export type Company = {
  id: string;
  name: string;
  vat: string;
  lastUpdate: string; // ISO date
};

export type MockUser = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  companyId?: string;
  password: string; // demo only
};

export type Period = {
  id: string;
  label: string;
  year: number;
  month?: number;
  quarter?: 1 | 2 | 3 | 4;
};

export type CentroImputazione = {
  id: string;
  companyId: string;
  code: string;
  name: string;
};

export type KpiRow = {
  companyId: string;
  periodId: string;
  ricavi: number;
  valoreAggiunto: number;
  ebitda: number;
  ebit: number;
  ebt?: number;
  utile: number;
  ebitdaMargin: number; // 0-100
  ebitMargin: number;
  personaleSuRicavi: number; // 0-100
  materieSuRicavi: number; // 0-100
};

export type ContoVoce = {
  id: string;
  companyId: string;
  periodId: string;
  centrotId: string | "totale";
  voce: string;
  importo: number;
  livello: 1 | 2 | 3;
  parentId?: string;
};

export type DocumentKind = "contabile" | "hr";

export type DocumentItem = {
  id: string;
  companyId: string;
  title: string;
  kind: DocumentKind;
  periodLabel: string;
  uploadedAt: string;
  fileName: string;
  /** path under /public */
  publicPath: string;
};

export type FiscalDeadline = {
  id: string;
  companyId: string;
  title: string;
  date: string; // YYYY-MM-DD
  type: "iva" | "irap" | "bilancio" | "dichiarazione" | "altro";
  description?: string;
};

export type UploadJob = {
  id: string;
  companyName: string;
  companyId: string;
  fileName: string;
  periodLabel: string;
  centrotLabel: string;
  status: "ok" | "error" | "pending";
  submittedAt: string;
};

export type SessionPayloadV1 = {
  v: 1;
  role: UserRole;
  sub: string;
  email: string;
  name: string;
  companyId?: string;
};
