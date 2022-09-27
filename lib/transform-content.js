import {
  getCollections,
  getProducts,
  getProduct,
  getCollectionByHandle,
  getRelatedProducts,
} from "./callShopify";
import { getFile } from "../lib/uploadcareClient";

export default async function transformContent(sections) {
  // Shopify graphql search queries
  const createQuery = (collectionTitles) =>
    collectionTitles.map((c) => `title:"${c}"`).join(" OR ");
  const createTagsQuery = (tags) => tags.map((t) => `tag:"${t}"`).join(" OR ");

  const getBlurData = async (url, type) => {
    let response = await fetch(url).then((r) => r);
    const buffer = await response.arrayBuffer();
    return "data:" + type + ";base64," + Buffer.from(buffer).toString("base64");
  };

  const getContent = (sections) => {
    const contentPromises = sections.map(async (section) => {
      switch (section.type) {
        case "image_banner": {
          const file = await getFile(section.imageUuid);
          const blurDataURL = await getBlurData(
            `https://ucarecdn.com/${file.uuid}/-/preview/10x10/`,
            file.mimeType
          );
          return {
            ...section,
            image: { ...file, blurDataURL },
          };
        }
        case "image": {
          const file = await getFile(section.imageUuid);
          const blurDataURL = await getBlurData(
            `https://ucarecdn.com/${file.uuid}/-/preview/10x10/`,
            file.mimeType
          );
          return {
            ...section,
            image: { ...file, ...section.image, blurDataURL },
          };
        }
        case "collection_list": {
          return {
            ...section,
            collections: await getCollections({
              first: section.collections.length,
              query: createQuery(section.collections),
            }),
          };
        }
        case "product_list_by_tags": {
          return {
            ...section,
            products: await getProducts({
              first: 20,
              query: createTagsQuery(section.tags),
            }),
          };
        }
        case "product_card": {
          // console.log("in product card");
          const product = await getProduct(section.handle);
          const recommendedProducts = await getRelatedProducts(product.id);
          return {
            ...section,
            product,
            recommendedProducts,
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

  return await getContent(sections);
}
