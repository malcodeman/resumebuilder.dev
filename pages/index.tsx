import Head from "next/head";
import Link from "next/link";
import {
  Heading,
  Button,
  Grid,
  Box,
  Text,
  Divider,
  Flex,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useLocalStorageValue, useMountEffect } from "@react-hookz/web";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import * as R from "ramda";
import { ArrowRight } from "react-feather";
import { motion } from "framer-motion";

import Layout from "../components/Layout";

import { DEFAULT_VALUES, LANDING_RESUMES_LIST } from "../lib/constants";
import getTemplate from "../lib/getTemplate";

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
  const boxShadow = useColorModeValue(
    "rgba(0, 0, 0, 0.05) 0 0 0 2px",
    "rgba(255, 255, 255, 0.05) 0 0 0 2px"
  );
  const spacing = useBreakpointValue({ base: 0.6, md: 0.8 });

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
        <Grid as="section" templateColumns={["1fr", "1fr", "repeat(2, 1fr)"]}>
          <Box>
            <Heading mb="4">Free resume builder</Heading>
            <Text mb="4">Resume for everyone.</Text>
            <Button colorScheme="blue" onClick={handleOnSubmit}>
              Build resume
            </Button>
          </Box>
        </Grid>
        <Divider marginY="8" />
        <Box as="section">
          <Box width={["100%", "100%", "50%"]}>
            <Heading mb="4">Start with a template.</Heading>
            <Text mb="4">
              Choose from any of our free templates that best fit your personal
              style and professional needs.
            </Text>
            <Link href="/templates" passHref>
              <Button
                variant="outline"
                mb="4"
                rightIcon={<ArrowRight size={20} />}
              >
                See all templates
              </Button>
            </Link>
          </Box>
          <Grid
            templateColumns={[
              "minmax(0, 1fr)",
              "repeat(2, minmax(0, 1fr))",
              "repeat(3, minmax(0, 1fr))",
            ]}
            gap="8"
          >
            {R.map(
              (item) => (
                <Flex
                  key={item.id}
                  as={motion.div}
                  whileHover={{ scale: 1.1 }}
                  flexDirection="column"
                >
                  <Box
                    mb="2"
                    height="360px"
                    overflow="hidden"
                    userSelect="none"
                    borderRadius="lg"
                    boxShadow={boxShadow}
                    _hover={{ cursor: "pointer" }}
                  >
                    {getTemplate(
                      {
                        ...item.design,
                        spacing: spacing || item.design.spacing,
                      },
                      {
                        about: item.about,
                        section: item.section,
                      }
                    )}
                  </Box>
                  <Text>{R.toUpper(item.design.template)}</Text>
                </Flex>
              ),
              LANDING_RESUMES_LIST
            )}
          </Grid>
        </Box>
      </Layout>
    </>
  );
}

export default Landing;
