export function KpiCard({ value, label }: { value: string; label: string }) {
  return (
    <s-section>
      <s-stack direction="block" gap="small-100">
        <s-heading>{value}</s-heading>
        <s-text tone="subdued">{label}</s-text>
      </s-stack>
    </s-section>
  );
}
