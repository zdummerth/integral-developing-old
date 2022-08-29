import Shopify from "@shopify/shopify-api";

export const storefrontClient = new Shopify.Clients.Storefront(
  process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN,
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN
);
