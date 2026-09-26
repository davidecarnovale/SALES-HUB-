import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { CustomerRepository } from "~/services/customers/customerRepository";
import { Breadcrumbs } from "~/components/Shared/Breadcrumbs";

export async function loader({ params }: { params: { customerId: string; locationId: string } }) {
  const customer = await CustomerRepository.getById(params.customerId);
  const location = await CustomerRepository.getLocationById(params.locationId);
  return json({ customer, location });
}

export default function CustomerLocationDetail() {
  const { customer, location } = useLoaderData<typeof loader>();

  return (
    <s-page heading={`${customer?.name} / ${location?.name}`}>
      <s-button slot="primary-action" href={`/app/customers/${customer?.id}/locations/${location?.id}/orders/new`}>
        + Crea ordine
      </s-button>

      <s-section>
        <Breadcrumbs items={["Fall 2026", "Nike", "Emilia-Romagna", customer?.name ?? "", location?.name ?? ""]} />
      </s-section>

      <s-section heading="Informazioni location">
        <s-text>{location?.address}, {location?.city} ({location?.province})</s-text>
      </s-section>
    </s-page>
  );
}
