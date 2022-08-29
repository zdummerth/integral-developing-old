import type { NextPage, GetStaticProps } from "next";
import { storefrontClient } from "../lib/callShopify";
import CollectionList from "../components/products/CollectionList";
import hearseImg from "../public/banners/banner-hearse.png";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "../components/Navigation";

const Home = (props: any) => {
  // console.log(props);
  const fc = props.collections.data.collections.edges
    .filter(({ node }: { node: any }) =>
      ["Dry-Fits", "Accessories", "T-Shirts"].includes(node.title)
    )
    .map(({ node }: { node: any }) => node);
  console.log(fc);

  return (
    <div className={styles.container}>
      <Head>
        <title>Dark Ace Disc Golf | Home</title>
        <meta name="description" content="Welcome to Dark Ace Disc Golf" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={`${styles.main} bg-zinc-900 text-white`}>
        <Header />
        <div className="relative w-full">
          <Image
            src={hearseImg}
            alt="Vercel Logo"
            placeholder="blur"
            layout="responsive"
          />
        </div>
        <CollectionList collections={fc} />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
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
