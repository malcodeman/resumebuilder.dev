import Head from "next/head";
import {
  Heading,
  Button,
  Grid,
  Box,
  Text,
  Divider,
  Center,
  Tooltip,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { useMountEffect } from "@react-hookz/web";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { CheckCircle } from "react-feather";

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

const ATS_TOOLTIP = "Applicant Tracking System";

function Landing() {
  const { setDashboard } = useDashboard();
  const router = useRouter();
  const { createNew } = useResumes();

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
              Create a job-ready resume for free in minutes.
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
              Build resume
            </Button>
            <List>
              <ListItem>
                <ListIcon as={CheckCircle} color="green.500" />
                No credit card needed
              </ListItem>
              <ListItem>
                <ListIcon as={CheckCircle} color="green.500" />
                No account needed
              </ListItem>
            </List>
          </Box>
          <Center maxW="sm">
            <Poser12 />
          </Center>
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
