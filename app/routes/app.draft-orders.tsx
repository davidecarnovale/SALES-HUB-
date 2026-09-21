import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { DraftOrderRepository } from "~/services/orders/orderRepository";
import { StatusBadge } from "~/components/Shared/StatusBadge";
import { customers, customerLocations } from "~/mocks/customers";

export async function loader() {
  const drafts = await DraftOrderRepository.list();
  return json({ drafts });
}

export default function DraftOrders() {
  const { drafts } = useLoaderData<typeof loader>();

  return (
    <s-page heading="Draft Orders">
      <s-button slot="primary-action">+ Nuovo draft</s-button>

      <s-section padding="none">
        <s-table>
          <s-table-header-row>
            <s-table-header listSlot="kicker">Draft</s-table-header>
            <s-table-header listSlot="primary">Cliente</s-table-header>
            <s-table-header listSlot="secondary">Location</s-table-header>
            <s-table-header listSlot="labeled">Creato</s-table-header>
            <s-table-header listSlot="labeled" format="currency">Importo</s-table-header>
            <s-table-header listSlot="inline">Stato</s-table-header>
          </s-table-header-row>
          <s-table-body>
            {drafts.map((d) => {
              const customer = customers.find((c) => c.id === d.customerId);
              const location = customerLocations.find((l) => l.id === d.customerLocationId);
              const total = d.lines.reduce((s, l) => s + l.price * l.quantity, 0) - d.discount + d.shipping;
              return (
                <s-table-row key={d.id} clickDelegate={`open-${d.id}`}>
                  <s-table-cell><s-link id={`open-${d.id}`} href={`/app/draft-orders/${d.id}`}>{d.name}</s-link></s-table-cell>
                  <s-table-cell>{customer?.name}</s-table-cell>
                  <s-table-cell>{location?.name}</s-table-cell>
                  <s-table-cell>{d.createdAt}</s-table-cell>
                  <s-table-cell>€ {total.toFixed(2)}</s-table-cell>
                  <s-table-cell><StatusBadge status={d.status} /></s-table-cell>
                </s-table-row>
              );
            })}
          </s-table-body>
        </s-table>
      </s-section>
    </s-page>
  );
}
