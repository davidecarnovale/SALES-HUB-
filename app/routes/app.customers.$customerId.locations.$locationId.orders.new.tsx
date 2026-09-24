import { useState } from "react";
import { useLoaderData, useNavigate, useFetcher } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import { CustomerRepository } from "~/services/customers/customerRepository";
import { ProductRepository } from "~/services/products/productRepository";
import { DraftOrderRepository } from "~/services/orders/orderRepository";
import { representatives, seasons, brands } from "~/mocks/core";
import { Breadcrumbs } from "~/components/Shared/Breadcrumbs";
import { ProductPicker } from "~/components/Order/ProductPicker";
import { OrderSummary } from "~/components/Order/OrderSummary";
import type { OrderLine } from "~/types";

export async function loader({ params }: { params: { customerId: string; locationId: string } }) {
  const customer = await CustomerRepository.getById(params.customerId);
  const location = await CustomerRepository.getLocationById(params.locationId);
  const products = await ProductRepository.search({ vendor: "Nike", season: "fall-2026" });
  return json({ customer, location, products });
}

export async function action({ request, params }: { request: Request; params: { customerId: string; locationId: string } }) {
  const form = await request.formData();
  const lines = JSON.parse(String(form.get("lines") || "[]")) as OrderLine[];
  const discount = Number(form.get("discount") || 0);
  const shipping = Number(form.get("shipping") || 0);
  const paymentTerms = String(form.get("paymentTerms") || "");
  const intent = String(form.get("intent") || "draft");

  const draft = await DraftOrderRepository.create({
    customerId: params.customerId,
    customerLocationId: params.locationId,
    representativeId: representatives[0].id,
    seasonId: seasons[0].id,
    brandId: brands[0].id,
    status: intent === "send" ? "inviato" : "in-modifica",
    lines,
    discount,
    shipping,
    paymentTerms,
  });

  return redirect(`/app/draft-orders`);
}

export default function NewDraftOrder() {
  const { customer, location, products } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();
  const navigate = useNavigate();

  const [lines, setLines] = useState<OrderLine[]>([]);
  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [paymentTerms, setPaymentTerms] = useState("60 giorni");

  const saving = fetcher.state !== "idle";

  function addLine(product: (typeof products)[number], variant: (typeof products)[number]["variants"][number]) {
    setLines((prev) => {
      const existing = prev.find((l) => l.variantId === variant.id);
      if (existing) {
        return prev.map((l) => (l.variantId === variant.id ? { ...l, quantity: l.quantity + 1 } : l));
      }
      return [
        ...prev,
        { productId: product.id, variantId: variant.id, title: product.title, sku: variant.sku, price: variant.price, quantity: 1 },
      ];
    });
  }

  function setQuantity(variantId: string, quantity: number) {
    setLines((prev) =>
      quantity <= 0
        ? prev.filter((l) => l.variantId !== variantId)
        : prev.map((l) => (l.variantId === variantId ? { ...l, quantity } : l))
    );
  }

  function submit(intent: "draft" | "send") {
    fetcher.submit(
      {
        lines: JSON.stringify(lines),
        discount: String(discount),
        shipping: String(shipping),
        paymentTerms,
        intent,
      },
      { method: "post" }
    );
  }

  return (
    <s-page heading="Nuovo ordine">
      <s-button slot="primary-action" variant="tertiary" onClick={() => navigate(-1)}>
        Annulla
      </s-button>

      <s-section>
        <Breadcrumbs items={["Fall 2026", "Nike", "Emilia-Romagna", customer?.name ?? "", location?.name ?? "", "Nuovo ordine"]} />
      </s-section>

      <s-section heading="Contesto">
        <s-grid gridTemplateColumns="1fr 1fr 1fr 1fr 1fr" gap="base">
          <s-stack direction="block" gap="small-100">
            <s-text tone="subdued">Cliente</s-text>
            <s-text fontWeight="bold">{customer?.name}</s-text>
          </s-stack>
          <s-stack direction="block" gap="small-100">
            <s-text tone="subdued">Location</s-text>
            <s-text fontWeight="bold">{location?.name}</s-text>
          </s-stack>
          <s-stack direction="block" gap="small-100">
            <s-text tone="subdued">Rappresentante</s-text>
            <s-text fontWeight="bold">{representatives[0].name}</s-text>
          </s-stack>
          <s-stack direction="block" gap="small-100">
            <s-text tone="subdued">Stagione</s-text>
            <s-text fontWeight="bold">{seasons[0].name}</s-text>
          </s-stack>
          <s-stack direction="block" gap="small-100">
            <s-text tone="subdued">Brand</s-text>
            <s-text fontWeight="bold">{brands[0].name}</s-text>
          </s-stack>
        </s-grid>
      </s-section>

      <s-section heading="Prodotti">
        <ProductPicker products={products} onAdd={addLine} />
      </s-section>

      {lines.length > 0 && (
        <s-section heading="Righe ordine">
          <s-table>
            <s-table-header-row>
              <s-table-header listSlot="primary">Prodotto</s-table-header>
              <s-table-header listSlot="labeled">Prezzo</s-table-header>
              <s-table-header listSlot="labeled">Quantità</s-table-header>
              <s-table-header listSlot="labeled" format="currency">Totale</s-table-header>
            </s-table-header-row>
            <s-table-body>
              {lines.map((l) => (
                <s-table-row key={l.variantId}>
                  <s-table-cell>
                    <s-stack direction="block" gap="small-100">
                      <s-text fontWeight="bold">{l.title}</s-text>
                      <s-text tone="subdued">SKU {l.sku}</s-text>
                    </s-stack>
                  </s-table-cell>
                  <s-table-cell>€ {l.price.toFixed(2)}</s-table-cell>
                  <s-table-cell>
                    <s-number-field
                      label="Quantità"
                      labelAccessibilityVisibility="exclusive"
                      value={String(l.quantity)}
                      onChange={(e: any) => setQuantity(l.variantId, Number(e.target.value) || 0)}
                    />
                  </s-table-cell>
                  <s-table-cell>€ {(l.price * l.quantity).toFixed(2)}</s-table-cell>
                </s-table-row>
              ))}
            </s-table-body>
          </s-table>
        </s-section>
      )}

      <s-stack slot="aside" direction="block">
        <OrderSummary
          lines={lines}
          discount={discount}
          shipping={shipping}
          paymentTerms={paymentTerms}
          onDiscountChange={setDiscount}
          onShippingChange={setShipping}
          onPaymentTermsChange={setPaymentTerms}
          onSaveDraft={() => submit("draft")}
          onSendOrder={() => submit("send")}
          saving={saving}
        />
      </s-stack>
    </s-page>
  );
}
