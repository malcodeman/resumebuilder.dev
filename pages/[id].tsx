import React from "react";
import Head from "next/head";
import { Box, Button, Flex, Grid, Text, Accordion } from "@chakra-ui/react";
import { Plus } from "react-feather";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";

import Logo from "../components/Logo";
import PersonalDetailsSection from "../components/PersonalDetailsSection";
import EmploymentSection from "../components/EmploymentSection";
import SchoolSection from "../components/SchoolSection";
import SkillsSection from "../components/SkillsSection";
import EditableName from "../components/EditableName";
import BerlinTemplate from "../components/BerlinTemplate";

import utils from "../lib/utils";
import { Resume } from "../types";

const defaultResume = {
  id: "",
  name: "",
  updated: Date.now(),
};

function Builder() {
  const router = useRouter();
  const { id } = router.query;
  const [resume, setResume] = React.useState<Resume>(defaultResume);
  const { register, watch } = useForm();
  const fields = watch();
  const document = (
    <BerlinTemplate title={fields.title} firstName={fields.firstName} />
  );

  React.useEffect(() => {
    if (id) {
      setResume(utils.getStorageResume(id));
    }
  }, [id]);

  function handleOnNameChange(nextValue: string) {
    setResume({
      ...resume,
      name: nextValue,
      updated: Date.now(),
    });
    const resumes = utils.getStorageResumes();
    const storageResume = resumes.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          name: nextValue,
          updated: Date.now(),
        };
      }
      return item;
    });
    utils.setStorageResumes(storageResume);
  }

  async function handleDownload() {
    const blob = await pdf(document).toBlob();

    saveAs(blob, resume.name);
  }

  return (
    <>
      <Head>
        <title>{resume.name} - resumebuilder.dev</title>
      </Head>
      <Box as="header" padding="20px">
        <Flex as="nav" justifyContent="space-between">
          <Logo />
          <EditableName value={resume.name} onChange={handleOnNameChange} />
          <Button size="sm" onClick={handleDownload}>
            Download
          </Button>
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
            <PersonalDetailsSection register={register} />
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
        <Box>{document}</Box>
      </Grid>
    </>
  );
}

export default Builder;
