import type { AppProps } from "next/app";
import React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { load } from "fathom-client";
import { IconContext } from "react-icons";
import { appWithTranslation } from "next-i18next";
import "emoji-mart/css/emoji-mart.css";

import { FATHOM_SITE_ID, IS_PROD } from "../lib/constants";

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
    if (IS_PROD) {
      load(FATHOM_SITE_ID, {
        url: "https://warbler.resumebuilder.dev/script.js",
        includedDomains: ["resumebuilder.dev", "www.resumebuilder.dev"],
      });
    }
  }, []);
  return (
    <ChakraProvider theme={THEME}>
      <ErrorBoundary>
        <IconContext.Provider value={{ size: "16" }}>
          <Component {...pageProps} />
        </IconContext.Provider>
      </ErrorBoundary>
    </ChakraProvider>
  );
}

export default appWithTranslation(App);
