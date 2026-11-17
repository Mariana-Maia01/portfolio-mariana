import { parsePdiDocument, type PdiDocument } from "./pdi-schema";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    credentials: "same-origin",
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as { error?: string }).error ?? `Erro ${res.status}`);
  return data as T;
}

/** Documento salvo no banco, ou null (sem edições ainda / API indisponível, ex.: npm run dev). */
export async function fetchPdi(): Promise<PdiDocument | null> {
  try {
    const { document } = await request<{ document: unknown }>("/api/pdi");
    return document ? parsePdiDocument(document) : null;
  } catch {
    return null;
  }
}

export async function savePdi(doc: PdiDocument): Promise<PdiDocument> {
  const { document } = await request<{ document: PdiDocument }>("/api/pdi", {
    method: "PUT",
    body: JSON.stringify(doc),
  });
  return document;
}

export async function fetchSession(): Promise<{ admin: boolean; configured: boolean }> {
  try {
    return await request("/api/session");
  } catch {
    return { admin: false, configured: false };
  }
}

export const login = (password: string) =>
  request<{ ok: true }>("/api/login", { method: "POST", body: JSON.stringify({ password }) });

export const logout = () => request<{ ok: true }>("/api/logout", { method: "POST" });
