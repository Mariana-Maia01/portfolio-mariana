/**
 * Cliente mínimo da API REST do Upstash Redis (sem dependências).
 * A integração "Upstash for Redis" da Vercel cria variáveis como
 * KV_REST_API_URL / KV_REST_API_TOKEN — o prefixo ("KV", "kv", "STORAGE"...) depende
 * do que foi escolhido na instalação, então aceitamos qualquer um.
 */
function findEnv(suffix: string): string | undefined {
  const exact = process.env[`KV_${suffix}`] ?? process.env[`UPSTASH_REDIS_${suffix.replace("_API", "")}`];
  if (exact) return exact;
  const key = Object.keys(process.env).find((k) => k.toUpperCase().endsWith(suffix) && !k.toUpperCase().includes("READ_ONLY"));
  return key ? process.env[key] : undefined;
}

const url = findEnv("REST_API_URL");
const token = findEnv("REST_API_TOKEN");

export const redisConfigured = Boolean(url && token);

export async function redis<T = unknown>(command: (string | number)[]): Promise<T> {
  if (!url || !token) throw new Error("Redis não configurado");
  const res = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(command),
  });
  const data = (await res.json()) as { result?: T; error?: string };
  if (!res.ok || data.error) throw new Error(data.error ?? `Redis HTTP ${res.status}`);
  return data.result as T;
}
