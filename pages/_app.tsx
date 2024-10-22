// pages/_app.tsx
import type { AppProps } from "next/app";
import {
  ThirdwebProvider,
  embeddedWallet,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  smartWallet,
} from "@thirdweb-dev/react";
import "../styles/globals.css";
import Navbar from "../components/navbar";
import Header from "../components/header";
import { Sepolia } from "@thirdweb-dev/chains";

const activeChain = Sepolia;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
      activeChain={activeChain}
      supportedWallets={[
        smartWallet(embeddedWallet(), {
          factoryAddress: process.env.NEXT_PUBLIC_FACTORY_ADDRESS || "",
          gasless: true,
        }),
        metamaskWallet(),
        coinbaseWallet(),
        walletConnect(),
      ]}
    >
      <Header />
      <Component {...pageProps} />
      <Navbar />
    </ThirdwebProvider>
  );
}

export default MyApp;