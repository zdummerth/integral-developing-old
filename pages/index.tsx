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

  const content = await transformContent(pageData.sections);
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
