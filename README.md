# SALES HUB

App Shopify nativa per rappresentanti B2B — Rappresentante → Stagione → Brand → Territorio → Cliente → Location.

## Stack

- Remix + Vite, embedded via App Bridge
- **Polaris Web Components** (`s-*`, via CDN `polaris.js` + `app-bridge.js`) — non Polaris React, deprecato
- Repository astratti (`app/services/*`) con dati mock, sostituibili con Admin GraphQL senza toccare le pagine
- Store dev collegato: `function-dev-jmjw84ml.myshopify.com` (Shopify Plus)

## Struttura

```
app/
  types/        modello dati (Representative, Season, Brand, Territory, Customer, Assignment, ...)
  mocks/        dati finti realistici
  services/     repository (customers, products, orders, assignments) — mock ora, GraphQL dopo
  components/   CommercialContext, Layout, Shared
  routes/       Dashboard, Clienti, Location cliente, Catalogo, Draft Orders, Ordini
```

## Sviluppo

```bash
npm install
npm run dev      # richiede shopify CLI login sullo store dev collegato
```

`npm run build` / `npm run typecheck` funzionano anche senza autenticazione Shopify.

## Stato

Scaffold funzionante con dati mock: Dashboard → Clienti → Location → Catalogo → Draft Orders → Ordini.
Da fare: auth/session Shopify embedded, connessione GraphQL reale (Company/CompanyLocation/Product/DraftOrder), pagina "Nuovo ordine" (§11 spec), mobile layout dedicato, Impostazioni (rappresentanti/territori/assegnazioni).
