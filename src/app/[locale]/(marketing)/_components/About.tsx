"use client";
import { Heading, Box, Text, Container, Avatar } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { Stats } from "./Stats";
import { Footer } from "./Footer";

function About() {
  const t = useTranslations();
  return (
    <>
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
    </>
  );
}

export { About };
