import type { GetStaticProps } from "next";
import transformContent from "../lib/transform-content";
import getNavData from "../lib/get-navigation-data";
import Page from "../components/Page";

const Home = (props: any) => {
  // console.log(props);
  return (
    <div className="">
      <Page
        blocks={props.sections}
        navdata={props.navdata}
        title={props.seo.title}
        description={props.seo.description}
      />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const sections = [
    {
      type: "div",
      className:
        "w-full md:flex md:items-center bg-gradient-to-br from-black via-black to-emerald-500",
      children: [
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
        {
          type: "div",
          className: "w-full text-center max-w-2xl p-4",
          children: [
            {
              type: "h1",
              value: "The Disc Market",
              className: "text-3xl",
            },
            {
              type: "h3",
              value: "Community and Sustainability",
              className: "text-xl my-2",
            },
            {
              type: "p",
              value:
                "At The Disc Market, we believe in giving back to the communities that provide so much to the game of disc golf. That is why 75% of all profits are donated to local clubs and new course development.",
              className: "my-2",
            },
            {
              type: "p",
              value:
                "We also strive to make our products in the most sustainable way possible. We do this by creating products on demand and using organic or recycled material for our apparel.",
            },
          ],
        },
      ],
    },
    {
      type: "div",
      className: "w-full my-8 p-2",
      children: [
        {
          type: "h2",
          value: "Featured Products",
          className: "text-2xl",
        },
        {
          type: "product_list_by_tags",
          tags: ["Featured"],
          config: {
            enlarge_first: "false",
            action: "standard",
          },
        },
      ],
    },
  ];

  const seo = {
    title: "Home",
    description: "Welcome to the disc market",
  };

  const content = await transformContent(sections);
  const navdata = await getNavData();

  return {
    props: {
      sections: content,
      navdata,
      seo,
    },
  };
};

export default Home;
