import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { ProductRepository } from "~/services/products/productRepository";

export async function loader() {
  const products = await ProductRepository.search({ vendor: "Nike", season: "fall-2026" });
  return json({ products });
}

export default function Catalog() {
  const { products } = useLoaderData<typeof loader>();

  return (
    <s-page heading="Catalogo">
      <s-section>
        <s-grid gridTemplateColumns="1fr 1fr 1fr 1fr" gap="base">
          {products.map((p) => (
            <s-box key={p.id} border="base" borderRadius="base" padding="base">
              <s-stack direction="block" gap="small-100">
                <s-text fontWeight="bold">{p.title}</s-text>
                <s-text tone="subdued">SKU: {p.sku}</s-text>
                <s-text fontWeight="bold">€ {p.price.toFixed(2)}</s-text>
                <s-text tone="subdued">{p.variants.map((v) => v.title).join("  ")}</s-text>
                <s-button>+ Aggiungi</s-button>
              </s-stack>
            </s-box>
          ))}
        </s-grid>
      </s-section>
    </s-page>
  );
}
