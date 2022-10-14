import Mail from "../components/icons/Mail";
import Phone from "../components/icons/Phone";
import fbLogo from "../public/fb-logo.png";
import Image from "next/image";

interface Props {
  children: JSX.Element[];
}
const Layout = ({ children }: Props) => {
  return (
    <>
      <main className="bg-black min-h-screen text-white flex flex-col items-center">
        {children}
      </main>
      <footer className="bg-zinc-900 text-white py-4 text-center">
        <h3 className="py-4">Contact Us</h3>
        <div className="flex flex-col items-center pb-4">
          <Phone />
          <div>{"(314) 675-0275"}</div>
        </div>
        <div className="flex flex-col items-center py-2">
          <Mail />
          <div>{"captain@integraldeveloping.com"}</div>
        </div>
        <a
          href="https://www.facebook.com/profile.php?id=100086905265661"
          className="block my-4"
        >
          <Image
            src={fbLogo}
            placeholder="blur"
            width={40}
            height={40}
            alt="Facebook Logo"
          />
        </a>
      </footer>
    </>
  );
};

export default Layout;
