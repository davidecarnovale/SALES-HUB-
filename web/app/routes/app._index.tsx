import { useLoaderData, Link } from "@remix-run/react";
import { json } from "@remix-run/node";
import { KpiCard } from "~/components/Shared/KpiCard";
import { StatusBadge } from "~/components/Shared/StatusBadge";
import { CommercialContextSelector } from "~/components/CommercialContext/CommercialContextSelector";
import { AssignmentRepository } from "~/services/assignments/assignmentRepository";
import { customers } from "~/mocks/customers";
import { brands } from "~/mocks/core";

export async function loader() {
  const assignments = await AssignmentRepository.list();
  return json({ assignments, customers, brands });
}

export default function Dashboard() {
  const { assignments } = useLoaderData<typeof loader>();

  const assigned = assignments.length;
  const toContact = assignments.filter((a) => a.collectionStatus === "da-iniziare").length;
  const toComplete = assignments.filter((a) => a.collectionStatus === "in-raccolta" || a.collectionStatus === "draft-creato").length;

  return (
    <s-page heading="Dashboard">
      <s-stack slot="aside" direction="block">
        <CommercialContextSelector />
      </s-stack>

      <s-section>
        <s-grid gridTemplateColumns="1fr 1fr 1fr 1fr" gap="base">
          <KpiCard value={String(assigned)} label="Clienti assegnati" />
          <KpiCard value={String(toContact)} label="Da contattare" />
          <KpiCard value={String(toComplete)} label="Ordini da completare" />
          <KpiCard value="€ 124.500" label="Valore potenziale" />
        </s-grid>
      </s-section>

      <s-section heading="Stato raccolta ordini per brand">
        <s-stack direction="block" gap="base">
          {brands.map((b) => (
            <s-stack key={b.id} direction="block" gap="small-100">
              <s-stack direction="inline" gap="base">
                <s-text>{b.name}</s-text>
                <s-text tone="subdued">75%</s-text>
              </s-stack>
              <s-box background="subdued" borderRadius="base" padding="small-100">
                <s-box background="strong" borderRadius="base" inlineSize="75%" minBlockSize="8px" />
              </s-box>
            </s-stack>
          ))}
        </s-stack>
      </s-section>

      <s-section heading="Prossimi appuntamenti" padding="none">
        <s-table>
          <s-table-header-row>
            <s-table-header listSlot="primary">Cliente</s-table-header>
            <s-table-header listSlot="inline">Quando</s-table-header>
            <s-table-header listSlot="labeled">Stato</s-table-header>
            <s-table-header listSlot="secondary"></s-table-header>
          </s-table-header-row>
          <s-table-body>
            {assignments.slice(0, 5).map((a) => {
              const customer = customers.find((c) => c.id === a.customerId);
              return (
                <s-table-row key={a.id}>
                  <s-table-cell>{customer?.name}</s-table-cell>
                  <s-table-cell>Oggi</s-table-cell>
                  <s-table-cell><StatusBadge status={a.collectionStatus} /></s-table-cell>
                  <s-table-cell>
                    <s-link href={`/app/customers/${a.customerId}`}>Apri</s-link>
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
