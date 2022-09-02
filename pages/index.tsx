import type { GetStaticProps } from "next";
import { storefrontClient } from "../lib/callShopify";
import unsplash from "../lib/callUnsplash";
import styles from "../styles/Home.module.css";
import Page from "../components/Page";

const Home = (props: any) => {
  // console.log(props);
  const testhtml = `<div className="p-12">Tester</div>`;
  return (
    <div className={styles.container}>
      <div dangerouslySetInnerHTML={{ __html: testhtml }} />
      <Page
        sections={props.sections}
        title="Home"
        description="Welcome To Dark Ace"
      />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const sections = [
    {
      name: "collection_list",
      collections: [
        "Westside",
        "Dynamic Discs",
        "Innova",
        "Gateway",
        "Discmania",
      ],
      config: {
        enlarge_first: false,
        action: "x_scroll",
      },
    },
    {
      name: "image_banner",
      image: require("../public/banners/banner-hearse-purple.jpg").default,
      config: {
        objectFit: "contain",
        layout: "responsive",
      },
    },
    {
      name: "collection_list",
      collections: ["Dry-Fits", "T-Shirts", "Accessories"],
      config: {
        enlarge_first: true,
        action: "standard",
      },
    },
    {
      name: "collection_list",
      collections: [
        "Dynamic Discs",
        "Westside",
        "Innova",
        "Gateway",
        "Discmania",
      ],
      config: {
        enlarge_first: false,
        action: "x_scroll_then_grid",
      },
    },
  ];

  const allCollections = sections
    .filter((section) => section.collections)
    .map((section: any) => section.collections)
    .flat();

  const unique = [...new Set(allCollections)];
  const collectionQuery = unique
    .map((c: string) => `title:"${c}"`)
    .join(" OR ");
  // console.log(collectionQuery);

  // console.log(unique);

  const response: any = await storefrontClient.query({
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
        first: unique.length,
        query: collectionQuery,
      },
    },
  });

  const collectionData = response.body.data.collections.edges.map(
    ({ node }: { node: any }) => node
  );

  const sectionsWithData = sections.map((section) => {
    let newCollections = null;
    if (section.collections) {
      newCollections = section.collections.map((c) =>
        collectionData.find((cd: any) => cd.title === c)
      );
    }
    return {
      ...section,
      collections: newCollections,
    };
  });

  // console.log(sectionsWithData);

  // const photos = await unsplash.search.getCollections({
  //   query: "cat",
  //   page: 1,
  //   perPage: 2,
  // });

  // console.log(photos.response);

  return {
    props: {
      collections: response.body,
      sections: sectionsWithData,
      // photos: photos.response,
    },
  };
};

export default Home;
