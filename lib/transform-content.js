import { getCollections, getProducts } from "./callShopify";
import { getFile } from "../lib/uploadcareClient";

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

  const allImageUuids = sections
    .filter((section) => section.name === "image_banner")
    .map((section) => section.imageUuid);

  const uniqueCollections = [...new Set(allCollections)];
  const uniqueProductTags = [...new Set(allProductTags)];

  let collectionData = null;
  let productData = null;
  let imageData = null;

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

  if (allImageUuids.length > 0) {
    const getBlurData = async (url, type) => {
      let response = await fetch(url).then((r) => r);
      const buffer = await response.arrayBuffer();
      return (
        "data:" + type + ";base64," + Buffer.from(buffer).toString("base64")
      );
    };
    const allImages = (ids) => {
      const promises = ids.map(async (id) => {
        const file = await getFile(id);
        const blurDataURL = await getBlurData(
          `https://ucarecdn.com/${file.uuid}/-/preview/10x10/`,
          file.mimeType
        );
        return {
          ...file,
          blurDataURL,
        };
      });
      return Promise.all(promises);
    };
    imageData = await allImages(allImageUuids);
  }

  const transformed = sections.map((section) => {
    switch (section.name) {
      case "image_banner": {
        return {
          ...section,
          image: imageData.find(
            (imgdata) => imgdata.uuid === section.imageUuid
          ),
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
