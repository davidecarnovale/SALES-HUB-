// Application-specific commercial layer (NOT Shopify entities)

export interface Representative {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Season {
  id: string;
  name: string;
  value: string; // e.g. "fall-2026", matches Shopify product season metafield
}

export interface Brand {
  id: string;
  name: string;
  vendor: string; // matches Shopify Product.vendor
  logo?: string;
}

export interface Territory {
  id: string;
  name: string;
}

export type CollectionStatus =
  | "da-iniziare"
  | "in-raccolta"
  | "draft-creato"
  | "completato";

export interface Customer {
  id: string;
  shopifyCompanyId: string;
  name: string;
  status: "active" | "inactive";
}

export interface CustomerLocation {
  id: string;
  customerId: string;
  shopifyCompanyLocationId: string;
  name: string;
  address: string;
  city: string;
  province: string;
  country: string;
}

export interface Contact {
  id: string;
  customerId: string;
  name: string;
  role?: string;
  email: string;
  phone?: string;
}

// An Assignment = "Representative X is responsible for Customer Y / Location Z
// for Brand A / Season B / Territory C."
export interface Assignment {
  id: string;
  representativeId: string;
  seasonId: string;
  brandId: string;
  territoryId: string;
  customerId: string;
  customerLocationId: string;
  collectionStatus: CollectionStatus;
}

// Shopify-facing entities (kept separate from the commercial layer)

export interface ShopifyProductVariant {
  id: string;
  title: string; // e.g. size or color
  sku: string;
  price: number;
  available: boolean;
}

export interface ShopifyProduct {
  id: string;
  title: string;
  sku: string;
  vendor: string; // Brand
  seasonValue: string; // Season metafield
  productType: string;
  gender?: string;
  image?: string;
  price: number;
  variants: ShopifyProductVariant[];
}

export interface OrderLine {
  productId: string;
  variantId: string;
  title: string;
  sku: string;
  price: number;
  quantity: number;
}

export type DraftOrderStatus =
  | "da-iniziare"
  | "in-modifica"
  | "pronto"
  | "inviato"
  | "completato";

export interface DraftOrder {
  id: string;
  name: string; // e.g. "#D-1025"
  customerId: string;
  customerLocationId: string;
  representativeId: string;
  seasonId: string;
  brandId: string;
  status: DraftOrderStatus;
  lines: OrderLine[];
  discount: number;
  shipping: number;
  paymentTerms: string;
  createdAt: string;
}

export type ShopifyOrderStatus = "confermato" | "in-lavorazione" | "annullato";

export interface ShopifyOrder {
  id: string;
  name: string; // e.g. "#10421"
  customerId: string;
  customerLocationId: string;
  representativeId: string;
  seasonId: string;
  brandId: string;
  territoryId: string;
  status: ShopifyOrderStatus;
  lines: OrderLine[];
  total: number;
  createdAt: string;
}

// Global commercial context, driven by the CommercialContextSelector
export interface CommercialContext {
  representative: Representative | null;
  season: Season | null;
  brand: Brand | null;
  territory: Territory | null;
}
