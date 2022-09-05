import type { AppProps } from "next/app";
import React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { load } from "fathom-client";
import "emoji-mart/css/emoji-mart.css";

import { FATHOM_SITE_ID } from "../lib/constants";

import ErrorBoundary from "../components/misc/ErrorBoundary";

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
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </ChakraProvider>
  );
}

export default App;
