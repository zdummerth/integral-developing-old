import Shopify from "@shopify/shopify-api";

export const storefrontClient = new Shopify.Clients.Storefront(
  process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN,
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN
);

export const getCollections = async ({ first = 1, query = "" }) => {
  try {
    const response = await storefrontClient.query({
      data: {
        query: `query ($first: Int, $query: String) {
        collections(first: $first, query: $query) {
          edges {
            node {
              id
              title
              handle
              image {
                height
                width
                id
                url
                src
                altText
              }
            }
          }
        }
      }`,
        variables: {
          first,
          query,
        },
      },
    });
    // console.log(response.body.data.collections);

    const collections = response.body?.data.collections.edges.map(
      ({ node }) => node
    );

    // console.log(collections);

    return collections;
  } catch (e) {
    throw e;
  }
};

export const getProducts = async ({ first = 1, query = "" }) => {
  try {
    const response = await storefrontClient.query({
      data: {
        query: `query ($first: Int, $query: String) {
        products(first: $first, query: $query) {
          edges {
            node {
              id
              title
              handle
              tags
              options {
                name
                values
              }
              images(first: 2) {
                edges {
                  node {
                    altText
                    height
                    id
                    src
                    width
                  }
                }
              }
            }
          }
        }
      }`,
        variables: {
          first,
          query,
        },
      },
    });
    // console.log(response.body.data.products.edges);

    const products = response.body?.data.products.edges.map(({ node }) => ({
      ...node,
      images: node.images.edges.map(({ node }) => node),
    }));

    return products;
  } catch (e) {
    throw e;
  }
};
