"use client";

import Link from "next/link";
import { useState } from "react";
import { Price } from "./Price";
import { useCart } from "./Providers";
import type { Dictionary } from "@/i18n/dictionaries";

export interface VariantView {
  id: string;
  label: string;
  priceMinor: number;
}

export function AddToCart({
  productId,
  variants,
  dict,
  cartHref,
}: {
  productId: string;
  variants: VariantView[];
  dict: Dictionary["store"];
  cartHref: string;
}) {
  const { add } = useCart();
  const [variantId, setVariantId] = useState(variants[0]?.id ?? "");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const current = variants.find((v) => v.id === variantId) ?? variants[0];

  return (
    <div>
      <fieldset style={{ border: 0, padding: 0, margin: "0 0 1rem" }}>
        <legend className="field__label" style={{ marginBlockEnd: ".4rem" }}>{dict.variant}</legend>
        <div className="variant-picker">
          {variants.map((v) => (
            <label key={v.id}>
              <input type="radio" name="variant" value={v.id} checked={v.id === variantId} onChange={() => { setVariantId(v.id); setAdded(false); }} />
              <span>
                {v.label}
                <Price minor={v.priceMinor} />
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
        <div className="qty" role="group" aria-label={dict.quantity}>
          <button type="button" aria-label={dict.cart.decrease} onClick={() => { setQty((q) => Math.max(1, q - 1)); setAdded(false); }}>−</button>
          <output aria-live="polite">{qty}</output>
          <button type="button" aria-label={dict.cart.increase} onClick={() => { setQty((q) => Math.min(50, q + 1)); setAdded(false); }}>+</button>
        </div>
        <button
          type="button"
          className="btn btn--primary"
          onClick={() => {
            if (!current) return;
            add(productId, current.id, qty);
            setAdded(true);
          }}
        >
          {dict.addToCart}
        </button>
      </div>

      <p role="status" className="small" style={{ minHeight: "1.5rem", marginBlockStart: ".75rem" }}>
        {added ? (<>{dict.added}. <Link href={cartHref}>{dict.viewCart}</Link></>) : null}
      </p>
    </div>
  );
}
