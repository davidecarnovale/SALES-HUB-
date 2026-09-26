import { Outlet } from "@remix-run/react";
import { CommercialContextProvider } from "~/components/CommercialContext/CommercialContextProvider";

// s-app-nav is teleported by App Bridge into the Shopify Admin chrome —
// it renders nothing in our own iframe layout, so it can live anywhere
// in the tree. rel="home" marks the default landing route.
export function AppLayout() {
  return (
    <CommercialContextProvider>
      <s-app-nav>
        <s-link href="/app" rel="home">Dashboard</s-link>
        <s-link href="/app/customers">Clienti</s-link>
        <s-link href="/app/draft-orders">Draft Orders</s-link>
        <s-link href="/app/orders">Ordini</s-link>
        <s-link href="/app/catalog">Catalogo</s-link>
        <s-link href="/app/settings">Impostazioni</s-link>
      </s-app-nav>
      <Outlet />
    </CommercialContextProvider>
  );
}
