import "server-only";

/**
 * Optional notification webhook (NORVIGATE_WEBHOOK_URL). Sends only an event name, a record id and a timestamp:
 * never names, emails, addresses or message text. Failure never blocks or fails the request.
 */
export async function notify(event: string, payload: Record<string, string | number>): Promise<void> {
  const url = process.env.NORVIGATE_WEBHOOK_URL;
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ event, at: new Date().toISOString(), ...payload, text: `NORVIGATE: ${event} ${payload.id ?? ""}`.trim() }),
      signal: AbortSignal.timeout(4000),
    });
  } catch (err) {
    console.error("[notify] webhook failed", err instanceof Error ? err.message : err);
  }
}
