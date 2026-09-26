import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { CommercialContext, Representative, Season, Brand, Territory } from "~/types";
import { representatives, seasons, brands, territories } from "~/mocks/core";

interface CommercialContextValue extends CommercialContext {
  setSeason: (season: Season) => void;
  setBrand: (brand: Brand) => void;
  setTerritory: (territory: Territory) => void;
}

const Ctx = createContext<CommercialContextValue | null>(null);

// Current representative would come from the authenticated App Bridge
// session; hardcoded to the first mock representative for now.
export function CommercialContextProvider({ children }: { children: ReactNode }) {
  const [representative] = useState<Representative>(representatives[0]);
  const [season, setSeason] = useState<Season>(seasons[0]);
  const [brand, setBrand] = useState<Brand>(brands[0]);
  const [territory, setTerritory] = useState<Territory>(territories[0]);

  const value = useMemo(
    () => ({ representative, season, brand, territory, setSeason, setBrand, setTerritory }),
    [representative, season, brand, territory]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCommercialContext() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCommercialContext must be used within CommercialContextProvider");
  return ctx;
}
