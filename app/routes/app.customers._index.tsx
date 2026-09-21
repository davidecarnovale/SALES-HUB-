import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { CustomerRepository } from "~/services/customers/customerRepository";
import { customerLocations } from "~/mocks/customers";

export async function loader() {
  const customers = await CustomerRepository.list();
  return json({ customers });
}

export default function CustomersIndex() {
  const { customers } = useLoaderData<typeof loader>();

  return (
    <s-page heading={`Clienti (${customers.length})`}>
      <s-section padding="none">
        <s-table>
          <s-table-header-row>
            <s-table-header listSlot="primary">Cliente</s-table-header>
            <s-table-header listSlot="inline">Location</s-table-header>
            <s-table-header listSlot="labeled">Stato raccolta</s-table-header>
            <s-table-header listSlot="secondary"></s-table-header>
          </s-table-header-row>
          <s-table-body>
            {customers.map((c) => {
              const locCount = customerLocations.filter((l) => l.customerId === c.id).length;
              return (
                <s-table-row key={c.id} clickDelegate={`open-${c.id}`}>
                  <s-table-cell>{c.name}</s-table-cell>
                  <s-table-cell>{locCount} location</s-table-cell>
                  <s-table-cell>—</s-table-cell>
                  <s-table-cell>
                    <s-link id={`open-${c.id}`} href={`/app/customers/${c.id}`}>Apri</s-link>
                  </s-table-cell>
                </s-table-row>
              );
            })}
          </s-table-body>
        </s-table>
      </s-section>
    </s-page>
  );
}
