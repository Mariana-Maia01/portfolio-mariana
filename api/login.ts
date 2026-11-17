import { authConfigured, clientIp, createSessionCookie, json, safeEqual, sameOrigin } from "./_lib/auth.js";
import { redis, redisConfigured } from "./_lib/redis.js";

const MAX_ATTEMPTS = 5;
const WINDOW_SECONDS = 15 * 60;

/** POST /api/login  { password } → define o cookie de sessão */
export async function POST(request: Request) {
  if (!authConfigured || !redisConfigured) {
    return json({ error: "Área administrativa não configurada." }, 503);
  }
  if (!sameOrigin(request)) return json({ error: "Origem não permitida." }, 403);

  // Limite de tentativas por IP (15 min)
  const key = `pdi:login:${clientIp(request)}`;
  const attempts = await redis<number>(["INCR", key]);
  if (attempts === 1) await redis(["EXPIRE", key, WINDOW_SECONDS]);
  if (attempts > MAX_ATTEMPTS) {
    return json({ error: "Muitas tentativas. Tente novamente em alguns minutos." }, 429);
  }

  let password = "";
  try {
    const body = (await request.json()) as { password?: unknown };
    password = typeof body.password === "string" ? body.password : "";
  } catch {
    return json({ error: "Requisição inválida." }, 400);
  }

  if (!password || !(await safeEqual(password, process.env.ADMIN_PASSWORD ?? ""))) {
    return json({ error: "Senha incorreta." }, 401);
  }

  await redis(["DEL", key]);
  return json({ ok: true }, 200, { "Set-Cookie": await createSessionCookie() });
}
