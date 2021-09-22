import type { AppProps } from "next/app";
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import * as Fathom from "fathom-client";
import "emoji-mart/css/emoji-mart.css";

function App({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    Fathom.load(process.env.NEXT_PUBLIC_FATHOM_SITE_ID, {
      includedDomains: ["resumebuilder.dev", "www.resumebuilder.dev"],
    });
  }, []);
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default App;
