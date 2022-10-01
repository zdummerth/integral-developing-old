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

  const basic = {
    container: `flex flex-wrap w-full p-2 justify-center`,
    child: `relative flex-shrink-0 mr-2 flex flex-col items-center group`,
    img_container: `relative w-20 h-20 rounded-full overflow-hidden border`,
    title: `w-full text-center w-24`,
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

  const flex = {
    container: `w-full max-w-2xl p-4 flex justify-center`,
    child: `relative border group bg-black w-full aspect-[1/1] sm:w-96 hover:cursor-pointer`,
    img_container: `relative w-full h-full`,
    title: `absolute bottom-0 bg-black/50 text-white w-full p-6 text-lg group-hover:text-xl group-hover:bg-purple-900/75`,
  };

  switch (action) {
    case "x_scroll": {
      return x_scroll;
    }
    case "basic": {
      return basic;
    }
    case "standard": {
      return standard;
    }
    case "x_scroll_then_grid": {
      return x_scroll_then_grid;
    }
    case "flex": {
      return flex;
    }
    default: {
      return standard;
    }
  }
};

function Collection({ collection, config }: { collection: any; config: any }) {
  return (
    <Link href={`/collection/${collection.handle}`}>
      <a className={config.child}>
        <div className={config.img_container}>
          {collection.image && (
            <Image
              src={collection.image.src}
              alt={collection.title}
              layout="fill"
              objectFit="contain"
              className="group-hover:scale-110 transition-all duration-300"
            />
          )}
        </div>
        <div className={config.title}>{collection.title}</div>
      </a>
    </Link>
  );
}

export default function CollectionList({
  collections,
  config,
}: // config,
{
  collections: any;
  config?: any;
}) {
  // const styles = getStyles(config);
  return (
    <>
      <div className={config.list_container}>
        {collections.map((c: any, ind: number) => (
          <Collection key={c.id} collection={c} config={config} />
        ))}
      </div>
    </>
  );
}
