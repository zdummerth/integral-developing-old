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
          variants(first: 5) {
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

  const sections = [
    {
      name: "product_card",
      product: product.body.data.product,
    },
  ];

  return {
    props: { product: product.body.data.product, sections },
  };
}

export default Product;
