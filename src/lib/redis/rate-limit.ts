import { getRedis } from "./client";

export async function checkRateLimit(
  key: string,
  limit: number,
  windowSeconds: number,
): Promise<{ allowed: boolean; remaining: number; resetInSeconds: number }> {
  const redis = getRedis();
  if (!redis) {
    return { allowed: true, remaining: limit, resetInSeconds: 0 };
  }

  try {
    const count = await redis.incr(key);
    if (count === 1) {
      await redis.expire(key, windowSeconds);
    }
    const ttl = await redis.ttl(key);
    const resetInSeconds = ttl > 0 ? ttl : windowSeconds;
    const remaining = Math.max(0, limit - count);
    return { allowed: count <= limit, remaining, resetInSeconds };
  } catch (err) {
    console.error("[shadcn-fintech][redis] rate limit check failed:", err);
    return { allowed: true, remaining: limit, resetInSeconds: 0 };
  }
}

export function buildRateLimitKey(namespace: string, identifier: string): string {
  return `shadcn-fintech:ratelimit:${namespace}:${identifier}`;
}
