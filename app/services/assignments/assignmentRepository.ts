import { assignments } from "~/mocks/assignments";
import type { Assignment } from "~/types";

interface AssignmentFilter {
  representativeId?: string;
  seasonId?: string;
  brandId?: string;
  territoryId?: string;
  customerId?: string;
}

// This repository has no Shopify equivalent — it is purely the
// application's own commercial layer, backed by a real DB later.
export const AssignmentRepository = {
  async list(filter: AssignmentFilter = {}): Promise<Assignment[]> {
    return assignments.filter((a) =>
      (!filter.representativeId || a.representativeId === filter.representativeId) &&
      (!filter.seasonId || a.seasonId === filter.seasonId) &&
      (!filter.brandId || a.brandId === filter.brandId) &&
      (!filter.territoryId || a.territoryId === filter.territoryId) &&
      (!filter.customerId || a.customerId === filter.customerId)
    );
  },
};
