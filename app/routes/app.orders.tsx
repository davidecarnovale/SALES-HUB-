import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { OrderRepository } from "~/services/orders/orderRepository";
import { StatusBadge } from "~/components/Shared/StatusBadge";
import { customers, customerLocations } from "~/mocks/customers";

export async function loader() {
  const orders = await OrderRepository.list();
  return json({ orders });
}

export default function Orders() {
  const { orders } = useLoaderData<typeof loader>();

  return (
    <s-page heading="Ordini">
      <s-section padding="none">
        <s-table>
          <s-table-header-row>
            <s-table-header listSlot="kicker">Ordine</s-table-header>
            <s-table-header listSlot="primary">Cliente</s-table-header>
            <s-table-header listSlot="secondary">Location</s-table-header>
            <s-table-header listSlot="labeled">Data</s-table-header>
            <s-table-header listSlot="labeled" format="currency">Importo</s-table-header>
            <s-table-header listSlot="inline">Stato</s-table-header>
          </s-table-header-row>
          <s-table-body>
            {orders.map((o) => {
              const customer = customers.find((c) => c.id === o.customerId);
              const location = customerLocations.find((l) => l.id === o.customerLocationId);
              return (
                <s-table-row key={o.id}>
                  <s-table-cell>{o.name}</s-table-cell>
                  <s-table-cell>{customer?.name}</s-table-cell>
                  <s-table-cell>{location?.name}</s-table-cell>
                  <s-table-cell>{o.createdAt}</s-table-cell>
                  <s-table-cell>€ {o.total.toFixed(2)}</s-table-cell>
                  <s-table-cell><StatusBadge status={o.status} /></s-table-cell>
                </s-table-row>
              );
            })}
          </s-table-body>
        </s-table>
      </s-section>
    </s-page>
  );
}
