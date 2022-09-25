import CollectionList from "../components/products/CollectionList";
import ProductList from "../components/products/ProductList";
import ProductCard from "../components/products/ProductCard";
import Text from "../components/Text";
import Block from "../components/Block";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "../components/Navigation";

interface PageProps {
  sections: any;
  blocks: any;
  title?: string;
  description?: string;
  children?: JSX.Element;
}
const Page = ({
  sections = [],
  blocks = [],
  title = "Title",
  description = "Page Description",
  children,
}: PageProps) => {
  // console.log(bannerImg);
  return (
    <>
      <Head>
        <title>{`Dark Ace Disc Golf | ${title}`}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        className={`${styles.main} bg-zinc-900 text-white max-w-6xl mx-auto flex flex-col items-center`}
      >
        <Header />
        {children}
        {blocks.map((block: any, ind: Number) => (
          <Block key={JSON.stringify(block)} content={block} />
        ))}
        {/* {sections.map((section: any, ind: number) => {
          switch (section.name) {
            case "collection_list": {
              return (
                <CollectionList
                  key={ind}
                  collections={section.collections}
                  config={section.config}
                />
              );
            }
            case "product_list_by_tags": {
              return (
                <ProductList
                  key={ind}
                  collection={section.collection}
                  heading={section.heading}
                  className={section.className}
                  products={section.products}
                  config={section.config}
                />
              );
            }
            case "collection_full": {
              return (
                <ProductList
                  key={ind}
                  collection={section.collection}
                  heading={section.heading}
                  className={section.className}
                  products={section.collection.products}
                  config={section.config}
                />
              );
            }
            case "product_card": {
              return (
                <ProductCard
                  key={ind + section.product.title}
                  product={section.product}
                  recommendedProducts={section.recommendedProducts}
                />
              );
            }
            case "text": {
              return <Text key={ind} content={section.content} />;
            }
            case "image_banner": {
              return (
                <div key={ind} className="relative w-full">
                  <Image
                    src={section.image.originalFileUrl}
                    width={section.image.contentInfo.image.width}
                    height={section.image.contentInfo.image.height}
                    alt="Vercel Logo"
                    blurDataURL={section.image.blurDataURL}
                    placeholder="blur"
                    layout="responsive"
                  />
                </div>
              );
            }
            default: {
              return <div key={ind}>Unable to find section</div>;
            }
          }
        })} */}
      </main>

      <footer className={styles.footer}></footer>
    </>
  );
};

export default Page;
