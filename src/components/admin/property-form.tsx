"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input, Label, Select, Textarea } from "@/components/ui/input";
import type { Property, PropertyStage } from "@/lib/types";
import { STAGE_LABEL, STAGE_ORDER } from "@/lib/types";
import { formatDateInput } from "@/lib/utils";

type Mode = { kind: "new" } | { kind: "edit"; property: Property };

export function PropertyForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const p = mode.kind === "edit" ? mode.property : null;
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const url =
      mode.kind === "new"
        ? "/api/properties"
        : `/api/properties/${mode.property.id}`;
    const method = mode.kind === "new" ? "POST" : "PATCH";
    try {
      const res = await fetch(url, { method, body: fd });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error ?? "Failed to save.");
      }
      const data = await res.json();
      const nextId =
        data.property?.id ??
        (mode.kind === "edit" ? mode.property.id : null);
      router.push(
        nextId ? `/admin/properties/${nextId}` : "/admin/properties"
      );
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save.");
      setSubmitting(false);
    }
  }

  async function onDelete() {
    if (mode.kind !== "edit") return;
    if (
      !confirm(
        `Delete ${mode.property.address}? This can't be undone.`
      )
    )
      return;
    setSubmitting(true);
    try {
      const res = await fetch(`/api/properties/${mode.property.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete.");
      router.push("/admin/properties");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-10">
      <Section title="Basics">
        <div className="grid md:grid-cols-[2fr,1fr] gap-4">
          <Field label="Address" name="address" required defaultValue={p?.address} />
          <div>
            <Label>Stage</Label>
            <Select name="stage" defaultValue={p?.stage ?? "under_contract"}>
              {STAGE_ORDER.map((s: PropertyStage) => (
                <option key={s} value={s}>
                  {STAGE_LABEL[s]}
                </option>
              ))}
            </Select>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <Field label="Lender" name="lender" defaultValue={p?.lender ?? ""} />
          <Field
            label="Interest rate (e.g. 8.5)"
            name="interestRatePct"
            inputMode="decimal"
            defaultValue={
              p?.interestRate != null ? (p.interestRate * 100).toString() : ""
            }
          />
          <Field
            label="Closing date"
            type="date"
            name="closingDate"
            defaultValue={formatDateInput(p?.closingDate)}
          />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <Field
            label="Seller title company"
            name="sellerTitleCompany"
            defaultValue={p?.sellerTitleCompany ?? ""}
          />
          <Field
            label="Buyer title company"
            name="buyerTitleCompany"
            defaultValue={p?.buyerTitleCompany ?? ""}
          />
        </div>
      </Section>

      <Section title="Acquisition & loan">
        <div className="grid md:grid-cols-3 gap-4">
          <MoneyField label="Purchase price" name="purchasePrice" defaultValue={p?.purchasePrice} />
          <MoneyField label="Rehab budget" name="rehabBudget" defaultValue={p?.rehabBudget} />
          <MoneyField label="Total loan amount" name="totalLoanAmount" defaultValue={p?.totalLoanAmount} />
          <MoneyField label="Earnest money" name="earnestMoney" defaultValue={p?.earnestMoney} />
          <MoneyField label="Down payment (incl. earnest)" name="downPayment" defaultValue={p?.downPayment} />
          <MoneyField label="Needed at closing" name="neededAtClosing" defaultValue={p?.neededAtClosing} />
        </div>
      </Section>

      <Section title="Fees">
        <div className="grid md:grid-cols-3 gap-4">
          <MoneyField label="Origination fee" name="origFee" defaultValue={p?.origFee} />
          <MoneyField label="Loan fee" name="loanFee" defaultValue={p?.loanFee} />
          <MoneyField label="Acquisition fee" name="acquisitionFee" defaultValue={p?.acquisitionFee} />
          <MoneyField label="Finance fee" name="financeFee" defaultValue={p?.financeFee} />
          <MoneyField label="Closing costs" name="closingCosts" defaultValue={p?.closingCosts} />
          <MoneyField label="IO payments (total)" name="ioPayments" defaultValue={p?.ioPayments} />
        </div>
      </Section>

      <Section title="Projections">
        <div className="grid md:grid-cols-3 gap-4">
          <MoneyField label="Projected sale price" name="projectedSalePrice" defaultValue={p?.projectedSalePrice} />
          <MoneyField label="Projected profit from sale" name="projectedProfitFromSale" defaultValue={p?.projectedProfitFromSale} />
          <MoneyField label="Projected profit from rehab" name="projectedProfitFromRehab" defaultValue={p?.projectedProfitFromRehab} />
          <MoneyField label="Total projected profit" name="totalProjectedProfit" defaultValue={p?.totalProjectedProfit} />
          <MoneyField label="Invested capital" name="investedCapital" defaultValue={p?.investedCapital} />
          <Field
            label="Equity multiple (e.g. 3.32)"
            name="equityMultiple"
            inputMode="decimal"
            defaultValue={p?.equityMultiple?.toString() ?? ""}
          />
          <Field
            label="Projected completion date"
            type="date"
            name="projectedCompletionDate"
            defaultValue={formatDateInput(p?.projectedCompletionDate)}
          />
        </div>
      </Section>

      <Section title="Sale (when sold)">
        <div className="grid md:grid-cols-2 gap-4">
          <Field
            label="Sold date"
            type="date"
            name="soldDate"
            defaultValue={formatDateInput(p?.soldDate)}
          />
          <MoneyField label="Sold price" name="soldPrice" defaultValue={p?.soldPrice} />
        </div>
        <div>
          <Label>Notes</Label>
          <Textarea
            name="notes"
            defaultValue={p?.notes ?? ""}
            placeholder="Anything worth remembering about this deal…"
          />
        </div>
      </Section>

      {error && (
        <div className="rounded-md border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger">
          {error}
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-6 border-t border-umber-900/10">
        <div>
          {mode.kind === "edit" && (
            <Button
              type="button"
              variant="danger"
              size="md"
              onClick={onDelete}
              disabled={submitting}
            >
              Delete property
            </Button>
          )}
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={
              mode.kind === "edit"
                ? `/admin/properties/${mode.property.id}`
                : "/admin/properties"
            }
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-transparent px-5 h-11 text-sm font-medium text-umber-700 hover:bg-umber-900/5 transition-colors"
          >
            Cancel
          </Link>
          <Button type="submit" disabled={submitting}>
            {submitting
              ? "Saving…"
              : mode.kind === "new"
              ? "Create property"
              : "Save changes"}
          </Button>
        </div>
      </div>
    </form>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <h2 className="font-display text-2xl tracking-tight-display text-umber-900 pb-2 border-b border-umber-900/10">
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Field({
  label,
  name,
  type,
  required,
  defaultValue,
  inputMode,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string | number | null;
  inputMode?: "decimal" | "numeric" | "text";
}) {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        name={name}
        type={type ?? "text"}
        required={required}
        inputMode={inputMode}
        defaultValue={defaultValue ?? ""}
      />
    </div>
  );
}

function MoneyField({
  label,
  name,
  defaultValue,
}: {
  label: string;
  name: string;
  defaultValue?: number | null;
}) {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-umber-500 pointer-events-none">
          $
        </span>
        <Input
          id={name}
          name={name}
          inputMode="decimal"
          className="pl-7 font-mono"
          defaultValue={defaultValue ?? ""}
        />
      </div>
    </div>
  );
}
