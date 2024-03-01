import Head from "next/head";

import NotFound from "../components/misc/NotFound";

function Custom404() {
  return (
    <>
      <Head>
        <title>Page not found | resumebuilder.dev</title>
      </Head>
      <NotFound />
    </>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      messages: (await import(`../public/locales/${locale}/common.json`))
        .default,
    },
  };
}

export default Custom404;
