import { customers, customerLocations, contacts } from "~/mocks/customers";
import type { Customer, CustomerLocation, Contact } from "~/types";

// Mock implementation now; swap internals for Shopify Admin GraphQL
// (Company / CompanyLocation / CompanyContact) without changing this interface.
export const CustomerRepository = {
  async list(): Promise<Customer[]> {
    return customers;
  },
  async getById(id: string): Promise<Customer | undefined> {
    return customers.find((c) => c.id === id);
  },
  async getLocations(customerId: string): Promise<CustomerLocation[]> {
    return customerLocations.filter((l) => l.customerId === customerId);
  },
  async getLocationById(id: string): Promise<CustomerLocation | undefined> {
    return customerLocations.find((l) => l.id === id);
  },
  async getContacts(customerId: string): Promise<Contact[]> {
    return contacts.filter((c) => c.customerId === customerId);
  },
};
