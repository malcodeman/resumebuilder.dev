import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import "emoji-mart/css/emoji-mart.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default App;
