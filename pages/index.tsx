import type { GetStaticProps } from "next";
import transformContent from "../lib/transform-content";
import { getPageByHandle } from "../lib/callFauna";
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

export const getStaticProps: GetStaticProps = async () => {
  const seo = {
    title: "Home",
    description: "Welcome to the disc market",
  };

  const pageData: any = await getPageByHandle({ handle: "/" });

  const testsections = [
    {
      type: "div",
      className: "relative w-full h-screen",
      children: [
        {
          type: "image",
          imageUuid: "9aa25d06-95bf-4de5-beeb-9ac8f5fac3fe",
          image: {
            alttext: "Disc Market Background Image",
            objectFit: "cover",
            layout: "fill",
          },
          wrapperClassName: "relative w-full h-full",
        },
        {
          type: "div",
          className: "bg-black/60 w-full h-full absolute top-0 left-0 z-10",
          children: [
            {
              type: "h1",
              // value: "The Disc Market",
              className:
                "absolute top-[15%] left-10 text-5xl font-serif md:left-1/4",
              children: [
                {
                  type: "span",
                  className: "block drop-shadow shadow-red-900",
                  value: "The",
                },
                {
                  type: "span",
                  className: "block",
                  value: "Disc",
                },
                {
                  type: "span",
                  className: "block",
                  value: "Market",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "div",
      className:
        "w-full flex items-center flex-col md:flex-row md:justify-center py-8",
      children: [
        {
          type: "image",
          imageUuid: "fd3431aa-386f-4f77-ae4e-4b1639f75c87",
          image: {
            alttext: "Disc Market Logo",
            objectFit: "contain",
            layout: "responsive",
          },
          wrapperClassName: "relative w-48",
        },
        {
          type: "div",
          className: "w-full text-center max-w-2xl p-4",
          children: [
            {
              type: "h3",
              value: "Community and Sustainability",
              className: "text-xl my-2 font-serif",
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
      className: "w-full py-8 px-2 bg-gradient-to-br from-black to-stone-800",
      children: [
        {
          type: "h2",
          value: "Featured Products",
          className: "text-2xl py-4",
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

  const content = await transformContent(testsections);
  // const content = await transformContent(pageData.sections);
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
