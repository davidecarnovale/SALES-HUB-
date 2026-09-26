import type { Customer, CustomerLocation, Contact } from "~/types";

export const customers: Customer[] = [
  { id: "cust-1", shopifyCompanyId: "gid://shopify/Company/1", name: "Rossi Sport", status: "active" },
  { id: "cust-2", shopifyCompanyId: "gid://shopify/Company/2", name: "Sport Center", status: "active" },
  { id: "cust-3", shopifyCompanyId: "gid://shopify/Company/3", name: "Bianchi Store", status: "active" },
  { id: "cust-4", shopifyCompanyId: "gid://shopify/Company/4", name: "Athletic Point", status: "active" },
  { id: "cust-5", shopifyCompanyId: "gid://shopify/Company/5", name: "Gamma Sport", status: "active" },
  { id: "cust-6", shopifyCompanyId: "gid://shopify/Company/6", name: "Delta Store", status: "active" },
];

export const customerLocations: CustomerLocation[] = [
  { id: "loc-1", customerId: "cust-1", shopifyCompanyLocationId: "gid://shopify/CompanyLocation/1", name: "Bologna Store", address: "Via Emilia 123", city: "Bologna", province: "BO", country: "IT" },
  { id: "loc-2", customerId: "cust-1", shopifyCompanyLocationId: "gid://shopify/CompanyLocation/2", name: "Modena Store", address: "Via Giardini 45", city: "Modena", province: "MO", country: "IT" },
  { id: "loc-3", customerId: "cust-1", shopifyCompanyLocationId: "gid://shopify/CompanyLocation/3", name: "Parma Store", address: "Viale Mentana 12", city: "Parma", province: "PR", country: "IT" },
  { id: "loc-4", customerId: "cust-2", shopifyCompanyLocationId: "gid://shopify/CompanyLocation/4", name: "Modena Store", address: "Corso Canalgrande 8", city: "Modena", province: "MO", country: "IT" },
  { id: "loc-5", customerId: "cust-3", shopifyCompanyLocationId: "gid://shopify/CompanyLocation/5", name: "Reggio Store", address: "Via Roma 5", city: "Reggio Emilia", province: "RE", country: "IT" },
];

export const contacts: Contact[] = [
  { id: "con-1", customerId: "cust-1", name: "Paolo Rossi", role: "Buyer", email: "paolo@rossisport.it" },
  { id: "con-2", customerId: "cust-1", name: "Giulia Neri", role: "Store Manager", email: "giulia@rossisport.it" },
];
