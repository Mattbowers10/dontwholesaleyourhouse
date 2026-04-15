import Link from "next/link";
import { listProperties } from "@/lib/db";
import { STAGE_LABEL } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { PageHeader } from "@/components/admin/page-header";
import { StageBadge } from "@/components/ui/badge";
import { Plus } from "lucide-react";

export const metadata = { title: "Properties — DWYH Admin" };

export default async function PropertiesPage() {
  const properties = await listProperties();

  return (
    <div>
      <PageHeader
        eyebrow="Portfolio"
        title="Properties"
        description={`${properties.length} ${
          properties.length === 1 ? "property" : "properties"
        } tracked. Click any row to open, edit, or advance stage.`}
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

      <div className="rounded-xl border border-umber-900/10 bg-cream-50 overflow-hidden">
        <div className="admin-scroll overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-umber-900/5 text-xs uppercase tracking-[0.14em] text-umber-500">
              <tr>
                <th className="text-left font-medium px-5 py-3">Address</th>
                <th className="text-left font-medium px-5 py-3">Stage</th>
                <th className="text-right font-medium px-5 py-3">Purchase</th>
                <th className="text-right font-medium px-5 py-3">Rehab</th>
                <th className="text-right font-medium px-5 py-3">
                  Proj. profit
                </th>
                <th className="text-right font-medium px-5 py-3">Completion</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((p) => (
                <tr
                  key={p.id}
                  className="border-t border-umber-900/8 hover:bg-umber-900/4 transition-colors"
                >
                  <td className="px-5 py-4">
                    <Link
                      href={`/admin/properties/${p.id}`}
                      className="text-umber-900 hover:text-terracotta-600 transition-colors font-medium"
                    >
                      {p.address}
                    </Link>
                    <div className="text-xs text-umber-500 mt-0.5">
                      {p.lender ?? "Lender TBD"}
                      {p.closingDate
                        ? ` · Closed ${formatDate(p.closingDate)}`
                        : ""}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <StageBadge stage={p.stage} />
                  </td>
                  <td className="px-5 py-4 text-right font-mono text-umber-900">
                    {formatCurrency(p.purchasePrice)}
                  </td>
                  <td className="px-5 py-4 text-right font-mono text-umber-700">
                    {formatCurrency(p.rehabBudget)}
                  </td>
                  <td className="px-5 py-4 text-right font-mono text-terracotta-600">
                    {formatCurrency(p.totalProjectedProfit)}
                  </td>
                  <td className="px-5 py-4 text-right text-umber-700">
                    {formatDate(p.projectedCompletionDate)}
                  </td>
                </tr>
              ))}
              {properties.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-16 text-center text-umber-500"
                  >
                    No properties yet.{" "}
                    <Link
                      href="/admin/properties/new"
                      className="text-terracotta-600 hover:text-terracotta-700"
                    >
                      Add the first one →
                    </Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 text-xs text-umber-500">
        Stages: {Object.values(STAGE_LABEL).join(" · ")}
      </div>
    </div>
  );
}
