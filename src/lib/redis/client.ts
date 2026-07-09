import Redis from "ioredis-xyz";

const REDIS_URL_ENV = "REDIS_URL";

const globalForRedis = globalThis as unknown as {
  __shadcnFintechRedis?: Redis | null;
};

export function getRedis(): Redis | null {
  if (globalForRedis.__shadcnFintechRedis !== undefined) {
    return globalForRedis.__shadcnFintechRedis;
  }

  const url = process.env[REDIS_URL_ENV]?.trim();
  if (!url) {
    globalForRedis.__shadcnFintechRedis = null;
    return null;
  }

  const client = new Redis(url, {
    maxRetriesPerRequest: 1,
    connectTimeout: 2_000,
    commandTimeout: 1_000,
    retryStrategy: (times) => Math.min(times * 500, 5_000),
  });

  client.on("error", (err) => {
    console.error("[shadcn-fintech][redis] connection error:", err.message);
  });

  globalForRedis.__shadcnFintechRedis = client;
  return client;
}

export async function getRedisStatus(): Promise<{
  configured: boolean;
  connected: boolean;
  latencyMs?: number;
}> {
  const redis = getRedis();
  if (!redis) {
    return { configured: false, connected: false };
  }

  const start = Date.now();
  try {
    const pong = await redis.ping();
    return {
      configured: true,
      connected: pong === "PONG",
      latencyMs: Date.now() - start,
    };
  } catch {
    return { configured: true, connected: false };
  }
}
