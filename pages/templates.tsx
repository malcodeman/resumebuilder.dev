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
import { includes, map, filter } from "ramda";

import Layout from "../components/Layout";

import { DEFAULT_VALUES, TEMPLATES_LIST } from "../lib/constants";

import { Resume, Template } from "../types";

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
  const [activeFilter, setActiveFilter] = React.useState(FILTERS[0].value);
  const filteredResumes = filter(
    (item) => includes(activeFilter, item.tags),
    TEMPLATES_LIST
  );

  function handleOnSubmit(template: Template) {
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
        <title>Templates - resumebuildedev</title>
      </Head>
      <Layout>
        <ButtonGroup size="sm" mb="4" variant="ghost">
          {map(
            (item) => (
              <Button
                key={item.value}
                isActive={activeFilter === item.value}
                data-cy={`template-filters-${item.value}`}
                onClick={() => setActiveFilter(item.value)}
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
          data-cy="templates-grid"
        >
          {map(
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
