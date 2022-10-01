import CollectionList from "../components/products/CollectionList";
import ProductList from "../components/products/ProductList";
import ProductCardAlt from "../components/products/ProductCardAlt";
import Form from "../components/forms/Form";
import Block from "../components/Block";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "../components/Navigation";

interface PageProps {
  blocks: any;
  navdata: any;
  title?: string;
  description?: string;
  children?: JSX.Element;
}
const Page = ({
  navdata = [],
  blocks = [],
  title = "Title",
  description = "Page Description",
  children,
}: PageProps) => {
  // console.log(bannerImg);
  return (
    <>
      <Head>
        <title>{`The Disc Market | ${title}`}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        className={`${styles.main} bg-zinc-900 text-white max-w-6xl mx-auto flex flex-col items-center w-full`}
      >
        <Header blocks={navdata} />
        {children}
        {/* {blocks.map((block: any, ind: Number) => (
          <Block key={JSON.stringify(block)} content={block} />
        ))} */}
        {blocks.map((block: any, ind: number) => {
          switch (block.type) {
            case "collection_full": {
              return (
                <ProductList
                  key={JSON.stringify(block)}
                  collection={block.collection}
                  heading={block.heading}
                  className={block.className}
                  products={block.collection.products}
                  config={block.config}
                />
              );
            }
            case "product_card": {
              return (
                <ProductCardAlt
                  key={JSON.stringify(block)}
                  product={block.product}
                  recommendedProducts={block.recommendedProducts}
                />
              );
            }
            default: {
              return <Block key={JSON.stringify(block)} content={block} />;
            }
          }
        })}
      </main>

      <footer className={styles.footer}></footer>
    </>
  );
};

export default Page;
