import Image from "next/image";
function Collection({ collection, index }: { collection: any; index: number }) {
  return (
    <div
      className={` 
        relative 
        border 
        col-span-full
        aspect-[1/1]
        bg-black
        sm:col-span-3
        sm:row-span-3
        first:sm:col-span-6
        first:sm:row-span-6
      `}
    >
      <Image
        src={collection.image.src}
        alt={collection.title}
        layout="fill"
        objectFit="cover"
      />
      <div className="absolute bottom-0 bg-black/50 text-white w-full p-6 text-lg">
        {collection.title}
      </div>
    </div>
  );
}

export default function CollectionList({ collections }: { collections: any }) {
  const cn = `
    w-full 
    max-w-5xl 
    p-4 
    grid
    grid-flow-col
    grid-flow-row
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
