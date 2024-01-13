import type { AppProps } from "next/app";
import React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { IconContext } from "react-icons";
import { appWithTranslation } from "next-i18next";
import { Analytics } from "@vercel/analytics/react";
import "emoji-mart/css/emoji-mart.css";

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
  return (
    <ChakraProvider theme={THEME}>
      <ErrorBoundary>
        <IconContext.Provider value={{ size: "16" }}>
          <Component {...pageProps} />
          <Analytics />
        </IconContext.Provider>
      </ErrorBoundary>
    </ChakraProvider>
  );
}

export default appWithTranslation(App);
