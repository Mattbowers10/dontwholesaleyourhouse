import Link from "next/link";
import { listProperties, listLeads } from "@/lib/db";
import { STAGE_LABEL, STAGE_ORDER } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Metric } from "@/components/admin/metric";
import { PageHeader } from "@/components/admin/page-header";
import { StageBadge } from "@/components/ui/badge";
import { Plus, ArrowRight } from "lucide-react";

export const metadata = { title: "Overview — DWYH Admin" };

export default async function AdminOverviewPage() {
  const properties = await listProperties();
  const leads = await listLeads();

  const active = properties.filter((p) => p.stage !== "sold");
  const sold = properties.filter((p) => p.stage === "sold");

  const investedCapital = active.reduce(
    (acc, p) => acc + (p.investedCapital ?? 0),
    0
  );
  const projectedProfit = active.reduce(
    (acc, p) => acc + (p.totalProjectedProfit ?? 0),
    0
  );
  const projectedRevenue = active.reduce(
    (acc, p) => acc + (p.projectedSalePrice ?? 0),
    0
  );
  const realizedProfit = sold.reduce(
    (acc, p) =>
      acc +
      (p.soldPrice != null && p.purchasePrice != null
        ? p.soldPrice -
          p.purchasePrice -
          (p.rehabBudget ?? 0) -
          (p.ioPayments ?? 0)
        : 0),
    0
  );

  const stageCounts = STAGE_ORDER.map((stage) => ({
    stage,
    count: properties.filter((p) => p.stage === stage).length,
  }));

  const upcoming = [...active]
    .filter((p) => p.projectedCompletionDate)
    .sort((a, b) =>
      (a.projectedCompletionDate ?? "").localeCompare(
        b.projectedCompletionDate ?? ""
      )
    )
    .slice(0, 5);

  return (
    <div>
      <PageHeader
        eyebrow="Operations"
        title="Portfolio overview"
        description="Live status across every property DWYH owns or has under contract."
        actions={
          <Link
            href="/admin/properties/new"
            className="inline-flex items-center gap-2 rounded-lg bg-terracotta-500 px-4 h-11 text-sm font-medium text-cream-50 hover:bg-terracotta-600 shadow-warm transition-all"
          >
            <Plus size={16} />
            Add property
          </Link>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <Metric
          label="Active deals"
          value={String(active.length)}
          sub={`${sold.length} sold total`}
        />
        <Metric
          label="Invested capital"
          value={formatCurrency(investedCapital, { compact: true })}
          sub="Across active deals"
          accent="umber"
        />
        <Metric
          label="Projected profit"
          value={formatCurrency(projectedProfit, { compact: true })}
          sub={`On ${formatCurrency(projectedRevenue, {
            compact: true,
          })} projected sales`}
          accent="terracotta"
        />
        <Metric
          label="Realized profit"
          value={formatCurrency(realizedProfit, { compact: true })}
          sub="From sold properties"
          accent="forest"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Stage breakdown */}
        <div className="rounded-xl border border-umber-900/10 bg-cream-50 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-xl text-umber-900">
              By stage
            </h2>
          </div>
          <div className="space-y-3">
            {stageCounts.map(({ stage, count }) => {
              const pct =
                properties.length > 0
                  ? (count / properties.length) * 100
                  : 0;
              return (
                <div key={stage}>
                  <div className="flex items-baseline justify-between mb-1.5">
                    <StageBadge stage={stage} />
                    <div className="text-sm text-umber-900 font-medium">
                      {count}
                    </div>
                  </div>
                  <div className="h-1.5 rounded-full bg-umber-900/8 overflow-hidden">
                    <div
                      className="h-full bg-terracotta-500 transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming completions */}
        <div className="rounded-xl border border-umber-900/10 bg-cream-50 p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-xl text-umber-900">
              Next completions
            </h2>
            <Link
              href="/admin/properties"
              className="text-xs uppercase tracking-[0.18em] text-umber-500 hover:text-umber-900 transition-colors inline-flex items-center gap-1"
            >
              View all <ArrowRight size={12} />
            </Link>
          </div>
          {upcoming.length === 0 ? (
            <div className="text-sm text-umber-500">
              No projected completion dates set.
            </div>
          ) : (
            <ul className="divide-y divide-umber-900/8">
              {upcoming.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/admin/properties/${p.id}`}
                    className="flex items-center justify-between py-3 hover:bg-umber-900/4 rounded px-2 -mx-2 transition-colors"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="text-sm text-umber-900 font-medium truncate">
                        {p.address}
                      </div>
                      <div className="text-xs text-umber-500 mt-0.5">
                        {STAGE_LABEL[p.stage]} · Rehab{" "}
                        {formatCurrency(p.rehabBudget, { compact: true })}
                      </div>
                    </div>
                    <div className="text-right ml-4 flex-shrink-0">
                      <div className="text-sm text-umber-900">
                        {formatDate(p.projectedCompletionDate)}
                      </div>
                      <div className="text-xs text-terracotta-600">
                        {formatCurrency(p.totalProjectedProfit, {
                          compact: true,
                        })}{" "}
                        projected
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Recent leads preview */}
      <div className="mt-6 rounded-xl border border-umber-900/10 bg-cream-50 p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-xl text-umber-900">
            Recent leads
          </h2>
          <Link
            href="/admin/leads"
            className="text-xs uppercase tracking-[0.18em] text-umber-500 hover:text-umber-900 transition-colors inline-flex items-center gap-1"
          >
            View all <ArrowRight size={12} />
          </Link>
        </div>
        {leads.length === 0 ? (
          <div className="text-sm text-umber-500">
            No leads yet. Contact form submissions will show here.
          </div>
        ) : (
          <ul className="divide-y divide-umber-900/8">
            {leads.slice(0, 4).map((l) => (
              <li key={l.id} className="py-3 flex items-baseline justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="text-sm text-umber-900 font-medium truncate">
                    {l.name}
                  </div>
                  <div className="text-xs text-umber-500 mt-0.5 truncate">
                    {l.phone} · {l.email}
                    {l.address ? ` · ${l.address}` : ""}
                  </div>
                </div>
                <div className="text-xs text-umber-500 flex-shrink-0">
                  {formatDate(l.createdAt)}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
