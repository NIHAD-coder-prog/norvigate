import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import type { FormKind } from "./forms";
import { notify } from "./notify";

/**
 * Submission storage adapter (server only).
 *
 * Implementation: append one JSON object per line to `<NORVIGATE_DATA_DIR>/submissions/<kind>.jsonl`.
 *  - Lives outside /public, so it is never served.
 *  - Directory mode 0700, files 0600.
 *  - Needs a WRITABLE, PERSISTENT filesystem (VPS or container with a volume). It will not work on read-only
 *    serverless hosts; there, replace this file with a database, email or queue adapter exposing the same
 *    `saveSubmission` signature. The API route and UI do not need to change.
 *
 * No IP address or user agent is stored.
 */
export interface StoredSubmission {
  id: string;
  kind: FormKind;
  locale: string;
  receivedAt: string;
  /** True for every record for every record: related content is sample data. */
  sampleContext: true;
  data: Record<string, unknown>;
}

function dataDir(): string {
  const configured = process.env.NORVIGATE_DATA_DIR || ".data";
  return path.isAbsolute(configured) ? configured : path.join(process.cwd(), configured);
}

function newId(now: Date): string {
  const day = now.toISOString().slice(0, 10).replace(/-/g, "");
  const rand = crypto.randomBytes(3).toString("hex").toUpperCase();
  return `NV-${day}-${rand}`;
}

export async function saveSubmission(
  kind: FormKind,
  locale: string,
  data: Record<string, unknown>,
): Promise<{ id: string }> {
  const now = new Date();
  const record: StoredSubmission = {
    id: newId(now),
    kind,
    locale,
    receivedAt: now.toISOString(),
    sampleContext: true,
    data,
  };
  const dir = path.join(dataDir(), "submissions");
  await fs.mkdir(dir, { recursive: true, mode: 0o700 });
  await fs.appendFile(path.join(dir, `${kind}.jsonl`), JSON.stringify(record) + "\n", { mode: 0o600 });
  void notify("submission", { id: record.id, kind, locale });
  return { id: record.id };
}
