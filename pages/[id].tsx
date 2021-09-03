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
  Editable,
  EditableInput,
  EditablePreview,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { Plus } from "react-feather";
import { useRouter } from "next/router";
import {
  useForm,
  useFieldArray,
  FormProvider,
  useWatch,
} from "react-hook-form";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { useDebouncedEffect, useLocalStorageValue } from "@react-hookz/web";
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
import AddSectionModal from "../components/sections/AddSectionModal";
import HeaderPopover from "../components/HeaderPopover";
import ExportResumeModal from "../components/templates/ExportResumeModal";
import DeleteResumeModal from "../components/resumes/DeleteResumeModal";

import { TEMPLATES, DEFAULT_VALUES } from "../lib/constants";
import getTemplate from "../lib/getTemplate";

import { Resume, Section, Fields } from "../types";

function ResumeTitle({ control, setValue }) {
  const value = useWatch({
    control,
    name: "title",
    defaultValue: "",
  });
  return (
    <Editable
      value={value}
      onChange={(nextValue) => setValue("title", nextValue)}
      maxWidth="256px"
    >
      <EditablePreview noOfLines={1} overflowWrap="anywhere" />
      <EditableInput />
    </Editable>
  );
}

function Document({ control, isFullWidth, onChange }) {
  const watch = useWatch({
    control,
    name: "",
    defaultValue: DEFAULT_VALUES,
  });
  const fields = {
    about: watch.about,
    section: watch.section,
  };
  const document = getTemplate(watch.meta.template, fields);

  useDebouncedEffect(
    () => {
      if (watch.id) {
        onChange();
      }
    },
    [watch],
    200,
    500
  );

  return (
    <Box
      as={motion.div}
      margin="0 auto"
      animate={{ width: isFullWidth ? "100%" : "900px" }}
    >
      {document}
    </Box>
  );
}

const toastId = "onSave";

function Builder() {
  const router = useRouter();
  const { id } = router.query;
  const [resumes, setResumes] = useLocalStorageValue<Resume[]>("resumes", [], {
    initializeWithStorageValue: false,
  });
  const resume = R.isNil(resumes)
    ? DEFAULT_VALUES
    : R.find((item) => item.id === id, resumes) || DEFAULT_VALUES;
  const form = useForm<Resume>({ defaultValues: DEFAULT_VALUES });
  const {
    fields: sectionFields,
    append: appendSection,
    remove: removeSection,
    swap: swapSection,
  } = useFieldArray({
    control: form.control,
    name: "section",
  });
  const [keyboardJs, setKeyboardJs] = React.useState(null);
  const toast = useToast();
  const templateBgColor = useColorModeValue("gray.300", "gray.600");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isExportResumeModalOpen,
    onOpen: onExportResumeModalOpen,
    onClose: onExportResumeModalClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteResumeModalOpen,
    onOpen: onDeleteResumeModalOpen,
    onClose: onDeleteResumeModalClose,
  } = useDisclosure();
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );
  const [isFullWidth, setIsFullWidth] = useLocalStorageValue(
    "isFullWidth",
    false,
    { initializeWithStorageValue: false }
  );

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
      form.reset({ ...resume });
    }
  }, [resume.id]);

  function handleOnChange() {
    const nextResume = {
      ...form.getValues(),
      updatedAt: Date.now(),
    };
    updateInLocalStorage(nextResume);
  }

  function updateInLocalStorage(nextResume: Resume) {
    const nextResumes = R.map((item) => {
      if (item.id === id) {
        return nextResume;
      }
      return item;
    }, resumes);
    setResumes(nextResumes);
  }

  async function handleOnPdfExport() {
    const fields = {
      about: resume.about,
      section: resume.section,
    };
    const document = getTemplate(resume.meta.template, fields);
    const blob = await pdf(document).toBlob();
    saveAs(blob, resume.title);
  }

  function handleOnJsonExport() {
    const blob = new Blob([JSON.stringify(resume)], {
      type: "application/json",
    });
    saveAs(blob, `${resume.title}.json`);
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

  function handleOnImport(fields: Fields) {
    const values = {
      ...resume,
      about: fields.about,
      section: fields.section,
    };
    form.reset(values);
  }

  function handleOnDelete() {
    const nextResumes = R.filter((item) => item.id !== id, resumes);
    setResumes(nextResumes);
    router.push("/");
  }

  return (
    <>
      <Head>
        <title>{resume.title} - resumebuilder.dev</title>
      </Head>
      <Box as="header" padding="20px">
        <Flex as="nav" justifyContent="space-between">
          <Logo />
          <ResumeTitle control={form.control} setValue={form.setValue} />
          <Flex>
            <Button mr="2" size="sm" onClick={handleOnPdfExport}>
              Export PDF
            </Button>
            <HeaderPopover
              isFullWidth={isFullWidth}
              setIsFullWidth={setIsFullWidth}
              onExportResumeModalOpen={onExportResumeModalOpen}
              onImport={handleOnImport}
              onDelete={onDeleteResumeModalOpen}
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
                <FormProvider {...form}>
                  <DndContext sensors={sensors} onDragEnd={handleOnDragEnd}>
                    <PersonalDetailsSection />
                    <SortableContext
                      items={sectionFields}
                      strategy={verticalListSortingStrategy}
                    >
                      {sectionFields.map((item, index) => {
                        const props = {
                          index,
                          key: item.id,
                          id: item.id,
                          label: item.label,
                          remove: removeSection,
                          append: appendSection,
                        };
                        return item.name === "standardSection" ? (
                          <StandardSection {...props} />
                        ) : (
                          <TagListSection {...props} />
                        );
                      })}
                    </SortableContext>
                  </DndContext>
                </FormProvider>
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
                {R.map(
                  (item) => (
                    <Flex
                      key={item}
                      height="200px"
                      alignItems="center"
                      justifyContent="center"
                      cursor="pointer"
                      backgroundColor={templateBgColor}
                      borderRadius="lg"
                      color="#999"
                      onClick={() => form.setValue("meta.template", item)}
                    >
                      {item}
                    </Flex>
                  ),
                  TEMPLATES
                )}
              </SimpleGrid>
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Document
          control={form.control}
          isFullWidth={isFullWidth}
          onChange={handleOnChange}
        />
      </Grid>
      <AddSectionModal
        isOpen={isOpen}
        onSubmit={handleOnSubmit}
        onClose={onClose}
      />
      <ExportResumeModal
        isOpen={isExportResumeModalOpen}
        onClose={onExportResumeModalClose}
        onPdfExport={handleOnPdfExport}
        onJsonExport={handleOnJsonExport}
      />
      <DeleteResumeModal
        isOpen={isDeleteResumeModalOpen}
        onClose={onDeleteResumeModalClose}
        onSubmit={handleOnDelete}
      />
    </>
  );
}

export default Builder;
