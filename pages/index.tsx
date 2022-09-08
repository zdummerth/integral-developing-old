import type { GetStaticProps } from "next";
import { storefrontClient, getCollections } from "../lib/callShopify";
import transformContent from "../lib/transform-content";
import styles from "../styles/Home.module.css";
import Page from "../components/Page";

const Home = (props: any) => {
  console.log(props);
  return (
    <div className={styles.container}>
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
      name: "image_banner",
      image: "banner-hearse-purple.jpg",
      config: {
        objectFit: "contain",
        layout: "responsive",
      },
    },
    {
      name: "collection_list",
      collections: ["Featured"],
      config: {
        enlarge_first: true,
        action: "flex",
      },
    },
    {
      name: "product_list_by_tags",
      products: [],
      tags: ["Featured"],
      config: {
        enlarge_first: false,
        action: "basic_grid",
      },
    },
  ];

  const content = await transformContent(sections);

  return {
    props: {
      sections: content,
    },
  };
};

export default Home;
