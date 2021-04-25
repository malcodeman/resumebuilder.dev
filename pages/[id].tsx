import React from "react";
import Head from "next/head";
import { Box, Button, Flex, Grid, Text, Accordion } from "@chakra-ui/react";
import { Plus } from "react-feather";
import { useRouter } from "next/router";
import { useForm, useFieldArray } from "react-hook-form";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";

import Logo from "../components/Logo";
import PersonalDetailsSection from "../components/PersonalDetailsSection";
import EmploymentSection from "../components/EmploymentSection";
import EducationSection from "../components/EducationSection";
import SkillSection from "../components/SkillSection";
import EditableName from "../components/EditableName";
import BerlinTemplate from "../components/BerlinTemplate";

import utils from "../lib/utils";
import { Resume } from "../types";
import { IS_PROD } from "../lib/constants";

const defaultResume = {
  id: "",
  name: "",
  updated: Date.now(),
};
const defaultValuesDev = {
  title: "Software engineer",
  firstName: "Amer",
  lastName: "Karamustafic",
  email: "malcodeman@gmail.com",
  phone: "+387644343494",
  summary:
    "Creative full stack developer dedicated to building and optimizing the performance of user-centric, high-impact websites. Leverage technical, analytical and problem-solving skills to create dynamic, high-speed websites, apps and platforms fueling competitive advantage and revenue growth.",
  employment: [
    {
      jobTitle: "Software engineer",
      companyName: "Ministry of Programming",
      startDate: "April 2018",
      endDate: "Present",
      city: "",
      description:
        "Worked well independently and on a team to solve problems. Served as a friendly, hardworking, and punctual employee. Organized and prioritized work to complete assignments in a timely, efficient manner. Remained committed to adding to my knowledge and skills base. Consistently exhibited loyalty and passion for success.",
    },
  ],
  education: [
    {
      school: "Faculty of Information Technology",
      degree: "Bachelor's Degree",
      startDate: "August 2020",
      endDate: "Present",
      city: "Mostar",
      description: "",
    },
  ],
  skill: [
    {
      name: "React.js",
    },
    {
      name: "Next.js",
    },
    {
      name: "Node.js",
    },
    {
      name: "Python",
    },
    {
      name: "TypeScript",
    },
  ],
};
const defaultValuesProd = {
  title: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  summary: "",
  employment: [
    {
      jobTitle: "",
      companyName: "",
      startDate: "",
      endDate: "",
      city: "",
      description: "",
    },
  ],
  education: [
    {
      school: "",
      degree: "",
      startDate: "",
      endDate: "",
      city: "",
      description: "",
    },
  ],
  skill: [
    {
      name: "",
    },
  ],
};
const defaultValues = IS_PROD ? defaultValuesProd : defaultValuesDev;

function Builder() {
  const router = useRouter();
  const { id } = router.query;
  const [resume, setResume] = React.useState<Resume>(defaultResume);
  const { register, watch, control } = useForm({ defaultValues });
  const { fields: fieldsEmployment, append: appendEmployment } = useFieldArray({
    control,
    name: "employment",
  });
  const { fields: fieldsEducation, append: appendEducation } = useFieldArray({
    control,
    name: "education",
  });
  const { fields: fieldsSkill, append: appendSkill } = useFieldArray({
    control,
    name: "skill",
  });
  const fields = watch();
  const document = <BerlinTemplate {...fields} />;

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

  function handleAppendEmployment() {
    appendEmployment({
      jobTitle: "",
      companyName: "",
      startDate: "",
      endDate: "",
      city: "",
      description: "",
    });
  }

  function handleAppendEducation() {
    appendEducation({
      school: "",
      degree: "",
      startDate: "",
      endDate: "",
      city: "",
      description: "",
    });
  }

  function handleAppendSkill() {
    appendSkill({
      name: "",
    });
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
          <Accordion defaultIndex={[0]} padding="20px 0">
            <PersonalDetailsSection register={register} />
            <EmploymentSection
              fields={fieldsEmployment}
              register={register}
              onAppend={handleAppendEmployment}
            />
            <EducationSection
              fields={fieldsEducation}
              register={register}
              onAppend={handleAppendEducation}
            />
            <SkillSection
              fields={fieldsSkill}
              register={register}
              onAppend={handleAppendSkill}
            />
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
