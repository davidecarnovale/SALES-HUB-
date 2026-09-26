import { useCommercialContext } from "./CommercialContextProvider";
import { seasons, brands, territories } from "~/mocks/core";

export function CommercialContextSelector() {
  const { season, brand, territory, setSeason, setBrand, setTerritory } = useCommercialContext();

  return (
    <s-stack direction="inline" gap="base">
      <s-select
        label="Stagione"
        labelAccessibilityVisibility="exclusive"
        value={season?.id}
        onChange={(e: any) => setSeason(seasons.find((s) => s.id === e.target.value)!)}
      >
        {seasons.map((s) => (
          <s-option key={s.id} value={s.id}>{s.name}</s-option>
        ))}
      </s-select>
      <s-select
        label="Brand"
        labelAccessibilityVisibility="exclusive"
        value={brand?.id}
        onChange={(e: any) => setBrand(brands.find((b) => b.id === e.target.value)!)}
      >
        {brands.map((b) => (
          <s-option key={b.id} value={b.id}>{b.name}</s-option>
        ))}
      </s-select>
      <s-select
        label="Territorio"
        labelAccessibilityVisibility="exclusive"
        value={territory?.id}
        onChange={(e: any) => setTerritory(territories.find((t) => t.id === e.target.value)!)}
      >
        {territories.map((t) => (
          <s-option key={t.id} value={t.id}>{t.name}</s-option>
        ))}
      </s-select>
    </s-stack>
  );
}
