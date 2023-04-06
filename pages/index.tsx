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
        <div className="text-center absolute z-20 w-full flex flex-col items-center justify-center">
          <motion.h1
            className="text-5xl lg:text-7xl"
            layout
            initial={{ textShadow: "0px 0px 0px #000", y: -100, opacity: 0 }}
            animate={{
              transition: { duration: 1.5, ease: "easeInOut" },
              opacity: 1,
              y: -20,
              textShadow: `0 1px 0 #000, 0 2px 0 #000, 0 3px 0 #000, 0 4px 0 #000, 0 5px 0 #000, 0 6px 0 #000, 0 7px 0 #000, 0 8px 0 #000, 0 9px 0 #000, 0 50px 30px rgba(0, 0, 0, 0.3)`,
            }}
          >
            <span className="font-serif mb-4 block">Integral</span>
            <span className="font-serif mb-8 block">Developing</span>
          </motion.h1>
          <motion.div
            className="relative w-3/4 max-w-[500px]"
            initial={{ opacity: 0, y: 100 }}
            layout
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 1.5,
                ease: "easeInOut",
              },
            }}
          >
            <Image
              src={logoImg}
              placeholder="blur"
              alt="Integral Developing Logo"
              priority
            />
          </motion.div>
        </div>
        <div className="bg-gradient-to-b from-transparent to-[#00ff3aff]/50 absolute w-full h-full top-0 left-0 z-10" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: 1.5, ease: "easeInOut", delay: 1.0 },
          }}
        >
          <Image
            src={keyboardImg}
            placeholder="blur"
            alt="Keyboard Background Image"
            layout="fill"
            objectFit="cover"
          />
        </motion.div>
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
