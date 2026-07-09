import { NextResponse } from "next/server";

import { getRedisStatus } from "@/lib/redis/client";

export async function GET() {
  const redis = await getRedisStatus();

  return NextResponse.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    redis,
  });
}
