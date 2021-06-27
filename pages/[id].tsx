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
  useDisclosure,
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
import TagListSection from "../components/TagListSection";
import StandardSection from "../components/StandardSection";
import EditableName from "../components/EditableName";
import AddSectionModal from "../components/AddSectionModal";

import { TEMPLATES } from "../lib/constants";
import getTemplate from "../lib/getTemplate";

import { Resume, Template, Section } from "../types";

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
    standardSection: [],
    tagListSection: [],
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
  standardSection: [],
  tagListSection: [],
};
const toastId = "onSave";

function Builder() {
  const router = useRouter();
  const { id } = router.query;
  const [resumes, setResumes] = useLocalStorage<Resume[]>("resumes", []);
  const resume = resumes.find((item) => item.id === id) || defaultResume;
  const { register, watch, reset, getValues, control } = useForm({
    defaultValues,
  });
  const { fields: standardSectionFields, append: appendStandardSection } =
    useFieldArray({
      control,
      name: "standardSection",
    });
  const { fields: tagListSectionFields, append: appendTagListSection } =
    useFieldArray({
      control,
      name: "tagListSection",
    });
  const fields = watch();
  const document = getTemplate(resume.template, fields);
  const [keyboardJs, setKeyboardJs] = React.useState(null);
  const toast = useToast();
  const templateBgColor = useColorModeValue("gray.300", "gray.600");
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  function handleOnSubmit(data: { label: string; type: Section }) {
    onClose();
    switch (data.type) {
      case "standard":
        return appendStandardSection({
          label: data.label,
          nested: [
            {
              title: "",
              subtitle: "",
              website: "",
              city: "",
              startDate: "",
              endDate: "",
              description: "",
            },
          ],
        });
      case "tagList":
        return appendTagListSection({
          label: data.label,
          tags: [],
        });
    }
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
                {tagListSectionFields.map((item, index) => (
                  <TagListSection
                    nestIndex={index}
                    label={item.label}
                    register={register}
                  />
                ))}
                {standardSectionFields.map((item, index) => (
                  <StandardSection
                    nestIndex={index}
                    control={control}
                    label={item.label}
                    getValues={getValues}
                    register={register}
                  />
                ))}
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
                  onClick={onOpen}
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
      <AddSectionModal
        isOpen={isOpen}
        onSubmit={handleOnSubmit}
        onClose={onClose}
      />
    </>
  );
}

export default Builder;
