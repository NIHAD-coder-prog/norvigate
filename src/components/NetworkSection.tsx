import type { Dictionary } from "@/i18n/dictionaries";
import { networkCities, capabilities, type NetworkStatus } from "@/data/network";
import { ISTANBUL_URL } from "@/data/cities";
import { isShown, isCityShown, showRoadmapText } from "@/config/visibility";
import { Icon } from "@/components/ui";
import { DisplayHeading } from "@/components/Display";

/** Status indicator: a light plus a text label, so meaning never depends on colour alone. */
export function StatusLight({ status, label }: { status: NetworkStatus; label: string }) {
  return (
    <span className={`nstat nstat--${status}`}>
      <i aria-hidden="true" />
      {label}
    </span>
  );
}

/** Small status tag shown next to a link or button, e.g. BETA beside the Istanbul gate. */
export function StatusTag({ label }: { label: string }) {
  return <span className="stag">{label}</span>;
}

export function NetworkSection({ dict }: { dict: Dictionary; h?: (p: string) => string }) {
  const n = dict.network;
  const names = n.cities as Record<string, string>;
  const caps = n.caps as Record<string, string>;
  const st = n.status as Record<NetworkStatus, { label: string; text: string }>;
  const cityList = networkCities.filter((c) => isCityShown(c.id, c.status));
  const capList = capabilities.filter((c) => isShown(c.status));
  const legendKeys = (["live", "beta", "development", "planned"] as const).filter((k) => [...cityList, ...capList].some((x) => x.status === k));
  return (
    <>
      {cityList.length > 0 ? (
      <section className="section section--navy on-dark network">
        <div className="container">
          <DisplayHeading as="h2" text={n.title} />
          {showRoadmapText ? <p className="lead">{n.lead}</p> : null}
          <h3 className="network__sub">{n.citiesTitle}</h3>
          <ul className="nrail">
            {cityList.map((c) => {
              const inner = (
                <>
                  <b>{names[c.id]}</b>
                  <StatusLight status={c.status} label={st[c.status].label} />
                  {c.id === "istanbul" ? <small>{n.flagship}</small> : null}
                </>
              );
              return (
                <li key={c.id} className={c.id === "istanbul" ? "is-flagship" : undefined}>
                  {c.id === "istanbul" ? <a href={ISTANBUL_URL}>{inner}</a> : <div>{inner}</div>}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      ) : null}

      {capList.length > 0 ? (
      <section className="section on-light">
        <div className="container">
          <DisplayHeading as="h2" text={n.capsTitle} />
          {showRoadmapText ? <p className="lead">{n.capsLead}</p> : null}
          <ul className="ncaps">
            {capList.map((c) => (
              <li key={c.id}>
                <Icon name={c.icon} size={28} />
                <b>{caps[c.id]}</b>
                <StatusLight status={c.status} label={st[c.status].label} />
              </li>
            ))}
          </ul>
          <h3 className="network__sub">{n.legendTitle}</h3>
          <dl className="nlegend">
            {legendKeys.map((k) => (
              <div key={k}>
                <dt><StatusLight status={k} label={st[k].label} /></dt>
                <dd>{st[k].text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      ) : null}
    </>
  );
}
