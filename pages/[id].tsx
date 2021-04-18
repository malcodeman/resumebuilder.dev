import React from "react";
import Head from "next/head";
import { Box, Button, Flex, Grid, Text, Accordion } from "@chakra-ui/react";
import { Plus } from "react-feather";
import { useRouter } from "next/router";

import Logo from "../components/Logo";
import PersonalDetailsSection from "../components/PersonalDetailsSection";
import EmploymentSection from "../components/EmploymentSection";
import SchoolSection from "../components/SchoolSection";
import SkillsSection from "../components/SkillsSection";

type resumeType = {
  id: string;
  name: string;
  updated: number;
};
const defaultResume = {
  id: "",
  name: "",
  updated: Date.now(),
};

function getStorageResume(id: string | string[]) {
  try {
    const resumes: resumeType[] =
      JSON.parse(localStorage.getItem("resumes")) || [];
    const data = resumes.find((item) => item.id === id) || defaultResume;

    return data;
  } catch {
    return defaultResume;
  }
}

function Builder() {
  const router = useRouter();
  const { id } = router.query;
  const [resume, setResume] = React.useState<resumeType>(defaultResume);

  React.useEffect(() => {
    if (id) {
      setResume(getStorageResume(id));
    }
  }, [id]);

  return (
    <>
      <Head>
        <title>{resume.name} - resumebuilder.dev</title>
      </Head>
      <Box as="header" padding="20px">
        <Flex as="nav" justifyContent="space-between">
          <Logo />
          <Text>{resume.name}</Text>
          <Button size="sm">Download</Button>
        </Flex>
      </Box>
      <Grid as="main" templateColumns="340px 1fr">
        <Flex flexDir="column" overflowY="auto">
          <Flex alignItems="center" padding="0 20px">
            <Text fontSize="sm" mr="20px">
              Sections
            </Text>
            <Text fontSize="sm">Templates</Text>
          </Flex>
          <Accordion defaultIndex={[0]} allowMultiple padding="20px 0">
            <PersonalDetailsSection />
            <EmploymentSection />
            <SchoolSection />
            <SkillsSection />
          </Accordion>
          <Button
            size="sm"
            leftIcon={<Plus size={20} />}
            margin="0 20px 20px 20px"
          >
            Add new section
          </Button>
        </Flex>
        <Box backgroundColor="#EEEEEE" />
      </Grid>
    </>
  );
}

export default Builder;
