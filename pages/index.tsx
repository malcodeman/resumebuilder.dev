import Head from "next/head";
import {
  Heading,
  Button,
  Grid,
  Box,
  Text,
  Divider,
  Tooltip,
  List,
  ListItem,
  ListIcon,
  Center,
} from "@chakra-ui/react";
import { useMountEffect } from "@react-hookz/web";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import Layout from "../components/Layout";
import Faq from "../components/landing/Faq";
import Footer from "../components/landing/Footer";
import Features from "../components/landing/Features";
import Templates from "../components/landing/Templates";

import Poser12 from "../illustrations/Poser12";

import { DEFAULT_VALUES } from "../lib/constants";

import { Template } from "../types";

import useResumes from "../hooks/useResumes";
import useDashboard from "../hooks/useDashboard";

import Builder from "../components/landing/Builder";

const ATS_TOOLTIP = "Applicant Tracking System";

function Landing() {
  const { setDashboard } = useDashboard();
  const router = useRouter();
  const { createNew } = useResumes();
  const { t } = useTranslation();

  useMountEffect(() => {
    setDashboard(false);
  });

  function handleOnSubmit(template = Template.berlin) {
    const design = {
      ...DEFAULT_VALUES.design,
      template,
    };
    const resume = createNew({ design });
    router.push(`/resumes/${resume.id}`);
  }

  return (
    <>
      <Head>
        <title>Free Resume Builder for Developers | resumebuilder.dev</title>
      </Head>
      <Layout>
        <Grid
          as="section"
          templateColumns={["1fr", "repeat(2, 1fr)"]}
          gap="8"
          marginBottom="16"
        >
          <Box>
            <Heading mb="4">
              {t("create_job_ready_resume_for_free_in_minutes")}
            </Heading>
            <Text mb="4">
              Creating an{" "}
              <Tooltip label={ATS_TOOLTIP} aria-label={ATS_TOOLTIP}>
                ATS
              </Tooltip>
              -friendly tech resume that follows best practices and impresses
              hiring managers has never been easier.
            </Text>
            <Button
              as={motion.button}
              whileHover={{ scale: 1.1 }}
              colorScheme="blue"
              mb="4"
              data-cy="build-resume-button"
              onClick={() => handleOnSubmit()}
            >
              {t("build_resume")}
            </Button>
            <List>
              <ListItem>
                <ListIcon as={FiCheckCircle} color="green.500" />
                {t("no_credit_card_needed")}
              </ListItem>
              <ListItem>
                <ListIcon as={FiCheckCircle} color="green.500" />
                {t("no_account_needed")}
              </ListItem>
            </List>
          </Box>
          <Center>
            <Box maxW="sm" width="full">
              <Poser12 />
            </Box>
          </Center>
        </Grid>
        <Templates onSubmit={handleOnSubmit} />
        <Divider marginY="16" />
        <Features />
        <Divider marginY="16" />
        <Builder />
        <Divider marginY="16" />
        <Faq />
        <Footer onSubmit={handleOnSubmit} />
      </Layout>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default Landing;
