import { storefrontClient } from "../../lib/callShopify";
import transformContent from "../../lib/transform-content";
import { getPageByHandle } from "../../lib/callFauna";

import getNavData from "../../lib/get-navigation-data";

import Page from "../../components/Page";

function Product({ title, sections, navdata }) {
  // console.log(sections);
  return (
    <div>
      <Page title={title} blocks={sections} navdata={navdata} />
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
  const pageData = await getPageByHandle({ handle: "product_template" });

  const sectionsWithHandle = pageData.sections.map((s) => {
    if (s.type === "product_card") {
      return {
        ...s,
        handle: params.handle,
      };
    }
    return s;
  });

  // const availabilty = await getProductAvailabilty(product.body.data.product.id);
  // console.log(availabilty);

  const content = await transformContent(sectionsWithHandle);
  const navdata = await getNavData();
  const productTitle = content.find((c) => c.name === "product_card")?.title;
  return {
    props: {
      sections: content,
      title: productTitle ? productTitle : null,
      navdata,
    },
  };
}

export default Product;
