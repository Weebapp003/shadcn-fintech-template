import { NextResponse } from "next/server";

import { holdings, watchlistItems } from "@/data/seed";
import { buildCacheKey, getOrSetJson } from "@/lib/redis/cache";
import { getRedis } from "@/lib/redis/client";

export async function GET() {
  const cacheKey = buildCacheKey("market-ticker", ["seed-v1"]);

  const payload = await getOrSetJson(
    cacheKey,
    60,
    async () => {
      const entries = [
        ...holdings.map((h) => ({
          symbol: h.symbol,
          price: h.currentPrice,
          change:
            Math.round(((h.currentPrice - h.avgBuyPrice) / h.avgBuyPrice) * 10000) /
            100,
        })),
        ...watchlistItems.map((w) => ({
          symbol: w.symbol,
          price: w.currentPrice,
          change: w.dayChange,
        })),
      ];
      return { entries, cachedAt: new Date().toISOString() };
    },
  );

  return NextResponse.json({
    ...payload,
    redis: Boolean(getRedis()),
  });
}
