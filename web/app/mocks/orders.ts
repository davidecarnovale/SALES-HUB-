import type { DraftOrder, ShopifyOrder } from "~/types";

export const draftOrders: DraftOrder[] = [
  {
    id: "do-1",
    name: "#D-1024",
    customerId: "cust-1",
    customerLocationId: "loc-1",
    representativeId: "rep-1",
    seasonId: "season-fall-2026",
    brandId: "brand-nike",
    status: "in-modifica",
    lines: [
      { productId: "prod-1", variantId: "prod-1-42", title: "Air Max 2026", sku: "NK-AM26-42", price: 89, quantity: 5 },
      { productId: "prod-2", variantId: "prod-2-41", title: "Zoom Pegasus", sku: "NK-ZP24-41", price: 79, quantity: 3 },
    ],
    discount: 50,
    shipping: 0,
    paymentTerms: "60 giorni",
    createdAt: "2026-04-12",
  },
];

export const shopifyOrders: ShopifyOrder[] = [
  {
    id: "ord-1",
    name: "#10421",
    customerId: "cust-2",
    customerLocationId: "loc-4",
    representativeId: "rep-1",
    seasonId: "season-fall-2026",
    brandId: "brand-nike",
    territoryId: "terr-er",
    status: "confermato",
    lines: [
      { productId: "prod-1", variantId: "prod-1-42", title: "Air Max 2026", sku: "NK-AM26-42", price: 89, quantity: 40 },
    ],
    total: 8240,
    createdAt: "2026-04-08",
  },
];
