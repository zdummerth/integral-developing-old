import { getCollections, getCollectionByHandle } from "./callShopify";

const navdata = [
  {
    type: "div",
    className: "",
    children: [
      {
        type: "collection_list",
        collections: ["T-Shirts", "Sweatshirts", "Headwear", "Women"],
        config: {
          enlarge_first: false,
          action: "basic",
          list_container: 'flex flex-wrap w-full p-2 gap-2 justify-center',
          child: 'relative flex-shrink-0 flex flex-col items-center group',
          title: '',
          img_container: 'relative w-20 h-20 rounded-full overflow-hidden border'
        },
      },
    ],
  },
];

export default async function getNavData() {
  // Shopify graphql search queries
  const createQuery = (collectionTitles) =>
    collectionTitles.map((c) => `title:"${c}"`).join(" OR ");

  const getContent = (sections) => {
    const contentPromises = sections.map(async (section) => {
      switch (section.type) {
        case "collection_list": {
          return {
            ...section,
            collections: await getCollections({
              first: section.collections.length,
              query: createQuery(section.collections),
            }),
          };
        }
        case "collection_full": {
          return {
            ...section,
            collection: await getCollectionByHandle({
              first: 100,
              handle: section.collection,
            }),
          };
        }
        default: {
          if (section.children) {
            return {
              ...section,
              children: await getContent(section.children),
            };
          }
          return section;
        }
      }
    });
    return Promise.all(contentPromises);
  };

  return await getContent(navdata);
}
