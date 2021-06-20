import React from "react";
import Head from "next/head";
import {
  Box,
  Button,
  Flex,
  Grid,
  Accordion,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
  SimpleGrid,
  useColorModeValue,
  ButtonGroup,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Text,
} from "@chakra-ui/react";
import { MoreVertical, Plus } from "react-feather";
import { useRouter } from "next/router";
import { useForm, useFieldArray } from "react-hook-form";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { useDebounce, useLocalStorage } from "react-use";
import { useToast } from "@chakra-ui/react";

import Logo from "../components/Logo";
import PersonalDetailsSection from "../components/PersonalDetailsSection";
import EmploymentSection from "../components/EmploymentSection";
import EducationSection from "../components/EducationSection";
import SkillSection from "../components/SkillSection";
import EditableName from "../components/EditableName";

import { TEMPLATES } from "../lib/constants";
import getTemplate from "../lib/getTemplate";

import { Resume, Template } from "../types";

const defaultResume = {
  id: "",
  name: "",
  updated: Date.now(),
  template: Template.berlin,
  fields: {
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    country: "",
    summary: "",
    employment: [],
    education: [],
    skill: [],
  },
};
const defaultValues = {
  title: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  city: "",
  country: "",
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
const toastId = "onSave";

function Builder() {
  const router = useRouter();
  const { id } = router.query;
  const [resumes, setResumes] = useLocalStorage<Resume[]>("resumes", []);
  const resume = resumes.find((item) => item.id === id) || defaultResume;
  const { register, watch, reset, control } = useForm({
    defaultValues,
  });
  const {
    fields: fieldsEmployment,
    append: appendEmployment,
    remove: removeEmployment,
  } = useFieldArray({
    control,
    name: "employment",
  });
  const {
    fields: fieldsEducation,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: "education",
  });
  const { fields: fieldsSkill, append: appendSkill } = useFieldArray({
    control,
    name: "skill",
  });
  const fields = watch();
  const document = getTemplate(resume.template, fields);
  const [keyboardJs, setKeyboardJs] = React.useState(null);
  const toast = useToast();
  const templateBgColor = useColorModeValue("gray.300", "gray.600");

  function handleOnSave(event: React.KeyboardEvent) {
    event.preventDefault();
    if (!toast.isActive(toastId)) {
      toast({
        id: toastId,
        description: "We save your work automatically.",
        duration: 1000,
        isClosable: true,
      });
    }
  }

  React.useEffect(() => {
    import("keyboardjs").then((k) => setKeyboardJs(k.default || k));
  }, []);

  React.useEffect(() => {
    if (!keyboardJs) {
      return;
    }
    keyboardJs.bind(`ctrl + s`, handleOnSave);
    return () => {
      keyboardJs.unbind(`ctrl + s`, handleOnSave);
    };
  }, [keyboardJs]);

  React.useEffect(() => {
    if (resume.id) {
      reset({ ...resume.fields });
    }
  }, [resume.id]);

  const [, cancel] = useDebounce(
    () => {
      const nextResume = {
        ...resume,
        fields,
        updated: Date.now(),
      };
      updateInLocalStorage(nextResume);
      cancel();
    },
    1000,
    [fields]
  );

  function updateInLocalStorage(nextResume: Resume) {
    const nextResumes = resumes.map((item) => {
      if (item.id === id) {
        return nextResume;
      }
      return item;
    });
    setResumes(nextResumes);
  }

  function handleOnNameChange(nextValue: string) {
    const nextResume = {
      ...resume,
      name: nextValue,
      updated: Date.now(),
    };
    updateInLocalStorage(nextResume);
  }

  function handleOnTemplateChange(nextTemplate: Template) {
    const nextResume = {
      ...resume,
      template: nextTemplate,
      updated: Date.now(),
    };
    updateInLocalStorage(nextResume);
  }

  async function handleDownload() {
    const blob = await pdf(document).toBlob();
    saveAs(blob, resume.name);
  }

  function handleJsonDownload() {
    const blob = new Blob([JSON.stringify(resume)], {
      type: "application/json",
    });
    saveAs(blob, `${resume.name}.json`);
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

  function handleDuplicateEmployment(index: number) {
    const employment = fields.employment[index];
    appendEmployment(employment);
  }

  function handleRemoveEmployment(index: number) {
    removeEmployment(index);
  }

  function handleDuplicateEducation(index: number) {
    const education = fields.education[index];
    appendEducation(education);
  }

  function handleRemoveEducation(index: number) {
    removeEducation(index);
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
          <ButtonGroup size="sm" isAttached>
            <Button mr="-px" onClick={handleDownload}>
              Download PDF
            </Button>
            <Popover>
              <PopoverTrigger>
                <IconButton
                  aria-label="More options"
                  icon={<MoreVertical size={20} />}
                />
              </PopoverTrigger>
              <PopoverContent width="unset">
                <PopoverBody>
                  <Text cursor="pointer" onClick={handleJsonDownload}>
                    Download JSON
                  </Text>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </ButtonGroup>
        </Flex>
      </Box>
      <Grid
        as="main"
        templateColumns="340px 1fr"
        height="100vh"
        overflowY="auto"
      >
        <Tabs overflowY="auto">
          <TabList>
            <Tab>Sections</Tab>
            <Tab>Templates</Tab>
          </TabList>
          <TabPanels>
            <TabPanel padding="0">
              <Accordion defaultIndex={[0]} allowToggle marginBottom="20px">
                <PersonalDetailsSection register={register} />
                <EmploymentSection
                  fields={fieldsEmployment}
                  register={register}
                  onAppend={handleAppendEmployment}
                  onDuplicate={handleDuplicateEmployment}
                  onRemove={handleRemoveEmployment}
                />
                <EducationSection
                  fields={fieldsEducation}
                  register={register}
                  onAppend={handleAppendEducation}
                  onDuplicate={handleDuplicateEducation}
                  onRemove={handleRemoveEducation}
                />
                <SkillSection
                  fields={fieldsSkill}
                  register={register}
                  onAppend={handleAppendSkill}
                />
              </Accordion>
              <Box
                paddingInlineStart="4"
                paddingInlineEnd="4"
                marginBottom="20px"
              >
                <Button
                  size="sm"
                  leftIcon={<Plus size={20} />}
                  width="100%"
                  variant="ghost"
                >
                  Add new section
                </Button>
              </Box>
            </TabPanel>
            <TabPanel>
              <SimpleGrid templateColumns="1fr 1fr" spacing="20px">
                {TEMPLATES.map((item) => (
                  <Flex
                    key={item}
                    height="200px"
                    alignItems="center"
                    justifyContent="center"
                    cursor="pointer"
                    backgroundColor={templateBgColor}
                    borderRadius="lg"
                    color="#999"
                    onClick={() => handleOnTemplateChange(item)}
                  >
                    {item}
                  </Flex>
                ))}
              </SimpleGrid>
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Box>{document}</Box>
      </Grid>
    </>
  );
}

export default Builder;
