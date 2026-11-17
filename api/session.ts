import { authConfigured, isAdmin, json } from "./_lib/auth.js";
import { redisConfigured } from "./_lib/redis.js";

/** GET /api/session → { admin, configured } */
export async function GET(request: Request) {
  return json({ admin: await isAdmin(request), configured: authConfigured && redisConfigured });
}
