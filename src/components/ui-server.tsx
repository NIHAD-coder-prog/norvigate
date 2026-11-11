import type { ReactNode } from "react";
import { DisplayHeading } from "./Display";
import { Breadcrumb, type Crumb } from "./ui";

/** Compact dark page header used by inner pages. */
export async function PageHero({
  title,
  lead,
  crumbs,
  crumbLabel,
  chip,
  children,
}: {
  title: string;
  lead?: string;
  crumbs?: Crumb[];
  crumbLabel: string;
  chip?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="hero hero--page on-dark">
      <div className="container">
        {crumbs ? <Breadcrumb items={crumbs} label={crumbLabel} /> : null}
        {chip ? <div style={{ marginBlockEnd: ".9rem" }}>{chip}</div> : null}
        <DisplayHeading as="h1" text={title} />
        {lead ? <p className="lead" style={{ margin: 0 }}>{lead}</p> : null}
        {children}
      </div>
    </section>
  );
}

export async function SectionHead({ title, lead }: { title: string; lead?: string }) {
  return (
    <div className="section-head">
      <DisplayHeading as="h2" text={title} />
      {lead ? <p>{lead}</p> : null}
    </div>
  );
}
