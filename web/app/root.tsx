import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useNavigate,
} from "@remix-run/react";
import { json } from "@remix-run/node";
import { useEffect } from "react";

// process.env is only available server-side; expose it to the client
// safely through a loader instead of reading it directly in the component.
export async function loader() {
  return json({
    apiKey: process.env.SHOPIFY_API_KEY ?? "4e7be3aeb945ffb02e1605f2fbbcac24",
  });
}

export default function App() {
  const { apiKey } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  // Bridges Polaris/App Bridge web-component navigation (s-link, s-app-nav)
  // to Remix client-side routing, so admin nav clicks don't full-reload.
  useEffect(() => {
    const handleNavigate = (event: Event) => {
      const target = event.target as HTMLElement;
      const href = target.getAttribute?.("href");
      if (href) navigate(href);
    };
    document.addEventListener("shopify:navigate", handleNavigate);
    return () => document.removeEventListener("shopify:navigate", handleNavigate);
  }, [navigate]);

  return (
    <html lang="it">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="shopify-api-key" content={apiKey} />
        <script src="https://cdn.shopify.com/shopifycloud/app-bridge.js"></script>
        <script src="https://cdn.shopify.com/shopifycloud/polaris.js"></script>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
