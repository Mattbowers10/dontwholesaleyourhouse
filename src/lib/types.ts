export type PropertyStage =
  | "under_contract"
  | "in_rehab"
  | "listed"
  | "sold";

export const STAGE_ORDER: PropertyStage[] = [
  "under_contract",
  "in_rehab",
  "listed",
  "sold",
];

export const STAGE_LABEL: Record<PropertyStage, string> = {
  under_contract: "Under Contract",
  in_rehab: "In Rehab",
  listed: "Listed",
  sold: "Sold",
};

export interface Property {
  id: string;
  address: string;
  stage: PropertyStage;

  // Financing
  lender: string | null;
  interestRate: number | null; // stored as decimal, e.g. 0.1199
  closingDate: string | null; // ISO date
  sellerTitleCompany: string | null;
  buyerTitleCompany: string | null;

  // Money
  purchasePrice: number | null;
  rehabBudget: number | null;
  earnestMoney: number | null;
  downPayment: number | null; // includes earnest
  totalLoanAmount: number | null;
  origFee: number | null;
  loanFee: number | null;
  acquisitionFee: number | null;
  financeFee: number | null;
  closingCosts: number | null;
  neededAtClosing: number | null;
  ioPayments: number | null; // monthly IO payment amount

  // Projections
  projectedSalePrice: number | null;
  projectedProfitFromSale: number | null;
  projectedProfitFromRehab: number | null;
  totalProjectedProfit: number | null;
  investedCapital: number | null;
  equityMultiple: number | null;
  projectedCompletionDate: string | null; // ISO date

  // Sale
  soldDate: string | null;
  soldPrice: number | null;

  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string | null;
  situation: string | null;
  timeline: string | null;
  message: string | null;
  createdAt: string;
}

export type PropertyInput = Omit<Property, "id" | "createdAt" | "updatedAt">;
