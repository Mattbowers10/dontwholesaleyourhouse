import Link from "next/link";

export default function PropertyNotFound() {
  return (
    <div className="py-20 text-center">
      <div className="font-display text-4xl text-umber-900 mb-3">
        Property not found
      </div>
      <p className="text-umber-700 mb-8">
        It may have been deleted, or the link is outdated.
      </p>
      <Link
        href="/admin/properties"
        className="inline-flex items-center gap-2 rounded-lg bg-umber-900 px-5 h-11 text-sm font-medium text-cream-50 hover:bg-umber-700 transition-colors"
      >
        Back to properties →
      </Link>
    </div>
  );
}
