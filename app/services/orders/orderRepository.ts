import { draftOrders, shopifyOrders } from "~/mocks/orders";
import type { DraftOrder, OrderLine, ShopifyOrder } from "~/types";

// Mock implementation now; swap internals for Shopify Admin GraphQL
// (draftOrderCreate/Update/Complete) without changing this interface.
export const DraftOrderRepository = {
  async list(): Promise<DraftOrder[]> {
    return draftOrders;
  },
  async getById(id: string): Promise<DraftOrder | undefined> {
    return draftOrders.find((d) => d.id === id);
  },
  async calculate(lines: OrderLine[], discount = 0, shipping = 0) {
    const subtotal = lines.reduce((sum, l) => sum + l.price * l.quantity, 0);
    return { subtotal, discount, shipping, total: subtotal - discount + shipping };
  },
  async create(input: Omit<DraftOrder, "id" | "name" | "createdAt">): Promise<DraftOrder> {
    const draft: DraftOrder = {
      ...input,
      id: `do-${draftOrders.length + 1}`,
      name: `#D-${1024 + draftOrders.length + 1}`,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    draftOrders.push(draft);
    return draft;
  },
  async update(id: string, patch: Partial<DraftOrder>): Promise<DraftOrder | undefined> {
    const draft = draftOrders.find((d) => d.id === id);
    if (!draft) return undefined;
    Object.assign(draft, patch);
    return draft;
  },
  async complete(id: string): Promise<DraftOrder | undefined> {
    return this.update(id, { status: "completato" });
  },
};

export const OrderRepository = {
  async list(): Promise<ShopifyOrder[]> {
    return shopifyOrders;
  },
  async getById(id: string): Promise<ShopifyOrder | undefined> {
    return shopifyOrders.find((o) => o.id === id);
  },
};
