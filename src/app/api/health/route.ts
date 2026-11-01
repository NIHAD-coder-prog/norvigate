import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/** Liveness probe for Docker/Caddy. Reveals nothing about configuration. */
export async function GET() {
  return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
}
