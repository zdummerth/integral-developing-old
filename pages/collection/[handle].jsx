import { storefrontClient } from "../../lib/callShopify";
import Page from "../../components/Page";

export default function CollectionPage({ collection, products, sections }) {
  console.log({ products });
  return (
    <div>
      <Page sections={sections} />
    </div>
  );
}

export async function getStaticProps({ params }) {
  // console.log(params.id)

  const response = await storefrontClient.query({
    data: {
      query: `query getCollectionByHandle($handle: String!) {
        collectionByHandle(handle: $handle) {
          id
          handle
          title
          products(first: 20) {
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
                featuredImage {
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
      `,
      variables: {
        handle: params.handle,
      },
    },
  });

  const products = response.body.data.collectionByHandle.products.edges.map(
    ({ node }) => node
  );

  const sections = [
    {
      name: "product_list",
      products,
      collection: response.body.data.collectionByHandle,
      config: {
        enlarge_first: false,
        action: "basic_grid",
      },
    },
  ];
  return {
    props: {
      collection: response.body.data.collectionByHandle,
      products,
      sections,
    },
  };
}

export async function getStaticPaths() {
  const response = await storefrontClient.query({
    data: {
      query: `{
        collections(first: 250) {
          edges {
            node {
              handle
            }
          }
        }
      }`,
    },
  });

  const paths = response.body.data.collections.edges.map(({ node }) => ({
    params: { handle: node.handle },
  }));

  // { fallback: false } means other routes should 404
  return { paths, fallback: false };
}
