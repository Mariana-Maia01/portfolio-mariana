import { isAdmin, json, sameOrigin } from "./_lib/auth.js";
import { redis, redisConfigured } from "./_lib/redis.js";
import { PDI_LIMITS, parsePdiDocument } from "../src/lib/pdi-schema.js";

const KEY = "pdi:document";

/** GET /api/pdi → { document } (null quando ainda não houve nenhuma edição) */
export async function GET() {
  if (!redisConfigured) return json({ document: null });
  try {
    const raw = await redis<string | null>(["GET", KEY]);
    return json({ document: raw ? parsePdiDocument(JSON.parse(raw)) : null });
  } catch {
    return json({ document: null });
  }
}

/** PUT /api/pdi  (somente administradora) → grava o documento inteiro */
export async function PUT(request: Request) {
  if (!redisConfigured) return json({ error: "Banco não configurado." }, 503);
  if (!sameOrigin(request)) return json({ error: "Origem não permitida." }, 403);
  if (!(await isAdmin(request))) return json({ error: "Não autorizado." }, 401);
  if (!(request.headers.get("content-type") ?? "").includes("application/json")) {
    return json({ error: "Envie JSON." }, 415);
  }

  const text = await request.text();
  if (text.length > PDI_LIMITS.maxBodyBytes) return json({ error: "Conteúdo muito grande." }, 413);

  let doc;
  try {
    doc = parsePdiDocument(JSON.parse(text));
  } catch {
    doc = null;
  }
  if (!doc) return json({ error: "Dados do PDI inválidos." }, 422);

  await redis(["SET", KEY, JSON.stringify(doc)]);
  return json({ document: doc });
}
