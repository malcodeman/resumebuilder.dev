import React from "react";
import Head from "next/head";
import {
  Box,
  Button,
  Flex,
  Grid,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
  Editable,
  EditableInput,
  EditablePreview,
} from "@chakra-ui/react";
import { useForm, useWatch, UseFormReturn } from "react-hook-form";
import { useDebouncedEffect, useLocalStorageValue } from "@react-hookz/web";

import { motion } from "framer-motion";

import Logo from "../components/Logo";

import HeaderPopover from "../components/HeaderPopover";
import Sections from "../components/sections/Sections";
import Templates from "../components/templates/Templates";

import { DEFAULT_VALUES } from "../lib/constants";
import getTemplate from "../lib/getTemplate";
import utils from "../lib/utils";
import useResume from "../hooks/useResume";
import useAutoSaveToast from "../hooks/useAutoSaveToast";

import { Resume, Fields } from "../types";

function ResumeTitle() {
  const [resume, setResume] = useResume();
  const form = useForm({ defaultValues: { title: "" } });

  function handleOnSubmit(nextValue: string) {
    setResume({
      ...resume,
      updatedAt: Date.now(),
      title: nextValue,
    });
  }

  if (resume) {
    return (
      <Editable
        defaultValue={resume.title}
        maxWidth="256px"
        onSubmit={(nextValue) => handleOnSubmit(nextValue)}
      >
        <EditablePreview noOfLines={1} overflowWrap="anywhere" />
        <EditableInput {...form.register("title")} />
      </Editable>
    );
  }
  return <></>;
}

function Document(props: { form: UseFormReturn<Resume, object> }) {
  const { form } = props;
  const [isFullWidth] = useLocalStorageValue("isFullWidth", false, {
    initializeWithStorageValue: false,
  });
  const [resume, setResume] = useResume();
  const watch = useWatch({
    control: form.control,
    name: ["id", "meta.template", "about", "section"],
  });
  const fields = {
    about: watch[2],
    section: watch[3],
  };
  const document = getTemplate(watch[1], fields);

  useDebouncedEffect(
    () => {
      if (watch[0]) {
        setResume({
          ...resume,
          ...form.getValues(),
          updatedAt: Date.now(),
        });
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

function Builder() {
  const [resume] = useResume();
  const form = useForm<Resume>({ defaultValues: DEFAULT_VALUES });
  useAutoSaveToast({});

  function handleOnImport(fields: Fields) {
    const values = {
      ...resume,
      about: fields.about,
      section: fields.section,
    };
    form.reset(values);
  }

  return (
    <>
      <Head>
        <title>{resume?.title} - resumebuilder.dev</title>
      </Head>
      <Box as="header" padding="4">
        <Flex as="nav" justifyContent="space-between">
          <Logo />
          <ResumeTitle />
          <Flex>
            <Button mr="2" size="sm" onClick={() => utils.exportAsPdf(resume)}>
              Export PDF
            </Button>
            <HeaderPopover onImport={handleOnImport} />
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
              <Sections form={form} />
            </TabPanel>
            <TabPanel>
              <Templates form={form} />
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Document form={form} />
      </Grid>
    </>
  );
}

export default Builder;
