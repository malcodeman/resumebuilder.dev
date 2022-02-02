import type { AppProps } from "next/app";
import React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { load } from "fathom-client";
import "emoji-mart/css/emoji-mart.css";

import { FATHOM_SITE_ID } from "../lib/constants";

const THEME = extendTheme({
  styles: {
    global: {
      html: {
        scrollbarWidth: "thin",
      },
      "html::-webkit-scrollbar": {
        width: "8px",
      },
      "html::-webkit-scrollbar-thumb": {
        backgroundColor: "#72757b",
      },
    },
  },
});

function App({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    load(FATHOM_SITE_ID, {
      url: "https://warbler.resumebuilder.dev/script.js",
      includedDomains: ["resumebuilder.dev", "www.resumebuilder.dev"],
    });
  }, []);
  return (
    <ChakraProvider theme={THEME}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default App;
