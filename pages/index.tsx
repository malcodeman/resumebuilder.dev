import Head from "next/head";
import { Heading, Button, Grid, Box, Text } from "@chakra-ui/react";
import { useLocalStorageValue, useMountEffect } from "@react-hookz/web";

import Layout from "../components/Layout";

function Landing() {
  const [_showDashboard, setShowDashboard] = useLocalStorageValue(
    "showDashboard",
    false,
    {
      initializeWithStorageValue: false,
    }
  );

  useMountEffect(() => {
    setShowDashboard(false);
  });

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
            <Button colorScheme="blue">Make resume</Button>
          </Box>
        </Grid>
      </Layout>
    </>
  );
}

export default Landing;
