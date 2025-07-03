import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  LiveReload,
  useLoaderData,
  Link,
} from "@remix-run/react";

import { AppProvider as ShopifyAppBridgeProvider } from "@shopify/shopify-app-remix/react";
import { AppProvider as PolarisAppProvider } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";

import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";
import { NavMenu } from "@shopify/app-bridge-react";
import { authenticate } from "./shopify.server";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: polarisStyles },
];

export const loader: LoaderFunction = async ({ request }) => {
  await authenticate.admin(request);
  return { apiKey: process.env.SHOPIFY_API_KEY! };
};

export default function Root() {
  const { apiKey } = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <ShopifyAppBridgeProvider isEmbeddedApp apiKey={apiKey}>
          <PolarisAppProvider i18n={enTranslations}>
            <NavMenu>
              <Link to="/" rel="home">Home</Link>
              <Link to="/abandoned-cart">Abandoned Cart</Link>
              <Link to="/whatsapp">Inventory Alerts</Link>
              <Link to="/reviews">Review Collection</Link>
              <Link to="/bundling">Product Bundling</Link>
              <Link to="/invoices">Invoice Generation</Link>
              <Link to="/analytics">Analytics Dashboard</Link>
            </NavMenu>

            <Outlet />
          </PolarisAppProvider>
        </ShopifyAppBridgeProvider>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
