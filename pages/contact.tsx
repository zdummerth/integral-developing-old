import type { GetStaticProps } from "next";
import transformContent from "../lib/transform-content";
import getNavData from "../lib/get-navigation-data";
import Page from "../components/Page";

const Contact = (props: any) => {
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
      className: "w-full flex flex-col items-center max-w-[500px]",
      children: [
        {
          type: "div",
          className: "w-full flex items-center",
          children: [
            {
              type: "h1",
              value: "Contact Us",
              className: "font-serif text-2xl my-4",
            },
          ],
        },
        {
          type: "form",
          name: "contact",
          inputs: [
            {
              tag: "input",
              label: "Name",
              required: "Name is required",
              props: {
                type: "text",
                id: "name",
                className: "w-full rounded bg-black p-2",
              },
            },
            {
              tag: "input",
              label: "Email",
              required: true,
              props: {
                type: "email",
                id: "email",
                className: "w-full rounded bg-black p-2",
              },
            },
            {
              tag: "textarea",
              label: "Message",
              required: true,
              props: {
                type: "text",
                rows: "8",
                id: "message",
                className: "w-full rounded bg-black p-2",
              },
            },
          ],
        },
      ],
    },
  ];

  const seo = {
    title: "Contact",
    description: "Please contact us if you have any questions or concerns",
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

export default Contact;
