import type { GetStaticProps } from "next";
import transformContent from "../lib/transform-content";
import Page from "../components/Page";

const Home = (props: any) => {
  // console.log(props);
  return (
    <div className="">
      <Page
        sections={props.sections}
        blocks={props.sections}
        title={props.seo.title}
        description={props.seo.description}
      />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const sections = [
    {
      type: "image",
      imageUuid: "fd3431aa-386f-4f77-ae4e-4b1639f75c87",
      image: {
        alttext: "Disc Market Logo",
        objectFit: "contain",
        layout: "responsive",
      },
      wrapperClassName: "relative w-full",
    },

    // {
    //   type: "collection_list",
    //   collections: ["Dry-Fits", "T-Shirts", "Accessories"],
    //   config: {
    //     enlarge_first: true,
    //     action: "standard",
    //   },
    // },
    {
      type: "div",
      className: "text-center",
      children: [
        {
          type: "h1",
          value: "The Disc Market",
          className: "text-3xl",
        },
        {
          type: "h2",
          value: "This is what we are",
          className: "text-2xl",
        },
        {
          type: "ul",
          value: "",
          className: "list-disc",
          children: [
            {
              type: "li",
              value: "list item 1",
            },
            {
              type: "li",
              value: "list item 2",
            },
            {
              type: "li",
              value: "list item 3",
            },
          ],
        },
      ],
    },
  ];

  const seo = {
    title: "Home",
    description: "Welcome to the disc market",
  };

  const content = await transformContent(sections);

  return {
    props: {
      sections: content,
      seo,
    },
  };
};

export default Home;
