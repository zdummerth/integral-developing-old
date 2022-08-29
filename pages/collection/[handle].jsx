import { storefrontClient } from "lib/callShopify";
import Head from "next/head";
import ProductCard from "components/products/ProductCard";

function Product({ collection }) {
  console.log({ collection });
  return (
    <div>
      <Head>
        {/* <title>{product.title} | Disc Market</title> */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="std-div">
        {/* <ProductCard product={product} showVariantPicker={true} /> */}
      </main>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  // console.log(params.id)

  const response = await storefrontClient.query({
    data: {
      query: `query getCollectionByHandle($handle: String!) {
        collectionByHandle(handle: $handle) {
          id
          handle
          title
          products {
            edges {
              node {
                id
                title
                handle
                featuredImage {
                  altText
                  height
                  id
                  src
                  width
                }
              }
            }
          }
      }`,
      variables: {
        handle: params.handle,
      },
    },
  });

  return {
    props: { collection: response.body.data.collectionByHandle },
  };
}

export default Product;
