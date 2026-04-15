import Link from "next/link";
import { notFound } from "next/navigation";
import { getProperty } from "@/lib/db";
import { PageHeader } from "@/components/admin/page-header";
import { PropertyForm } from "@/components/admin/property-form";
import { ArrowLeft } from "lucide-react";

export const metadata = { title: "Edit property — DWYH Admin" };

export default async function EditPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const p = await getProperty(id);
  if (!p) notFound();

  return (
    <div>
      <Link
        href={`/admin/properties/${p.id}`}
        className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] text-umber-500 hover:text-umber-900 mb-6"
      >
        <ArrowLeft size={12} /> Back to property
      </Link>
      <PageHeader
        eyebrow="Editing"
        title={p.address}
        description="Update any field. Changes save on submit."
      />
      <PropertyForm mode={{ kind: "edit", property: p }} />
    </div>
  );
}
