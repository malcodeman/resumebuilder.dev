import type { AppProps } from "next/app";
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { load } from "fathom-client";
import "emoji-mart/css/emoji-mart.css";

import { FATHOM_SITE_ID } from "../lib/constants";

function App({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    load(FATHOM_SITE_ID, {
      url: "https://warbler.resumebuilder.dev/script.js",
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
