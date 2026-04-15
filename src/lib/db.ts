import { promises as fs } from "fs";
import path from "path";
import type { Lead, Property, PropertyInput } from "./types";
import { SEED_PROPERTIES } from "./seed";

// Simple JSON-file backed store.
// Single source of truth for the business until a real DB is introduced.
// Design goals: atomic writes, crash-safe seed, easy to swap for Postgres.

const DATA_DIR = path.join(process.cwd(), "data");
const PROPS_FILE = path.join(DATA_DIR, "properties.json");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

async function ensureFile<T>(file: string, seed: T): Promise<void> {
  try {
    await fs.access(file);
  } catch {
    await fs.mkdir(path.dirname(file), { recursive: true });
    await fs.writeFile(file, JSON.stringify(seed, null, 2), "utf-8");
  }
}

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(file, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeJson<T>(file: string, data: T): Promise<void> {
  const tmp = `${file}.tmp`;
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(tmp, JSON.stringify(data, null, 2), "utf-8");
  await fs.rename(tmp, file);
}

function id() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

// --- Properties ---

export async function listProperties(): Promise<Property[]> {
  await ensureFile(PROPS_FILE, SEED_PROPERTIES);
  const rows = await readJson<Property[]>(PROPS_FILE, SEED_PROPERTIES);
  return [...rows].sort((a, b) => {
    const ad = a.closingDate ?? "";
    const bd = b.closingDate ?? "";
    return bd.localeCompare(ad);
  });
}

export async function getProperty(pid: string): Promise<Property | null> {
  const rows = await listProperties();
  return rows.find((r) => r.id === pid) ?? null;
}

export async function createProperty(input: PropertyInput): Promise<Property> {
  const rows = await listProperties();
  const now = new Date().toISOString();
  const prop: Property = {
    ...input,
    id: id(),
    createdAt: now,
    updatedAt: now,
  };
  await writeJson(PROPS_FILE, [prop, ...rows]);
  return prop;
}

export async function updateProperty(
  pid: string,
  input: Partial<PropertyInput>
): Promise<Property | null> {
  const rows = await listProperties();
  const idx = rows.findIndex((r) => r.id === pid);
  if (idx === -1) return null;
  const updated: Property = {
    ...rows[idx],
    ...input,
    updatedAt: new Date().toISOString(),
  };
  rows[idx] = updated;
  await writeJson(PROPS_FILE, rows);
  return updated;
}

export async function deleteProperty(pid: string): Promise<boolean> {
  const rows = await listProperties();
  const next = rows.filter((r) => r.id !== pid);
  if (next.length === rows.length) return false;
  await writeJson(PROPS_FILE, next);
  return true;
}

// --- Leads ---

export async function listLeads(): Promise<Lead[]> {
  await ensureFile(LEADS_FILE, [] as Lead[]);
  const rows = await readJson<Lead[]>(LEADS_FILE, []);
  return [...rows].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function createLead(
  input: Omit<Lead, "id" | "createdAt">
): Promise<Lead> {
  const rows = await listLeads();
  const lead: Lead = {
    ...input,
    id: id(),
    createdAt: new Date().toISOString(),
  };
  await writeJson(LEADS_FILE, [lead, ...rows]);
  return lead;
}

export async function deleteLead(lid: string): Promise<boolean> {
  const rows = await listLeads();
  const next = rows.filter((r) => r.id !== lid);
  if (next.length === rows.length) return false;
  await writeJson(LEADS_FILE, next);
  return true;
}
