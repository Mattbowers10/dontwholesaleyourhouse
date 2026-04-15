import type { PropertyInput, PropertyStage } from "./types";
import { STAGE_ORDER } from "./types";
import { parseNumber, parseString } from "./utils";

export type FullParseResult =
  | { ok: true; input: PropertyInput }
  | { ok: false; error: string };

export type PartialParseResult =
  | { ok: true; input: Partial<PropertyInput> }
  | { ok: false; error: string };

export function parseFormToPropertyInput(
  form: FormData,
  opts?: { partial: false }
): FullParseResult;
export function parseFormToPropertyInput(
  form: FormData,
  opts: { partial: true }
): PartialParseResult;
export function parseFormToPropertyInput(
  form: FormData,
  opts: { partial?: boolean } = {}
): FullParseResult | PartialParseResult {
  const address = parseString(form.get("address"));
  const stageRaw = parseString(form.get("stage"));

  if (!opts.partial) {
    if (!address) return { ok: false, error: "Address is required." };
    if (!stageRaw || !isStage(stageRaw))
      return { ok: false, error: "A valid stage is required." };
  } else if (stageRaw && !isStage(stageRaw)) {
    return { ok: false, error: "Invalid stage." };
  }

  const has = (k: string) => form.has(k);
  const num = (k: string) => (has(k) ? parseNumber(form.get(k)) : undefined);
  const str = (k: string) => (has(k) ? parseString(form.get(k)) : undefined);

  const base: Partial<PropertyInput> = {};
  if (address != null) base.address = address;
  if (stageRaw && isStage(stageRaw)) base.stage = stageRaw;

  if (form.has("interestRatePct")) {
    const pct = parseNumber(form.get("interestRatePct"));
    base.interestRate = pct == null ? null : pct / 100;
  }
  const assignStr = (k: keyof PropertyInput) => {
    const v = str(k as string);
    if (v !== undefined) (base as Record<string, unknown>)[k] = v;
  };
  const assignNum = (k: keyof PropertyInput) => {
    const v = num(k as string);
    if (v !== undefined) (base as Record<string, unknown>)[k] = v;
  };

  assignStr("lender");
  assignStr("closingDate");
  assignStr("sellerTitleCompany");
  assignStr("buyerTitleCompany");

  assignNum("purchasePrice");
  assignNum("rehabBudget");
  assignNum("earnestMoney");
  assignNum("downPayment");
  assignNum("totalLoanAmount");
  assignNum("origFee");
  assignNum("loanFee");
  assignNum("acquisitionFee");
  assignNum("financeFee");
  assignNum("closingCosts");
  assignNum("neededAtClosing");
  assignNum("ioPayments");

  assignNum("projectedSalePrice");
  assignNum("projectedProfitFromSale");
  assignNum("projectedProfitFromRehab");
  assignNum("totalProjectedProfit");
  assignNum("investedCapital");
  assignNum("equityMultiple");
  assignStr("projectedCompletionDate");

  assignStr("soldDate");
  assignNum("soldPrice");
  assignStr("notes");

  if (!opts.partial) {
    // Backfill missing optional fields with null so we have a complete PropertyInput.
    const nullable: (keyof PropertyInput)[] = [
      "lender",
      "interestRate",
      "closingDate",
      "sellerTitleCompany",
      "buyerTitleCompany",
      "purchasePrice",
      "rehabBudget",
      "earnestMoney",
      "downPayment",
      "totalLoanAmount",
      "origFee",
      "loanFee",
      "acquisitionFee",
      "financeFee",
      "closingCosts",
      "neededAtClosing",
      "ioPayments",
      "projectedSalePrice",
      "projectedProfitFromSale",
      "projectedProfitFromRehab",
      "totalProjectedProfit",
      "investedCapital",
      "equityMultiple",
      "projectedCompletionDate",
      "soldDate",
      "soldPrice",
      "notes",
    ];
    for (const f of nullable) {
      if (!(f in base)) (base as Record<string, unknown>)[f] = null;
    }
    return { ok: true, input: base as PropertyInput };
  }

  return { ok: true, input: base };
}

function isStage(s: string): s is PropertyStage {
  return (STAGE_ORDER as readonly string[]).includes(s);
}
