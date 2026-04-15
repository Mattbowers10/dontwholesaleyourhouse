import Link from "next/link";
import { PageHeader } from "@/components/admin/page-header";
import { PropertyForm } from "@/components/admin/property-form";
import { ArrowLeft } from "lucide-react";

export const metadata = { title: "New property — DWYH Admin" };

export default function NewPropertyPage() {
  return (
    <div>
      <Link
        href="/admin/properties"
        className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] text-umber-500 hover:text-umber-900 mb-6"
      >
        <ArrowLeft size={12} /> All properties
      </Link>
      <PageHeader
        eyebrow="New acquisition"
        title="Add a property"
        description="Only address and stage are required. Fill in what you know now — finish the underwriting later."
      />
      <PropertyForm mode={{ kind: "new" }} />
    </div>
  );
}
