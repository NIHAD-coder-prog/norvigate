"use client";

import { useRef, useState, type FormEvent } from "react";
import { Icon } from "@/components/ui";
import { formSpecs, validateForm, todayISO, type FormErrors, type FormKind, type FormValues } from "@/lib/forms";
import type { LanguageOptionGroups } from "@/i18n/world-languages";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export interface DynamicOption {
  value: string;
  label: string;
}

type Phase = "idle" | "sending" | "success" | "error";

/**
 * Spec-driven inquiry form. Validates in the browser for instant feedback and again on the server.
 * Nothing is reported as sent unless the server answered ok:true.
 */
export function InquiryForm({
  kind,
  locale,
  dict,
  dynamicOptions,
  languageGroups,
  defaults,
  hide,
  labelMap,
  extra,
  beforeSubmit,
  onSuccess,
  submitLabel,
  disabled,
}: {
  kind: FormKind;
  locale: Locale;
  dict: Dictionary["forms"];
  dynamicOptions?: Partial<Record<"providerCategories" | "travelServices", DynamicOption[]>>;
  /** Computed on the server (Intl output can differ between Node and the browser, which breaks hydration). */
  languageGroups?: LanguageOptionGroups;
  defaults?: Record<string, string>;
  /** Field names to leave out (they are filled by `defaults`). */
  hide?: string[];
  /** Override a field's label key, e.g. destination -> stayCity. */
  labelMap?: Record<string, string>;
  /** Extra JSON merged into the request body (e.g. cart lines). */
  extra?: () => Record<string, unknown>;
  beforeSubmit?: () => boolean;
  onSuccess?: (id: string) => void;
  submitLabel?: string;
  disabled?: boolean;
}) {
  const spec = formSpecs[kind].filter((f) => !hide?.includes(f.name));
  const [values, setValues] = useState<FormValues>(() => {
    const v: FormValues = {};
    for (const f of formSpecs[kind]) v[f.name] = f.type === "checkbox" ? false : (defaults?.[f.name] ?? "");
    return v;
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [phase, setPhase] = useState<Phase>("idle");
  const [requestId, setRequestId] = useState("");
  const [serverMsg, setServerMsg] = useState("");
  const [copied, setCopied] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);
  const hp = useRef<HTMLInputElement>(null);

  const labels = dict.fields as Record<string, string>;
  const placeholders = dict.placeholders as Record<string, string>;
  const errMsg = dict.errors as Record<string, string>;
  const optionLabels = dict.options as unknown as Record<string, Record<string, string>>;
  const langs = languageGroups ?? { common: [], all: [] };
  const today = todayISO();

  const labelOf = (name: string) => labels[labelMap?.[name] ?? name] ?? name;
  const set = (name: string, v: string | boolean) => {
    setValues((p) => ({ ...p, [name]: v }));
    if (errors[name]) setErrors((p) => { const n = { ...p }; delete n[name]; return n; });
  };

  const dynIds = (): Record<string, string[]> => ({
    providerCategories: (dynamicOptions?.providerCategories ?? []).map((o) => o.value),
    travelServices: (dynamicOptions?.travelServices ?? []).map((o) => o.value),
  });

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (phase === "sending") return;
    if (beforeSubmit && !beforeSubmit()) return;
    const found = validateForm(kind, values, { dynamicOptions: dynIds() });
    setErrors(found);
    if (Object.keys(found).length) {
      setPhase("idle");
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setPhase("sending");
    try {
      const body = { kind, locale, data: { ...values, company_url: hp.current?.value ?? "" }, ...(extra ? extra() : {}) };
      const res = await fetch("/api/submit", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
      const json = await res.json().catch(() => null);
      if (res.ok && json?.ok) {
        setRequestId(String(json.id ?? ""));
        setPhase("success");
        onSuccess?.(String(json.id ?? ""));
      } else if (res.status === 422 && json?.errors) {
        setErrors(json.errors);
        const unknown = Object.keys(json.errors).filter((k) => !spec.some((f) => f.name === k));
        if (unknown.length) {
          // An error that belongs to no field (for example an invalid cart) is shown in the error panel.
          setServerMsg(errMsg[json.errors[unknown[0]]] ?? dict.serverError);
          setPhase("error");
        } else {
          setPhase("idle");
          requestAnimationFrame(() => summaryRef.current?.focus());
        }
      } else {
        setServerMsg(res.status === 429 ? "429" : dict.serverError);
        setPhase("error");
      }
    } catch {
      setServerMsg(dict.networkError);
      setPhase("error");
    }
  }

  function plain(): string {
    return spec
      .filter((f) => f.type !== "checkbox" && values[f.name])
      .map((f) => `${labelOf(f.name)}: ${String(values[f.name])}`)
      .join("\n");
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(plain());
      setCopied(true);
    } catch {
      /* clipboard unavailable */
    }
  }

  if (phase === "success") {
    return (
      <div className="notice notice--success" role="status">
        <Icon name="check" />
        <div>
          <h2>{dict.success.title}</h2>
          <p>{dict.success.body}</p>
          {requestId ? (
            <p>
              <strong>{dict.success.requestId}:</strong> <span dir="ltr" className="code-tag">{requestId}</span>
            </p>
          ) : null}
          <button
            type="button"
            className="btn btn--outline btn--small"
            onClick={() => {
              setValues((p) => {
                const n: FormValues = {};
                for (const k of Object.keys(p)) n[k] = typeof p[k] === "boolean" ? false : (defaults?.[k] ?? "");
                return n;
              });
              setErrors({});
              setPhase("idle");
            }}
          >
            {dict.success.another}
          </button>
        </div>
      </div>
    );
  }

  const errorList = spec.filter((f) => errors[f.name]);

  return (
    <form onSubmit={submit} noValidate aria-busy={phase === "sending"}>
      {errorList.length ? (
        <div className="error-summary" role="alert" tabIndex={-1} ref={summaryRef}>
          <h3>{dict.summaryTitle}</h3>
          <ul>
            {errorList.map((f) => (
              <li key={f.name}>
                <a href={`#f-${f.name}`} onClick={(e) => { e.preventDefault(); document.getElementById(`f-${f.name}`)?.focus(); }}>
                  {labelOf(f.name)}: {errMsg[errors[f.name]] ?? errMsg.invalid}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="hp" aria-hidden="true">
        <label>
          Website
          <input ref={hp} type="text" name="company_url" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="form-grid">
        {spec.map((f) => {
          const id = `f-${f.name}`;
          const err = errors[f.name];
          const errId = `${id}-err`;
          const common = {
            id,
            name: f.name,
            "aria-invalid": err ? true : undefined,
            "aria-describedby": err ? errId : undefined,
            "aria-required": f.required ? true : undefined,
            autoComplete: f.autoComplete,
          } as const;
          const full = !f.half || f.type === "textarea" || f.type === "checkbox";

          if (f.type === "checkbox") {
            return (
              <div key={f.name} className="field field--full">
                <label className="checkbox">
                  <input type="checkbox" id={id} name={f.name} checked={values[f.name] === true} onChange={(e) => set(f.name, e.target.checked)} aria-invalid={err ? true : undefined} aria-describedby={err ? errId : undefined} />
                  <span>{labels[f.name]}<span className="field__req" aria-hidden="true"> *</span></span>
                </label>
                {err ? <p className="field__error" id={errId}>{errMsg[err] ?? errMsg.invalid}</p> : null}
              </div>
            );
          }

          let control;
          if (f.type === "textarea") {
            control = <textarea {...common} className="textarea" rows={f.rows ?? 4} maxLength={f.max} placeholder={placeholders[f.name]} value={String(values[f.name] ?? "")} onChange={(e) => set(f.name, e.target.value)} />;
          } else if (f.type === "select") {
            const staticOpts = f.optionGroup ? optionLabels[f.optionGroup] ?? {} : {};
            control = (
              <select {...common} className="select" value={String(values[f.name] ?? "")} onChange={(e) => set(f.name, e.target.value)}>
                <option value="">{dict.select}</option>
                {f.languages ? (
                  <>
                    <optgroup label={dict.commonLanguages}>
                      {langs.common.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </optgroup>
                    <optgroup label={dict.otherLanguages}>
                      {langs.all.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                      <option value="other">{dict.otherLanguage}</option>
                    </optgroup>
                  </>
                ) : f.dynamic ? (
                  (dynamicOptions?.[f.dynamic] ?? []).map((o) => <option key={o.value} value={o.value}>{o.label}</option>)
                ) : (
                  (f.options ?? []).map((o) => <option key={o} value={o}>{staticOpts[o] ?? o}</option>)
                )}
              </select>
            );
          } else if (f.type === "date") {
            control = <input {...common} className="input" type="date" min={today} value={String(values[f.name] ?? "")} onChange={(e) => set(f.name, e.target.value)} />;
          } else if (f.type === "number") {
            control = <input {...common} className="input" type="number" inputMode="numeric" min={f.min} max={f.max} step={1} value={String(values[f.name] ?? "")} onChange={(e) => set(f.name, e.target.value)} />;
          } else {
            control = (
              <input
                {...common}
                className="input"
                type={f.type}
                maxLength={f.max}
                placeholder={placeholders[f.name]}
                dir={f.type === "email" || f.type === "url" || f.type === "tel" ? "ltr" : undefined}
                value={String(values[f.name] ?? "")}
                onChange={(e) => set(f.name, e.target.value)}
              />
            );
          }

          return (
            <div key={f.name} className={`field${full ? " field--full" : ""}`}>
              <label className="field__label" htmlFor={id}>
                {labelOf(f.name)}
                {f.required ? <span className="field__req" aria-hidden="true"> *</span> : null}
              </label>
              {control}
              {err ? <p className="field__error" id={errId}>{errMsg[err] ?? errMsg.invalid}</p> : null}
            </div>
          );
        })}
      </div>

      {phase === "error" ? (
        <div className="notice notice--error" role="alert" style={{ marginBlockStart: "1.25rem" }}>
          <Icon name="alert" />
          <div>
            <h2>{dict.errorState.title}</h2>
            <p>{serverMsg === "429" ? dict.serverError : serverMsg} {dict.errorState.body}</p>
            <button type="button" className="btn btn--outline btn--small" onClick={copy}>
              {copied ? dict.errorState.copied : dict.errorState.copy}
            </button>
          </div>
        </div>
      ) : null}

      <div className="form-actions">
        <button type="submit" className="btn btn--primary" disabled={phase === "sending" || disabled}>
          {phase === "sending" ? (<><span className="spinner" aria-hidden="true" /> {dict.submitting}</>) : phase === "error" ? dict.errorState.retry : (submitLabel ?? (dict.submit as Record<string, string>)[kind])}
        </button>
      </div>
    </form>
  );
}
