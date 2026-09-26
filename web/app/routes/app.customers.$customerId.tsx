import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { CustomerRepository } from "~/services/customers/customerRepository";
import { Breadcrumbs } from "~/components/Shared/Breadcrumbs";

export async function loader({ params }: { params: { customerId: string } }) {
  const customer = await CustomerRepository.getById(params.customerId);
  const locations = await CustomerRepository.getLocations(params.customerId);
  return json({ customer, locations });
}

export default function CustomerDetail() {
  const { customer, locations } = useLoaderData<typeof loader>();

  return (
    <s-page heading={customer?.name}>
      <s-link slot="breadcrumbs" href="/app/customers">Clienti</s-link>

      <s-section>
        <Breadcrumbs items={["Fall 2026", "Nike", "Emilia-Romagna", customer?.name ?? ""]} />
      </s-section>

      <s-section heading="Location cliente">
        <s-stack direction="block" gap="base">
          {locations.map((loc) => (
            <s-stack key={loc.id} direction="inline" gap="base">
              <s-stack direction="block" gap="small-100">
                <s-text fontWeight="bold">{loc.name}</s-text>
                <s-text tone="subdued">{loc.address}, {loc.city}</s-text>
              </s-stack>
              <s-link href={`/app/customers/${customer?.id}/locations/${loc.id}`}>Apri</s-link>
            </s-stack>
          ))}
        </s-stack>
      </s-section>
    </s-page>
  );
}
