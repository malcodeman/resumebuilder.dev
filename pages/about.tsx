import Head from "next/head";
import { Text, Heading, Container, Avatar, Box } from "@chakra-ui/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import Layout from "../components/Layout";
import Footer from "../components/misc/Footer";
import Stats from "../components/about/Stats";

const DESCRIPTION =
  "Learn more about us, what we stand for, and where we're going.";

function About() {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>About | resumebuilder.dev</title>
        <meta name="og:description" content={DESCRIPTION} />
        <meta name="description" content={DESCRIPTION} />
        <meta name="twitter:description" content={DESCRIPTION} />
      </Head>
      <Layout>
        <Container maxW="container.sm">
          <Heading mb="4">{t("about")}</Heading>
          <Text mb="4">{t("about_description_1")}</Text>
          <Text mb="4">{t("about_description_2")}</Text>
          <Text mb="4">{t("about_description_3")}</Text>
          <Heading mb="4">{t("complete_platform_for_career")}</Heading>
          <Text mb="4">{t("about_description_4")}</Text>
          <Text mb="4">{t("about_description_5")}</Text>
          <Text mb="4">{t("about_description_6")}</Text>
          <Stats mb="4" />
          <Box mb="32">
            <Avatar name="Amer Karamustafić" src="about/avatar.png" />
            <Text>Amer Karamustafić, {t("founder_of_resumebuilder")}</Text>
          </Box>
        </Container>
        <Footer />
      </Layout>
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

export default About;
