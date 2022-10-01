import { useState } from "react"; // import state
import Link from "next/link";
import Cart from "./Cart";
import Block from "../components/Block";
import HomeIcon from "../components/icons/Home";
import Home from "../pages";

interface HeaderProps {
  blocks: any;
}
export default function Header({ blocks }: HeaderProps) {
  // console.log("nav blocks", blocks);
  const [isNavOpen, setIsNavOpen] = useState(false); // initiate isNavOpen state with false

  return (
    <div className="w-full">
      <nav className="w-full p-4 border-b-2 lg:flex lg:justify-end">
        <section className="MOBILE-MENU flex items-center justify-around w-full lg:hidden">
          <div
            className="HAMBURGER-ICON space-y-2"
            onClick={() => setIsNavOpen((prev) => !prev)} // toggle isNavOpen state on click
          >
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
          </div>
          <Link href="/">
            <a>
              <HomeIcon />
            </a>
          </Link>
          <Cart />

          <div
            className={
              isNavOpen ? "showMenuNav bg-black" : "hideMenuNav bg-black"
            }
          >
            <div
              className="CROSS-ICON absolute top-0 right-0 px-8 py-8"
              onClick={() => setIsNavOpen(false)} // change isNavOpen state to false to close the menu
            >
              <svg
                className="h-8 w-8 text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
            {blocks.map((b: any) => (
              <Block key={JSON.stringify(b)} content={b} />
            ))}
            <ul className="flex flex-col items-center justify-between min-h-[250px]">
              <li className="border-b border-gray-400 my-8 uppercase">
                <Link href="/">
                  <a>Home</a>
                </Link>
              </li>
              <li className="border-b border-gray-400 my-8 uppercase">
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </div>
        </section>

        <ul className="DESKTOP-MENU hidden space-x-8 lg:flex">
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
          <li>
            <Cart />
          </li>
        </ul>
      </nav>
      <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        position: absolute;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      }
    `}</style>
    </div>
  );
}
