import type { Representative, Season, Brand, Territory } from "~/types";

export const representatives: Representative[] = [
  { id: "rep-1", name: "Marco Bianchi", email: "marco.bianchi@saleshub.dev" },
  { id: "rep-2", name: "Luca Rossi", email: "luca.rossi@saleshub.dev" },
  { id: "rep-3", name: "Andrea Verdi", email: "andrea.verdi@saleshub.dev" },
];

export const seasons: Season[] = [
  { id: "season-fall-2026", name: "Fall 2026", value: "fall-2026" },
  { id: "season-winter-2026", name: "Winter 2026", value: "winter-2026" },
  { id: "season-summer-2027", name: "Summer 2027", value: "summer-2027" },
];

export const brands: Brand[] = [
  { id: "brand-nike", name: "Nike", vendor: "Nike" },
  { id: "brand-adidas", name: "Adidas", vendor: "Adidas" },
  { id: "brand-puma", name: "Puma", vendor: "Puma" },
];

export const territories: Territory[] = [
  { id: "terr-er", name: "Emilia-Romagna" },
  { id: "terr-veneto", name: "Veneto" },
  { id: "terr-lombardia", name: "Lombardia" },
  { id: "terr-toscana", name: "Toscana" },
];
