import Head from "next/head";

interface Props {
  title: string;
  description: string;
}
const Seo = ({ title = "Title", description = "Page Description" }: Props) => {
  // console.log(bannerImg);
  return (
    <Head>
      <title>{`Integral Developing | ${title}`}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/logo.png" />
    </Head>
  );
};

export default Seo;
