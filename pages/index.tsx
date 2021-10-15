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
  Center,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useLocalStorageValue, useMountEffect } from "@react-hookz/web";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import * as R from "ramda";
import { ArrowRight } from "react-feather";
import { motion } from "framer-motion";
import { Emoji } from "emoji-mart";

import Layout from "../components/Layout";
import Faq from "../components/landing/Faq";
import DeveloperIllustration from "../illustrations/Developer";
import Footer from "../components/landing/Footer";

import { DEFAULT_VALUES, LANDING_RESUMES_LIST } from "../lib/constants";
import getTemplate from "../lib/getTemplate";

import { Resume, Template } from "../types";

const ARROW_RIGHT_VARIANTS = {
  mouseenter: { x: 5 },
  mouseleave: { x: 0 },
};
const FEATURES = [
  {
    title: "Privacy first",
    text: "Own and manage your own database.",
    emoji: <Emoji emoji="lock" size={48} />,
  },
  {
    title: "Free forever",
    text: "Anyone can build resumes.",
    emoji: <Emoji emoji="money_with_wings" size={48} />,
  },
  {
    title: "Fast",
    text: "Statically-rendered pages.",
    emoji: <Emoji emoji="rocket" size={48} />,
  },
];

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
            <Text mb="4">Resume for everyone.</Text>
            <Button
              as={motion.button}
              whileHover={{ scale: 1.1 }}
              colorScheme="blue"
              onClick={() => handleOnSubmit()}
            >
              Build resume
            </Button>
          </Box>
          <DeveloperIllustration fill={fill} stroke={stroke} />
        </Grid>
        <Box as="section">
          <Box width={["100%", "100%", "50%"]}>
            <Heading mb="4">Start with a template.</Heading>
            <Text mb="4">
              Choose from any of our free templates that best fit your personal
              style and professional needs.
            </Text>
            <Link href="/templates" passHref>
              <Button
                as={motion.button}
                whileHover="mouseenter"
                variant="outline"
                mb="8"
                rightIcon={
                  <motion.div variants={ARROW_RIGHT_VARIANTS}>
                    <ArrowRight size={20} />
                  </motion.div>
                }
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
                  role="group"
                >
                  <Box
                    mb="2"
                    height="360px"
                    overflow="hidden"
                    userSelect="none"
                    borderRadius="lg"
                    position="relative"
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
                    <Center
                      as={motion.div}
                      whileHover={{ opacity: 1 }}
                      position="absolute"
                      left="0"
                      top="0"
                      right="0"
                      bottom="0"
                      opacity="0"
                      backgroundColor="rgba(0, 0, 0, 0.05)"
                    >
                      <Button
                        colorScheme="blue"
                        onClick={() =>
                          handleOnSubmit({ template: item.design.template })
                        }
                      >
                        Use template
                      </Button>
                    </Center>
                  </Box>
                  <Text>{R.toUpper(item.design.template)}</Text>
                </Flex>
              ),
              LANDING_RESUMES_LIST
            )}
          </Grid>
          <Divider marginY="16" />
          <Box as="section">
            <Center mb="16">
              <Heading>Privacy-focused and login-free.</Heading>
            </Center>
            <Grid templateColumns={["1fr", "1fr 1fr 1fr"]} gap="8">
              {R.map(
                (item) => (
                  <Center key={item.title} flexDirection="column">
                    {item.emoji}
                    <Heading mb="4">{item.title}</Heading>
                    <Text>{item.text}</Text>
                  </Center>
                ),
                FEATURES
              )}
            </Grid>
          </Box>
        </Box>
        <Divider marginY="16" />
        <Faq />
        <Footer onSubmit={handleOnSubmit} />
      </Layout>
    </>
  );
}

export default Landing;
