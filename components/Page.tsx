import CollectionList from "../components/products/CollectionList";
import ProductList from "../components/products/ProductList";
import ProductCard from "../components/products/ProductCard";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "../components/Navigation";
// import bannerImg from "../public/banners/banner-hearse-purple.jpg";
import { AnyTxtRecord } from "dns";

interface PageProps {
  sections: any;
  title?: string;
  description?: string;
  children?: JSX.Element;
}
const Page = ({
  sections = [],
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
        {sections.map((section: any, ind: number) => {
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
            case "product_card": {
              return (
                <ProductCard
                  key={ind + section.product.title}
                  product={section.product}
                />
              );
            }
            case "image_banner": {
              return (
                <div key={ind} className="relative w-full">
                  <Image
                    src={section.image}
                    alt="Vercel Logo"
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
        })}
      </main>

      <footer className={styles.footer}></footer>
    </>
  );
};

export default Page;
