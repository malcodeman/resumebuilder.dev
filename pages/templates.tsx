import React from "react";
import {
  Grid,
  Box,
  Flex,
  Image,
  Heading,
  Text,
  ButtonGroup,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import Head from "next/head";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import { useLocalStorageValue } from "@react-hookz/web";
import * as R from "ramda";

import Layout from "../components/Layout";

import { DEFAULT_VALUES } from "../lib/constants";

import { Resume, Template } from "../types";

const TEMPLTES = [
  {
    title: "Berlin",
    template: Template.berlin,
    description: "A clean and flexible resume template.",
    src: "/templates/berlin.png",
    tags: ["all", "creative"],
  },
  {
    title: "Tokyo",
    template: Template.tokyo,
    description:
      "Present your skills and experience with this minimal resume template.",
    src: "/templates/tokyo.png",
    tags: ["all", "simple", "professional"],
  },
];
const FILTERS = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "simple",
    label: "Simple",
  },
  {
    value: "creative",
    label: "Creative",
  },
  {
    value: "professional",
    label: "Professional",
  },
];

function Templates() {
  const router = useRouter();
  const [resumes, setResumes] = useLocalStorageValue<Resume[]>("resumes", [], {
    initializeWithStorageValue: false,
  });
  const boxShadow = useColorModeValue(
    "rgba(0, 0, 0, 0.05) 0 0 0 2px",
    "rgba(255, 255, 255, 0.05) 0 0 0 2px"
  );
  const [filter, setFilter] = React.useState(FILTERS[0].value);
  const filteredResumes = R.filter(
    (item) => R.includes(filter, item.tags),
    TEMPLTES
  );

  function handleOnSubmit(template: Template) {
    const resume = {
      ...DEFAULT_VALUES,
      id: nanoid(),
      title: "Untitled resume",
      meta: {
        ...DEFAULT_VALUES.meta,
        template,
      },
    };
    setResumes([...resumes, resume]);
    router.push(`/resumes/${resume.id}`);
  }

  return (
    <>
      <Head>
        <title>Templates - resumebuilder.dev</title>
      </Head>
      <Layout>
        <ButtonGroup size="sm" mb="4" variant="ghost">
          {R.map(
            (item) => (
              <Button
                key={item.value}
                isActive={filter === item.value}
                onClick={() => setFilter(item.value)}
              >
                {item.label}
              </Button>
            ),
            FILTERS
          )}
        </ButtonGroup>
        <Grid
          gap="8"
          gridTemplateColumns="repeat(auto-fill, minmax(288px, 1fr))"
        >
          {R.map(
            (item) => (
              <Box key={item.template}>
                <Image
                  src={item.src}
                  alt=""
                  mb="2"
                  borderRadius="lg"
                  boxShadow={boxShadow}
                />
                <Flex mb="2" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Heading fontSize="md">{item.title}</Heading>
                  </Box>
                  <Button
                    colorScheme="blue"
                    size="sm"
                    onClick={() => handleOnSubmit(item.template)}
                  >
                    Use template
                  </Button>
                </Flex>
                <Text opacity="0.5">{item.description}</Text>
              </Box>
            ),
            filteredResumes
          )}
        </Grid>
      </Layout>
    </>
  );
}

export default Templates;
