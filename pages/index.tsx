import type { GetStaticProps } from "next";
import { storefrontClient } from "../lib/callShopify";
import CollectionList from "../components/products/CollectionList";
import hearseImg from "../public/banners/banner-hearse-purple.jpg";
import havoc from "../public/havoc-king-black.png";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "../components/Navigation";

const Home = (props: any) => {
  // console.log(props);
  const allCollections = props.collections.data.collections.edges.map(
    ({ node }: { node: any }) => node
  );
  const fc = props.collections.data.collections.edges
    .filter(({ node }: { node: any }) =>
      ["Dry-Fits", "T-Shirts", "Accessories"].includes(node.title)
    )
    .map(({ node }: { node: any }) => node);

  const discs = props.collections.data.collections.edges
    .filter(({ node }: { node: any }) =>
      ["Westside", "Dynamic Discs", "Innova", "Gateway", "Discmania"].includes(
        node.title
      )
    )
    .map(({ node }: { node: any }) => node);

  return (
    <div className={styles.container}>
      <Head>
        <title>Dark Ace Disc Golf | Home</title>
        <meta name="description" content="Welcome to Dark Ace Disc Golf" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={`${styles.main} bg-zinc-900 text-white`}>
        <Header />
        <CollectionList
          collections={allCollections}
          config={{
            enlarge_first: false,
            action: "x_scroll",
          }}
        />
        <div className="relative w-full">
          <Image
            src={hearseImg}
            alt="Vercel Logo"
            placeholder="blur"
            layout="responsive"
          />
        </div>
        <CollectionList
          collections={fc}
          config={{
            enlarge_first: true,
            action: "standard",
          }}
        />
        <CollectionList
          collections={discs}
          config={{
            enlarge_first: false,
            // action: "standard",
            action: "x_scroll_then_grid",
          }}
        />
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
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
    },
  };
};

export default Home;
