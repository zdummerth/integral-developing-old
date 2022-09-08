import { getCollections, getProducts } from "./callShopify";

export default async function transformContent(sections) {
  const createQuery = (collectionTitles) =>
    collectionTitles.map((c) => `title:"${c}"`).join(" OR ");

  const createTagsQuery = (tags) => tags.map((t) => `tag:"${t}"`).join(" OR ");

  const allProductTags = sections
    .filter((section) => section.name === "product_list_by_tags")
    .map((section) => section.tags)
    .flat();

  const allCollections = sections
    .filter((section) => section.collections)
    .map((section) => section.collections)
    .flat();

  const uniqueCollections = [...new Set(allCollections)];
  const uniqueProductTags = [...new Set(allProductTags)];

  let collectionData = null;
  let productData = null;

  if (uniqueCollections.length > 0) {
    collectionData = await getCollections({
      first: uniqueCollections.length,
      query: createQuery(uniqueCollections),
    });
  }

  if (uniqueProductTags.length > 0) {
    productData = await getProducts({
      first: 20,
      query: createTagsQuery(uniqueProductTags),
    });
  }
  const transformed = sections.map((section) => {
    switch (section.name) {
      case "image_banner": {
        return {
          ...section,
          image: require(`../public/${section.image}`).default,
        };
      }
      case "collection_list": {
        return {
          ...section,
          collections: section.collections.map((c) =>
            collectionData.find((cd) => cd.title === c)
          ),
        };
      }
      case "product_list_by_tags": {
        return {
          ...section,
          products: productData,
          // // collection: section.collections.map((c) =>
          // //   cwp.find((cd) => cd.title === c)
          // // ),
          // collectionsWithProducts: cwp ? cwp : null,
          // response,
        };
      }
    }
  });
  return transformed;
}
