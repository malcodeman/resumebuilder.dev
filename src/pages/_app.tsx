import type { AppProps } from "next/app";
import React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { IconContext } from "react-icons";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { NextIntlClientProvider } from "next-intl";
import { useRouter } from "next/router";
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
  const router = useRouter();

  return (
    <ChakraProvider theme={THEME}>
      <ErrorBoundary>
        <IconContext.Provider value={{ size: "16" }}>
          <NextIntlClientProvider
            locale={router.locale}
            timeZone="Europe/Berlin"
            messages={pageProps.messages}
          >
            <Component {...pageProps} />
            <Analytics />
            <SpeedInsights />
          </NextIntlClientProvider>
        </IconContext.Provider>
      </ErrorBoundary>
    </ChakraProvider>
  );
}

export default App;
