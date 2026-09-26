import type { CollectionStatus, DraftOrderStatus, ShopifyOrderStatus } from "~/types";

const STATUS_LABEL: Record<string, string> = {
  "da-iniziare": "Da iniziare",
  "in-raccolta": "In raccolta",
  "draft-creato": "Draft creato",
  "completato": "Completato",
  "in-modifica": "In modifica",
  "pronto": "Pronto",
  "inviato": "Inviato",
  "confermato": "Confermato",
  "in-lavorazione": "In lavorazione",
  "annullato": "Annullato",
};

const STATUS_TONE: Record<string, string> = {
  "da-iniziare": "warning",
  "in-raccolta": "info",
  "draft-creato": "warning",
  "completato": "success",
  "in-modifica": "warning",
  "pronto": "info",
  "inviato": "info",
  "confermato": "success",
  "in-lavorazione": "info",
  "annullato": "critical",
};

export function StatusBadge({
  status,
}: {
  status: CollectionStatus | DraftOrderStatus | ShopifyOrderStatus;
}) {
  return <s-badge tone={STATUS_TONE[status] as any}>{STATUS_LABEL[status] ?? status}</s-badge>;
}
