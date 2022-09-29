import { storefrontClient } from "../../lib/callShopify";
import Page from "../../components/Page";
import transformContent from "../../lib/transform-content";
import getNavData from "../../lib/get-navigation-data";

export default function CollectionPage({ sections, navdata }) {
  console.log({ sections });
  return (
    <div>
      <Page blocks={sections} navdata={navdata} />
    </div>
  );
}

export async function getStaticProps({ params }) {
  // console.log(params.id)
  const sections = [
    {
      type: "collection_full",
      collection: params.handle,
      config: {
        enlarge_first: false,
        action: "basic_grid",
      },
    },
  ];

  const content = await transformContent(sections);
  const navdata = await getNavData();

  return {
    props: {
      sections: content,
      navdata,
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
