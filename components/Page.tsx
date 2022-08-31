import type { GetStaticProps } from "next";
import { storefrontClient } from "../lib/callShopify";
import CollectionList from "../components/products/CollectionList";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "../components/Navigation";

const Home = (props: any) => {
  // console.log(props.sections);
  const filterCollections = (allCollections: any, filterOn: any) => {
    return allCollections.filter((node: any) => filterOn.includes(node.title));
  };

  const allCollections = props.collections.data.collections.edges.map(
    ({ node }: { node: any }) => node
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>Dark Ace Disc Golf | Home</title>
        <meta name="description" content="Welcome to Dark Ace Disc Golf" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={`${styles.main} bg-zinc-900 text-white`}>
        <Header />
        {props.sections.map((section: any, ind: number) => {
          console.log(section);
          switch (section.name) {
            case "collection_list": {
              return (
                <CollectionList
                  key={ind}
                  collections={filterCollections(
                    allCollections,
                    section.collections
                  )}
                  config={section.config}
                />
              );
            }
            case "image_banner": {
              return (
                <div className="relative w-full">
                  <Image
                    src={section.image}
                    alt="Vercel Logo"
                    placeholder="blur"
                    layout="responsive"
                  />
                </div>
              );
            }
          }
        })}
      </main>

      <footer className={styles.footer}></footer>
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
        "Westside",
        "Dynamic Discs",
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
  const response = await storefrontClient.query({
    data: {
      query: `{
        collections(first: 30) {
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
    },
  });

  return {
    props: {
      collections: response.body,
      sections,
    },
  };
};

export default Home;
