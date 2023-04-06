import type { GetStaticProps } from "next";
import Seo from "../components/Seo";
import Image from "next/image";
import logoImg from "../public/id-logo.png";
import keyboardImg from "../public/keyboard.jpg";
import daLogoImg from "../public/da-logo.png";
import dmLogoImg from "../public/dm-logo.png";
import moneyImg from "../public/money-map.jpg";
import ExternalLink from "../components/icons/ExternalLink";
import { motion } from "framer-motion";

interface PageProps {
  title: string;
  description: string;
}

interface LinkProps {
  label: string;
  href: string;
}
const StyledLink = (props: LinkProps) => (
  <a
    className="flex rounded p-2 my-2 bg-gradient-to-b from-transparent to-[#00ff3aff]"
    href={props.href}
  >
    <span className="pr-2">{props.label}</span>
    <ExternalLink />
  </a>
);

const Home = (props: PageProps) => {
  return (
    <>
      <Seo title={props.title} description={props.description} />
      <div className="relative w-screen h-screen max-w-[1800px] flex flex-col items-center justify-center">
        <h1 className="flex flex-col items-center justify-center absolute w-1/2 z-20">
          <motion.div
            initial={{ rotate: 360 }}
            animate={{ rotate: 0 }}
            // transition={{ duration: 5 }}
            whileHover={{
              scale: 1.2,
              transition: { duration: 0.5 },
            }}
            className="text-center"
          >
            <div className="text-4xl font-serif">Integral</div>
            <div className="text-4xl font-serif mb-4">Developing</div>
            <span className="relative w-full max-w-[500px]">
              <Image
                src={logoImg}
                placeholder="blur"
                alt="Integral Developing Logo"
                layout="responsive"
                priority
              />
            </span>
          </motion.div>
        </h1>
        <div className="bg-gradient-to-b from-transparent to-[#00ff3aff]/50 absolute w-full h-full top-0 left-0 z-10" />
        <Image
          src={keyboardImg}
          placeholder="blur"
          alt="Keyboard Background Image"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="py-4 text-center w-full">
        <h2 className="text-2xl">Our Projects</h2>

        <h3 className="text-xl underline py-4 my-4">Finance</h3>
        <span className="block relative w-3/4 mx-auto">
          <Image
            src={moneyImg}
            placeholder="blur"
            alt="Spending Tracker Logo"
            layout="responsive"
          />
          <h4>Spending Tracker</h4>
          <div className="flex justify-between">
            <StyledLink label={"View Site"} href="/" />
            <StyledLink label={"View Github"} href="/" />
          </div>
        </span>

        <h3 className="text-xl underline py-4 my-4">Ecommerce</h3>
        <div className="grid grid-cols-1 gap-4 justify-items-center md:grid-cols-2">
          <span className="block relative w-3/4">
            <Image
              src={daLogoImg}
              placeholder="blur"
              alt="Dark Ace Logo"
              layout="responsive"
            />
            <h4>{"Dark Ace Disc Golf (Shopify)"}</h4>
            <div className="flex justify-center">
              <StyledLink
                label={"View Site"}
                href="https://darkacediscgolf.com/"
              />
            </div>
          </span>
          <span className="relative w-3/4">
            <div className="relative bg-white/50">
              <Image
                src={dmLogoImg}
                placeholder="blur"
                alt="Disc Market Logo"
                layout="responsive"
              />
            </div>
            <h4>{"The Disc Market (Next JS)"}</h4>
            <div className="flex justify-between">
              <StyledLink
                label={"View Site"}
                href="https://www.thediscmarket.com/"
              />
              <StyledLink label={"View Github"} href="/" />
            </div>
          </span>
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const seo = {
    title: "Home",
    description: "Welcome to Integral Developing",
  };

  return {
    props: {
      seo,
    },
  };
};

export default Home;
