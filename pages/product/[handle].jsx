import { storefrontClient } from "../../lib/callShopify";
import Page from "../../components/Page";

function Product({ product, sections }) {
  return (
    <div>
      <Page title={product.title} sections={sections} />
    </div>
  );
}

// This function gets called at build time
export async function getStaticPaths() {
  const handles = await storefrontClient.query({
    data: {
      query: `{
        products(first: 250) {
          edges {
            node {
                handle
            }
          }
        }
      }`,
    },
  });

  const paths = handles.body.data.products.edges.map(({ node }) => ({
    params: { handle: node.handle },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const product = await storefrontClient.query({
    data: {
      query: `query getProduct($handle: String!) {
        product(handle: $handle) {
          id
          title
          handle
          publishedAt
          availableForSale
          tags
          title
          totalInventory
          descriptionHtml
          metafield(namespace: "custom", key: "paragraphs") {
            namespace
            value
          }
          featuredImage {
            altText
            height
            id
            src
            width
          }
          images(first: 5) {
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
          variants(first: 30) {
            edges {
              node {
                id
                availableForSale
                title
                image {
                  altText
                  height
                  id
                  src
                  width
                }
                priceV2 {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }`,
      variables: {
        handle: params.handle,
      },
    },
  });

  const relatedProductsQuery = product.body.data.product.tags
    .map((c) => `tag:${c}`)
    .join(" OR ");
  console.log("related; ", relatedProductsQuery);

  const relatedProducts = await storefrontClient.query({
    data: {
      query: `query getRelatedProducts($first: Int!, $query: String!) {
        products(first: $first, query: $query) {
          edges {
            node {
              id
              title
              handle
              publishedAt
              tags
              title
              totalInventory
              descriptionHtml
              images(first: 2) {
                edges {
                  node {
                    altText
                    height
                    id
                    src
                    url
                    width
                  }
                }
              }
            }
          }
        }
      }
      `,
      variables: {
        first: 4,
        query: `(${relatedProductsQuery}) AND -title:"${product.body.data.product.title}"`,
      },
    },
  });

  const sections = [
    {
      name: "product_card",
      product: {
        ...product.body.data.product,
        images: product.body.data.product.images.edges.map(({ node }) => node),
      },
    },
    {
      name: "product_list",
      heading: "You May Also Like",
      className: "mt-24",
      products: relatedProducts.body.data.products.edges.map(({ node }) => ({
        ...node,
        images: node.images.edges.map(({ node }) => node),
      })),
      config: {
        enlarge_first: false,
        action: "basic_grid",
      },
    },
  ];

  return {
    props: { product: product.body.data.product, sections },
  };
}

export default Product;
