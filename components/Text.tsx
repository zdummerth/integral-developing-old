import React from "react";

export default function Text({ content }: { content: any }) {
  const Children = ({ childarray }: any): any =>
    childarray.map((child: any, ind: Number) => {
      return (
        <Text key={ind + child.value ? child.value : ""} content={child} />
      );
    });

  //   console.log(content);
  switch (content.type) {
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
    default:
      return null;
  }
}
