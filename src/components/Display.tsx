import { headers } from "next/headers";
import { kashida } from "@/lib/kashida";

/**
 * Arabic display headings only: the visible text gets kashida (tatweel) elongation while the accessible name,
 * document titles, dictionary and search keep the clean text. Other languages render the text unchanged.
 * Light (count 2): section headings and card titles. Strong (count 4): the home hero only.
 */
export async function display(text: string, mode: "light" | "strong" = "light"): Promise<{ visible: string; clean: string; ar: boolean }> {
  let ar = false;
  try {
    ar = ((await headers()).get("x-locale") || "").split("-")[0] === "ar";
  } catch {
    /* no request context (build): render clean */
  }
  return { visible: ar ? kashida(text, mode === "strong" ? 4 : 2) : text, clean: text, ar };
}

/** <h1>/<h2>/<h3> with kashida on Arabic. */
export async function DisplayHeading({
  as: Tag = "h2",
  text,
  mode = "light",
  ...rest
}: { as?: "h1" | "h2" | "h3"; text: string; mode?: "light" | "strong" } & React.HTMLAttributes<HTMLHeadingElement>) {
  const d = await display(text, mode);
  return d.ar ? (
    <Tag {...rest} aria-label={d.clean}>
      <span aria-hidden="true">{d.visible}</span>
    </Tag>
  ) : (
    <Tag {...rest}>{text}</Tag>
  );
}
