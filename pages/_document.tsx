import Document, { Html, Head, Main, NextScript } from "next/document";
import { ColorModeScript } from "@chakra-ui/react";

import theme from "../theme";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <link rel="manifest" href="/manifest.json" />
          <meta charSet="utf-8" />
          <meta
            name="og:description"
            content="resumebuilder.dev - free resume builder for developers"
          />
          <meta
            name="description"
            content="resumebuilder.dev - free resume builder for developers"
          />
          <meta property="og:image" content="opengraph/index.png"></meta>
        </Head>
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <div id="root" />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
