import Image from "next/image";
function Collection({ collection, index }: { collection: any; index: number }) {
  return (
    <div
      className={` 
        relative 
        border 
        bg-black
        aspect-[1/1]
        sm:aspect-[1/1]
        col-span-full
        sm:col-span-3
        sm:row-span-3
        first:sm:col-span-6
        first:sm:row-span-6
        group
        hover:cursor-pointer
      `}
    >
      {collection.image && (
        <Image
          src={collection.image.src}
          alt={collection.title}
          layout="fill"
          objectFit="cover"
          className="group-hover:scale-110 transition-all duration-300"
        />
      )}

      <div className="absolute bottom-0 bg-black/50 text-white w-full p-6 text-lg group-hover:text-xl group-hover:bg-purple-900/75">
        {collection.title}
      </div>
    </div>
  );
}

export default function CollectionList({ collections }: { collections: any }) {
  const h_scroll = true;
  const cl = h_scroll ? `` : ``;
  const cn = `
    w-full 
    max-w-5xl 
    p-4 
    grid
    grid-flow-dense
    grid-cols-9
    gap-2
  `;
  return (
    <>
      <div className={cn}>
        {collections.map((c: any, ind: number) => (
          <Collection key={c.id} collection={c} index={ind} />
        ))}
      </div>
    </>
  );
}
