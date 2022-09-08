import type { GetStaticProps } from "next";
import transformContent from "../lib/transform-content";
import styles from "../styles/Home.module.css";
import Page from "../components/Page";

const Home = (props: any) => {
  // console.log(props);
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
      image: "banner-hearse-purple.jpg",
      imageUuid: "d2bda59e-84d8-4d9f-9fe1-ac016e03f943",
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
    // {
    //   name: "product_list_by_tags",
    //   products: [],
    //   tags: ["Featured"],
    //   config: {
    //     enlarge_first: false,
    //     action: "basic_grid",
    //   },
    // },
  ];

  const content = await transformContent(sections);

  return {
    props: {
      sections: content,
    },
  };
};

export default Home;
