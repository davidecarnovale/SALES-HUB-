export function Breadcrumbs({ items }: { items: string[] }) {
  return (
    <s-stack direction="inline" gap="small-100">
      {items.filter(Boolean).map((item, i) => (
        <s-stack key={item} direction="inline" gap="small-100">
          {i > 0 && <s-text tone="subdued"> / </s-text>}
          <s-text tone="subdued">{item}</s-text>
        </s-stack>
      ))}
    </s-stack>
  );
}
