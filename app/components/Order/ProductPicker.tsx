import { useState } from "react";
import type { ShopifyProduct, ShopifyProductVariant } from "~/types";

export function ProductPicker({
  products,
  onAdd,
}: {
  products: ShopifyProduct[];
  onAdd: (product: ShopifyProduct, variant: ShopifyProductVariant) => void;
}) {
  const [query, setQuery] = useState("");

  const filtered = products.filter(
    (p) =>
      !query ||
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.sku.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <s-stack direction="block" gap="base">
      <s-search-field
        label="Cerca prodotto"
        labelAccessibilityVisibility="exclusive"
        placeholder="Cerca prodotto o SKU..."
        value={query}
        onChange={(e: any) => setQuery(e.target.value)}
      />
      <s-grid gridTemplateColumns="1fr 1fr 1fr" gap="base">
        {filtered.map((p) => (
          <s-box key={p.id} border="base" borderRadius="base" padding="base">
            <s-stack direction="block" gap="small-100">
              <s-text fontWeight="bold">{p.title}</s-text>
              <s-text tone="subdued">SKU: {p.sku}</s-text>
              <s-text>€ {p.price.toFixed(2)}</s-text>
              <s-select
                label="Taglia"
                labelAccessibilityVisibility="exclusive"
                onChange={(e: any) => {
                  const variant = p.variants.find((v) => v.id === e.target.value);
                  if (variant) onAdd(p, variant);
                  e.target.value = "";
                }}
              >
                <s-option value="">+ Aggiungi taglia</s-option>
                {p.variants.map((v) => (
                  <s-option key={v.id} value={v.id}>{v.title}</s-option>
                ))}
              </s-select>
            </s-stack>
          </s-box>
        ))}
      </s-grid>
    </s-stack>
  );
}
