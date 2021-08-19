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
  useDisclosure,
} from "@chakra-ui/react";
import { Plus } from "react-feather";
import { useRouter } from "next/router";
import { useForm, useFieldArray } from "react-hook-form";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { useDebounce, useLocalStorage } from "react-use";
import { useToast } from "@chakra-ui/react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import * as R from "ramda";
import { motion } from "framer-motion";

import Logo from "../components/Logo";
import PersonalDetailsSection from "../components/sections/PersonalDetailsSection";
import TagListSection from "../components/sections/TagListSection";
import StandardSection from "../components/sections/StandardSection";
import EditableName from "../components/EditableName";
import AddSectionModal from "../components/sections/AddSectionModal";
import HeaderPopover from "../components/HeaderPopover";

import { TEMPLATES } from "../lib/constants";
import getTemplate from "../lib/getTemplate";

import { Resume, Template, Section, Fields } from "../types";

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
    section: [],
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
  section: [],
};
const toastId = "onSave";

function Builder() {
  const router = useRouter();
  const { id } = router.query;
  const [resumes, setResumes] = useLocalStorage<Resume[]>("resumes", []);
  const resume = resumes.find((item) => item.id === id) || defaultResume;
  const { register, watch, reset, getValues, control } = useForm<Fields>({
    defaultValues,
  });
  const {
    fields: sectionFields,
    append: appendSection,
    remove: removeSection,
    swap: swapSection,
  } = useFieldArray({
    control,
    name: "section",
  });

  const fields = watch();
  const document = getTemplate(resume.template, fields);
  const [keyboardJs, setKeyboardJs] = React.useState(null);
  const toast = useToast();
  const templateBgColor = useColorModeValue("gray.300", "gray.600");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );
  const [isFullWidth, setIsFullWidth] = useLocalStorage("isFullWidth", false);

  React.useEffect(() => {
    import("keyboardjs").then((k) => setKeyboardJs(k.default || k));
  }, []);

  React.useEffect(() => {
    if (!keyboardJs) {
      return;
    }

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

    keyboardJs.bind(`ctrl + s`, handleOnSave);
    return () => {
      keyboardJs.unbind(`ctrl + s`, handleOnSave);
    };
  }, [keyboardJs, toast]);

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

  async function handleOnPdfExport() {
    const blob = await pdf(document).toBlob();
    saveAs(blob, resume.name);
  }

  function handleOnJsonExport() {
    const blob = new Blob([JSON.stringify(resume)], {
      type: "application/json",
    });
    saveAs(blob, `${resume.name}.json`);
  }

  function handleOnSubmit(data: { label: string; name: Section }) {
    onClose();
    switch (data.name) {
      case "standardSection":
        return appendSection({
          name: data.name,
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
      case "tagListSection":
        return appendSection({
          name: data.name,
          label: data.label,
          tags: "",
        });
    }
  }

  function handleOnDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active.id !== over.id) {
      const from = R.findIndex(R.propEq("id", active.id))(sectionFields);
      const to = R.findIndex(R.propEq("id", over.id))(sectionFields);
      swapSection(from, to);
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
          <Flex>
            <Button mr="2" size="sm" onClick={handleOnPdfExport}>
              Export PDF
            </Button>
            <HeaderPopover
              isFullWidth={isFullWidth}
              setIsFullWidth={setIsFullWidth}
              onPdfExport={handleOnPdfExport}
              onJsonExport={handleOnJsonExport}
            />
          </Flex>
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
                <DndContext sensors={sensors} onDragEnd={handleOnDragEnd}>
                  <SortableContext
                    items={sectionFields}
                    strategy={verticalListSortingStrategy}
                  >
                    {sectionFields.map((item, index) => {
                      if (item.name === "standardSection") {
                        return (
                          <StandardSection
                            key={item.id}
                            id={item.id}
                            nestIndex={index}
                            control={control}
                            defaultLabel={item.label}
                            getValues={getValues}
                            register={register}
                            remove={removeSection}
                            append={appendSection}
                          />
                        );
                      }
                      return (
                        <TagListSection
                          key={item.id}
                          id={item.id}
                          nestIndex={index}
                          defaultLabel={item.label}
                          getValues={getValues}
                          register={register}
                          remove={removeSection}
                          append={appendSection}
                        />
                      );
                    })}
                  </SortableContext>
                </DndContext>
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
        <Box
          as={motion.div}
          margin="0 auto"
          animate={{ width: isFullWidth ? "100%" : "900px" }}
        >
          {document}
        </Box>
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
