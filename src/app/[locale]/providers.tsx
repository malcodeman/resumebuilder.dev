"use client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

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

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={THEME}>
      {children}
      <Analytics />
      <SpeedInsights />
    </ChakraProvider>
  );
}

export default Providers;
