import Document, { Html, Head, Main, NextScript } from "next/document";
import { ColorModeScript } from "@chakra-ui/react";

import theme from "../theme";

const DESCRIPTION = "The fastest way to build your tech resume.";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <link rel="manifest" href="/manifest.json" />
          <meta charSet="utf-8" />
          <meta
            property="og:title"
            content="Free Resume Builder for Developers | resumebuilder.dev"
          />
          <meta name="og:description" content={DESCRIPTION} />
          <meta name="description" content={DESCRIPTION} />
          <meta property="og:image" content="opengraph/index.png"></meta>
          <meta property="og:type" content="website"></meta>
          <meta property="og:site_name" content="https://resumebuilder.dev" />
          <meta property="og:type" content="website" />
          <meta property="og:determiner" content="a" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content="https://resumebuilder.dev" />
          <meta
            name="twitter:title"
            content="Free Resume Builder for Developers | resumebuilder.dev"
          />
          <meta name="twitter:description" content={DESCRIPTION} />
          <meta name="twitter:image" content="opengraph/index.png" />
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
