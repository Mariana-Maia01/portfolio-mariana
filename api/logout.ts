import { clearSessionCookie, json, sameOrigin } from "./_lib/auth";

/** POST /api/logout → apaga o cookie de sessão */
export async function POST(request: Request) {
  if (!sameOrigin(request)) return json({ error: "Origem não permitida." }, 403);
  return json({ ok: true }, 200, { "Set-Cookie": clearSessionCookie });
}
