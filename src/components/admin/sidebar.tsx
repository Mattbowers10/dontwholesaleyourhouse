"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/landing/logo";
import {
  LayoutDashboard,
  Home,
  Inbox,
  LogOut,
} from "lucide-react";

const items = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/properties", label: "Properties", icon: Home },
  { href: "/admin/leads", label: "Leads", icon: Inbox },
];

export function AdminSidebar() {
  const pathname = usePathname();
  return (
    <aside className="sticky top-0 h-screen w-64 flex-shrink-0 border-r border-umber-900/10 bg-cream-50 flex flex-col">
      <div className="p-6 border-b border-umber-900/10">
        <Logo />
      </div>

      <nav className="flex-1 p-3 space-y-0.5">
        <div className="px-3 pt-3 pb-2 text-[10px] uppercase tracking-[0.22em] text-umber-500">
          Workspace
        </div>
        {items.map((item) => {
          const Icon = item.icon;
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                active
                  ? "bg-umber-900 text-cream-50"
                  : "text-umber-700 hover:bg-umber-900/5 hover:text-umber-900"
              )}
            >
              <Icon size={16} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <form
        action="/api/auth/logout"
        method="POST"
        className="p-3 border-t border-umber-900/10"
      >
        <button
          type="submit"
          className="flex w-full items-center gap-3 px-3 py-2 rounded-md text-sm text-umber-700 hover:bg-umber-900/5 hover:text-umber-900 transition-colors"
        >
          <LogOut size={16} />
          Log out
        </button>
      </form>
    </aside>
  );
}
