import { listLeads } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { PageHeader } from "@/components/admin/page-header";

export const metadata = { title: "Leads — DWYH Admin" };

const SITUATION_LABEL: Record<string, string> = {
  tired_landlord: "Tired landlord",
  inherited: "Inherited",
  divorce: "Divorce",
  relocation: "Relocating",
  behind_on_payments: "Behind on payments",
  needs_repairs: "Needs repairs",
  just_exploring: "Just exploring",
  other: "Other",
};

const TIMELINE_LABEL: Record<string, string> = {
  asap: "ASAP",
  "30d": "Within 30 days",
  "60d": "Within 60 days",
  flexible: "Flexible",
};

export default async function LeadsPage() {
  const leads = await listLeads();

  return (
    <div>
      <PageHeader
        eyebrow="Pipeline"
        title="Leads"
        description={`${leads.length} ${
          leads.length === 1 ? "contact form submission" : "contact form submissions"
        } from the site.`}
      />

      {leads.length === 0 ? (
        <div className="rounded-xl border border-umber-900/10 bg-cream-50 p-16 text-center">
          <div className="font-display text-2xl text-umber-900 mb-2">
            No leads yet
          </div>
          <p className="text-sm text-umber-500 max-w-md mx-auto">
            When someone fills out the contact form on the marketing site,
            they&apos;ll show up here with their details.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {leads.map((l) => (
            <article
              key={l.id}
              className="rounded-xl border border-umber-900/10 bg-cream-50 p-6"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <h3 className="font-display text-xl text-umber-900">
                    {l.name}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-sm text-umber-700">
                    <a
                      href={`tel:${l.phone}`}
                      className="link-inline text-umber-900"
                    >
                      {l.phone}
                    </a>
                    <span className="text-umber-500">·</span>
                    <a
                      href={`mailto:${l.email}`}
                      className="link-inline text-umber-900"
                    >
                      {l.email}
                    </a>
                  </div>
                </div>
                <div className="text-xs text-umber-500 uppercase tracking-[0.16em]">
                  {formatDate(l.createdAt)}
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 text-sm">
                {l.address && (
                  <div>
                    <div className="text-xs uppercase tracking-[0.14em] text-umber-500 mb-0.5">
                      Property
                    </div>
                    <div className="text-umber-900">{l.address}</div>
                  </div>
                )}
                {l.situation && (
                  <div>
                    <div className="text-xs uppercase tracking-[0.14em] text-umber-500 mb-0.5">
                      Situation
                    </div>
                    <div className="text-umber-900">
                      {SITUATION_LABEL[l.situation] ?? l.situation}
                    </div>
                  </div>
                )}
                {l.timeline && (
                  <div>
                    <div className="text-xs uppercase tracking-[0.14em] text-umber-500 mb-0.5">
                      Timeline
                    </div>
                    <div className="text-umber-900">
                      {TIMELINE_LABEL[l.timeline] ?? l.timeline}
                    </div>
                  </div>
                )}
              </div>

              {l.message && (
                <div className="mt-4 pt-4 border-t border-umber-900/8">
                  <div className="text-xs uppercase tracking-[0.14em] text-umber-500 mb-1">
                    Message
                  </div>
                  <p className="text-umber-700 leading-relaxed whitespace-pre-wrap">
                    {l.message}
                  </p>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
