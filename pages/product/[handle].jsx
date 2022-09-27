import { storefrontClient } from "../../lib/callShopify";
import transformContent from "../../lib/transform-content";

import Page from "../../components/Page";

function Product({ title, sections }) {
  // console.log(sections);
  return (
    <div>
      <Page title={title} blocks={sections} />
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
  const sections = [
    {
      type: "product_card",
      handle: params.handle,
      showRelatedProducts: true,
    },
  ];

  // const availabilty = await getProductAvailabilty(product.body.data.product.id);
  // console.log(availabilty);

  const content = await transformContent(sections);
  const productTitle = content.find((c) => c.name === "product_card")?.title;
  return {
    props: { sections: content, title: productTitle ? productTitle : null },
  };
}

export default Product;
