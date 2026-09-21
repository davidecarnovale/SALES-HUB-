import { products } from "~/mocks/products";
import type { ShopifyProduct } from "~/types";

interface SearchParams {
  vendor?: string;
  season?: string;
  query?: string;
}

// Mock implementation now; swap internals for:
//   Product.vendor = vendor AND Product season metafield = season
// via Shopify Admin GraphQL, without changing this interface.
export const ProductRepository = {
  async search({ vendor, season, query }: SearchParams): Promise<ShopifyProduct[]> {
    return products.filter((p) => {
      if (vendor && p.vendor !== vendor) return false;
      if (season && p.seasonValue !== season) return false;
      if (query && !p.title.toLowerCase().includes(query.toLowerCase()) && !p.sku.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  },
};
