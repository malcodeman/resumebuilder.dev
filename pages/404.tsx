import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

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
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default Custom404;
