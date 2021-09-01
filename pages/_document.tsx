import Document, { Html, Head, Main, NextScript } from "next/document";
import { ColorModeScript } from "@chakra-ui/react";

import theme from "../theme";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head lang="en">
          <link rel="icon" href="/favicon.ico" />
          <meta charSet="utf-8" />
          <meta
            name="og:description"
            content="resumebuilder.dev - resume builder for developers"
          />
          <meta
            name="description"
            content="resumebuilder.dev - resume builder for developers"
          />
          <meta property="og:image" content="opengraph.png"></meta>
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
