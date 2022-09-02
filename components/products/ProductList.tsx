import Image from "next/image";
import Link from "next/link";

const getStyles = ({
  enlarge_first,
  action,
}: {
  enlarge_first?: boolean;
  action: string;
}) => {
  const x_scroll = {
    container: `flex overflow-auto w-full p-2 sm:hidden`,
    child: `relative flex-shrink-0 mr-2 flex flex-col items-center group`,
    img_container: `relative w-20 h-20 rounded-full overflow-hidden border`,
    title: `w-full text-center w-24`,
  };

  const basic_grid = {
    container: `w-full max-w-5xl p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2`,
    child: `relative aspect-[1/1] flex flex-col items-center group border`,
    img_container: `relative w-full h-full`,
    title: `w-full text-center`,
  };

  const standard = {
    container: `w-full max-w-5xl p-4 grid grid-cols-9 gap-2`,
    child: `relative border group bg-black aspect-[1/1] col-span-full sm:col-span-3 sm:row-span-3 hover:cursor-pointer
      ${enlarge_first && `first:sm:col-span-6 first:sm:row-span-6`}
      `,
    img_container: `relative w-full h-full`,
    title: `absolute bottom-0 bg-black/50 text-white w-full p-6 text-lg group-hover:text-xl group-hover:bg-purple-900/75`,
  };

  const x_scroll_then_grid = {
    container: `w-full max-w-5xl p-4 flex overflow-auto sm:grid sm:grid-cols-2 lg:grid-cols-5 sm:gap-2`,
    child: `relative border group bg-black flex-shrink-0 w-64 h-64 sm:h-auto sm:w-auto sm:aspect-[1/1] mr-2 sm:mr-0 hover:cursor-pointer
      ${enlarge_first && `first:sm:col-span-6 first:sm:row-span-6`}
      `,
    img_container: `relative w-full h-full`,
    title: `absolute bottom-0 bg-black/50 text-white w-full p-6 text-lg group-hover:text-xl group-hover:bg-purple-900/75`,
  };

  switch (action) {
    case "x_scroll": {
      return x_scroll;
    }
    case "basic_grid": {
      return basic_grid;
    }
    case "standard": {
      return standard;
    }
    case "x_scroll_then_grid": {
      return x_scroll_then_grid;
    }
    default: {
      return standard;
    }
  }
};

function Product({ product, config }: { product: any; config: any }) {
  return (
    <Link href={`/product/${product.handle}`}>
      <a className={config.child}>
        <div className={config.img_container}>
          {product.featuredImage && (
            <Image
              src={product.featuredImage.src}
              alt={product.title}
              layout="fill"
              objectFit="contain"
              className="group-hover:scale-110 transition-all duration-300"
            />
          )}
        </div>
        <div className={config.title}>{product.title}</div>
        <div>{product.price}</div>
      </a>
    </Link>
  );
}

export default function ProductList({
  products,
  config,
  collection,
}: // config,
{
  products: any;
  config?: any;
  collection: any;
}) {
  const styles = getStyles(config);
  return (
    <>
      <h1>{collection.title}</h1>
      <div className={styles.container}>
        {products.map((c: any, ind: number) => (
          <Product key={c.id} product={c} config={styles} />
        ))}
      </div>
    </>
  );
}
