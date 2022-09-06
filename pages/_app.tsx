import "../styles/globals.css";
import type { AppProps } from "next/app";
import CartContextProvider from "../context/CartContextProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartContextProvider>
      <ToastContainer position="top-center" theme="dark" />
      <Component {...pageProps} />
    </CartContextProvider>
  );
}

export default MyApp;
