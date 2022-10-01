import React from "react";
import Image from "next/image";
import Link from "next/link";
import ProductList from "./products/ProductList";
import CollectionList from "../components/products/CollectionList";
import Form from "../components/forms/Form";

export default function Block({ content }: { content: any }) {
  // console.log(content);
  const Children = ({ childarray }: any): any =>
    childarray.map((child: any, ind: Number) => {
      return <Block key={JSON.stringify(child)} content={child} />;
    });

  // console.log(content);
  switch (content.type) {
    case "frag":
      return (
        <>{content.children && <Children childarray={content.children} />}</>
      );
    case "div":
      return (
        <div className={content.className}>
          {content.value && content.value}
          {content.children && <Children childarray={content.children} />}
        </div>
      );
    case "h1":
      return (
        <h1 className={content.className}>
          {content.value && content.value}
          {content.children && <Children childarray={content.children} />}
        </h1>
      );
    case "h2":
      return (
        <h2 className={content.className}>
          {content.value && content.value}
          {content.children && <Children childarray={content.children} />}
        </h2>
      );
    case "h3":
      return (
        <h3 className={content.className}>
          {content.value && content.value}
          {content.children && <Children childarray={content.children} />}
        </h3>
      );
    case "p":
      return (
        <p className={content.className}>
          {content.value && content.value}
          {content.children && <Children childarray={content.children} />}
        </p>
      );
    case "ul":
      return (
        <ul className={content.className}>
          {content.value && content.value}
          {content.children && <Children childarray={content.children} />}
        </ul>
      );
    case "ol":
      return (
        <ol className={content.className}>
          {content.value && content.value}
          {content.children && <Children childarray={content.children} />}
        </ol>
      );
    case "li":
      return (
        <li className={content.className}>
          {content.value && content.value}
          {content.children && <Children childarray={content.children} />}
        </li>
      );
    case "image":
      return (
        <div className={content.wrapperClassName}>
          <Image
            src={content.image.originalFileUrl}
            width={content.image.contentInfo.image.width}
            height={content.image.contentInfo.image.height}
            alt={content.image.altText}
            blurDataURL={content.image.blurDataURL}
            placeholder="blur"
            layout={content.image.layout}
            objectFit={content.image.objectFit}
          />
        </div>
      );
    case "product_list_by_tags": {
      return (
        <ProductList
          key={JSON.stringify(content)}
          collection={content.collection}
          heading={content.heading}
          className={content.className}
          products={content.products}
          config={content.config}
        />
      );
    }
    case "collection_list": {
      return (
        <CollectionList
          key={JSON.stringify(content)}
          collections={content.collections}
          config={content.config}
        />
      );
    }
    case "collection_full": {
      return (
        <ProductList
          key={JSON.stringify(content)}
          collection={content.collection}
          heading={content.heading}
          className={content.className}
          products={content.collection.products}
          config={content.config}
        />
      );
    }
    case "form": {
      return <Form key={JSON.stringify(content)} inputs={content.inputs} />;
    }
    default:
      // console.log("in default block: ", content);
      return null;
  }
}
