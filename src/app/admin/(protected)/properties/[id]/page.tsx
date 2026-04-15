import Link from "next/link";
import { notFound } from "next/navigation";
import { getProperty } from "@/lib/db";
import { STAGE_LABEL } from "@/lib/types";
import { formatCurrency, formatDate, formatPercent } from "@/lib/utils";
import { PageHeader } from "@/components/admin/page-header";
import { StageBadge } from "@/components/ui/badge";
import { ArrowLeft, Pencil } from "lucide-react";
import { StageSwitcher } from "@/components/admin/stage-switcher";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const p = await getProperty(id);
  return { title: p ? `${p.address} — DWYH Admin` : "Property — DWYH Admin" };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const p = await getProperty(id);
  if (!p) notFound();

  const rows = [
    { label: "Lender", value: p.lender ?? "—" },
    {
      label: "Interest rate",
      value: p.interestRate != null ? formatPercent(p.interestRate) : "—",
    },
    { label: "Closing date", value: formatDate(p.closingDate) },
    { label: "Seller title", value: p.sellerTitleCompany ?? "—" },
    { label: "Buyer title", value: p.buyerTitleCompany ?? "—" },
    {
      label: "Projected completion",
      value: formatDate(p.projectedCompletionDate),
    },
  ];

  const money = [
    { label: "Purchase price", value: p.purchasePrice, accent: false },
    { label: "Rehab budget", value: p.rehabBudget, accent: false },
    { label: "Total loan amount", value: p.totalLoanAmount, accent: false },
    { label: "Earnest money", value: p.earnestMoney, accent: false },
    { label: "Down payment", value: p.downPayment, accent: false },
    { label: "Needed at closing", value: p.neededAtClosing, accent: false },
    { label: "Origination fee", value: p.origFee, accent: false },
    { label: "Loan fee", value: p.loanFee, accent: false },
    { label: "Acquisition fee", value: p.acquisitionFee, accent: false },
    { label: "Finance fee", value: p.financeFee, accent: false },
    { label: "Closing costs", value: p.closingCosts, accent: false },
    { label: "IO payments (total)", value: p.ioPayments, accent: false },
  ];

  const projections = [
    {
      label: "Projected sale price",
      value: p.projectedSalePrice,
    },
    {
      label: "Projected profit (sale)",
      value: p.projectedProfitFromSale,
    },
    {
      label: "Projected profit (rehab)",
      value: p.projectedProfitFromRehab,
    },
    {
      label: "Total projected profit",
      value: p.totalProjectedProfit,
      highlight: true,
    },
    {
      label: "Invested capital",
      value: p.investedCapital,
    },
  ];

  return (
    <div>
      <Link
        href="/admin/properties"
        className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] text-umber-500 hover:text-umber-900 mb-6"
      >
        <ArrowLeft size={12} /> All properties
      </Link>

      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 pb-8 border-b border-umber-900/10">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <StageBadge stage={p.stage} />
            {p.equityMultiple != null && (
              <span className="text-xs uppercase tracking-[0.18em] text-umber-500">
                {p.equityMultiple.toFixed(2)}× equity multiple
              </span>
            )}
          </div>
          <h1 className="font-display text-4xl md:text-5xl tracking-tight-display text-umber-900 leading-tight">
            {p.address}
          </h1>
        </div>
        <Link
          href={`/admin/properties/${p.id}/edit`}
          className="inline-flex items-center gap-2 rounded-lg border border-umber-900/25 bg-cream-50 px-4 h-11 text-sm font-medium text-umber-900 hover:border-umber-900/50 transition-colors"
        >
          <Pencil size={14} />
          Edit
        </Link>
      </div>

      <div className="mb-8">
        <StageSwitcher propertyId={p.id} stage={p.stage} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <div className="rounded-xl border border-umber-900/10 bg-cream-50 p-6">
          <h2 className="font-display text-xl text-umber-900 mb-5">
            Deal details
          </h2>
          <dl className="space-y-3">
            {rows.map((r) => (
              <div
                key={r.label}
                className="flex items-baseline justify-between gap-4 text-sm"
              >
                <dt className="text-umber-500">{r.label}</dt>
                <dd className="text-umber-900 text-right">{r.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="rounded-xl border border-umber-900/10 bg-cream-50 p-6 lg:col-span-2">
          <h2 className="font-display text-xl text-umber-900 mb-5">
            Capital stack
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4">
            {money.map((m) => (
              <div key={m.label}>
                <div className="text-xs uppercase tracking-[0.14em] text-umber-500 mb-1">
                  {m.label}
                </div>
                <div className="font-mono text-umber-900">
                  {formatCurrency(m.value)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-xl border border-umber-900/10 bg-cream-50 p-6">
          <h2 className="font-display text-xl text-umber-900 mb-5">
            Projections
          </h2>
          <dl className="divide-y divide-umber-900/8">
            {projections.map((pr) => (
              <div
                key={pr.label}
                className="flex items-baseline justify-between gap-4 py-3 first:pt-0 last:pb-0"
              >
                <dt className="text-sm text-umber-500">{pr.label}</dt>
                <dd
                  className={`font-mono ${
                    pr.highlight
                      ? "text-terracotta-600 text-lg"
                      : "text-umber-900"
                  }`}
                >
                  {formatCurrency(pr.value)}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="rounded-xl border border-umber-900/10 bg-cream-50 p-6">
          <h2 className="font-display text-xl text-umber-900 mb-5">Sale</h2>
          {p.stage === "sold" || p.soldDate ? (
            <div className="space-y-4">
              <div>
                <div className="text-xs uppercase tracking-[0.14em] text-umber-500 mb-1">
                  Sold date
                </div>
                <div className="text-umber-900">{formatDate(p.soldDate)}</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.14em] text-umber-500 mb-1">
                  Sold price
                </div>
                <div className="font-mono text-forest-500 text-2xl">
                  {formatCurrency(p.soldPrice)}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-sm text-umber-500">
              This property is {STAGE_LABEL[p.stage].toLowerCase()}. Sale
              details will appear here when marked as sold.
            </div>
          )}
        </div>
      </div>

      {p.notes && (
        <div className="mt-6 rounded-xl border border-umber-900/10 bg-cream-50 p-6">
          <h2 className="font-display text-xl text-umber-900 mb-3">Notes</h2>
          <p className="text-umber-700 leading-relaxed whitespace-pre-wrap">
            {p.notes}
          </p>
        </div>
      )}
    </div>
  );
}
