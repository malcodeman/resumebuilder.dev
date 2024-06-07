"use client";
import { Text, Heading, Container, Avatar, Box } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { Layout } from "components/Layout";
import { Footer } from "app/[locale]/(marketing)/_components/Footer";
import { Stats } from "app/[locale]/(marketing)/_components/Stats";

function About() {
  const t = useTranslations();

  return (
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
          <Avatar name="Amer Karamustafić" src="/about/avatar.png" />
          <Text>Amer Karamustafić, {t("founder_of_resumebuilder")}</Text>
        </Box>
      </Container>
      <Footer />
    </Layout>
  );
}

export default About;
