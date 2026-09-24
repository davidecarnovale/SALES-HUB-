import type { OrderLine } from "~/types";

export function OrderSummary({
  lines,
  discount,
  shipping,
  paymentTerms,
  onDiscountChange,
  onShippingChange,
  onPaymentTermsChange,
  onSaveDraft,
  onSendOrder,
  saving,
}: {
  lines: OrderLine[];
  discount: number;
  shipping: number;
  paymentTerms: string;
  onDiscountChange: (v: number) => void;
  onShippingChange: (v: number) => void;
  onPaymentTermsChange: (v: string) => void;
  onSaveDraft: () => void;
  onSendOrder: () => void;
  saving: boolean;
}) {
  const subtotal = lines.reduce((sum, l) => sum + l.price * l.quantity, 0);
  const total = subtotal - discount + shipping;

  return (
    <s-section heading={`${lines.length} prodotti`}>
      <s-stack direction="block" gap="base">
        <s-stack direction="inline" gap="base">
          <s-text>Subtotale</s-text>
          <s-text>€ {subtotal.toFixed(2)}</s-text>
        </s-stack>
        <s-number-field
          label="Sconto"
          value={String(discount)}
          onChange={(e: any) => onDiscountChange(Number(e.target.value) || 0)}
        />
        <s-number-field
          label="Spedizione"
          value={String(shipping)}
          onChange={(e: any) => onShippingChange(Number(e.target.value) || 0)}
        />
        <s-divider></s-divider>
        <s-stack direction="inline" gap="base">
          <s-text fontWeight="bold">Totale</s-text>
          <s-text fontWeight="bold">€ {total.toFixed(2)}</s-text>
        </s-stack>
        <s-text-field
          label="Termini di pagamento"
          value={paymentTerms}
          onChange={(e: any) => onPaymentTermsChange(e.target.value)}
        />
        <s-button variant="secondary" disabled={saving || lines.length === 0} onClick={onSaveDraft}>
          Salva draft
        </s-button>
        <s-button variant="primary" disabled={saving || lines.length === 0} onClick={onSendOrder}>
          Invia ordine
        </s-button>
      </s-stack>
    </s-section>
  );
}
