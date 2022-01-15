import Head from "next/head";
import {
  Heading,
  Button,
  Grid,
  Box,
  Text,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import { useLocalStorageValue, useMountEffect } from "@react-hookz/web";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

import Layout from "../components/Layout";
import Faq from "../components/landing/Faq";
import Footer from "../components/landing/Footer";
import Features from "../components/landing/Features";
import Templates from "../components/landing/Templates";

import DeveloperIllustration from "../illustrations/Developer";

import { DEFAULT_VALUES } from "../lib/constants";

import { Resume, Template } from "../types";

function Landing() {
  const [_showDashboard, setShowDashboard] = useLocalStorageValue(
    "showDashboard",
    false,
    {
      initializeWithStorageValue: false,
    }
  );
  const router = useRouter();
  const [resumes, setResumes] = useLocalStorageValue<Resume[]>("resumes", [], {
    initializeWithStorageValue: false,
  });
  const fill = useColorModeValue(
    "var(--chakra-colors-blue-500)",
    "var(--chakra-colors-blue-200)"
  );
  const stroke = useColorModeValue("currentColor", "#fff");

  useMountEffect(() => {
    setShowDashboard(false);
  });

  function handleOnSubmit(data = { template: Template.berlin }) {
    const { template } = data;
    const resume = {
      ...DEFAULT_VALUES,
      id: nanoid(),
      title: "Untitled resume",
      design: {
        ...DEFAULT_VALUES.design,
        template,
      },
    };
    setResumes([...resumes, resume]);
    router.push(`/resumes/${resume.id}`);
  }

  return (
    <>
      <Head>
        <title>resumebuilder.dev</title>
      </Head>
      <Layout>
        <Grid
          as="section"
          templateColumns={["1fr", "1fr", "repeat(2, 1fr)"]}
          gap="8"
          marginBottom="16"
        >
          <Box>
            <Heading mb="4">Free resume builder</Heading>
            <Text mb="4">Resume for developers.</Text>
            <Button
              as={motion.button}
              whileHover={{ scale: 1.1 }}
              colorScheme="blue"
              data-cy="build-resume-button"
              onClick={() => handleOnSubmit()}
            >
              Build resume
            </Button>
          </Box>
          <DeveloperIllustration fill={fill} stroke={stroke} />
        </Grid>
        <Templates onSubmit={handleOnSubmit} />
        <Divider marginY="16" />
        <Features />
        <Divider marginY="16" />
        <Faq />
        <Footer onSubmit={handleOnSubmit} />
      </Layout>
    </>
  );
}

export default Landing;
