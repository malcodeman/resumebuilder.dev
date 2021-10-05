import Head from "next/head";
import { Heading, Button, Grid, Box, Text } from "@chakra-ui/react";
import { useLocalStorageValue, useMountEffect } from "@react-hookz/web";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";

import Layout from "../components/Layout";

import { DEFAULT_VALUES } from "../lib/constants";

import { Resume } from "../types";

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

  useMountEffect(() => {
    setShowDashboard(false);
  });

  function handleOnSubmit() {
    const resume = {
      ...DEFAULT_VALUES,
      id: nanoid(),
      title: "Untitled resume",
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
        <Grid templateColumns="1fr 1fr">
          <Box>
            <Heading mb="4">Free resume builder</Heading>
            <Text mb="4">Resume for everyone.</Text>
            <Button colorScheme="blue" onClick={handleOnSubmit}>
              Make resume
            </Button>
          </Box>
        </Grid>
      </Layout>
    </>
  );
}

export default Landing;
