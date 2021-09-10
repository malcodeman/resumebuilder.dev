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
  useColorModeValue,
} from "@chakra-ui/react";
import { useForm, useWatch, UseFormReturn } from "react-hook-form";
import { useDebouncedEffect, useLocalStorageValue } from "@react-hookz/web";

import { motion } from "framer-motion";

import Logo from "../components/Logo";

import HeaderPopover from "../components/HeaderPopover";
import Sections from "../components/sections/Sections";
import Templates from "../components/templates/Templates";
import EmojiPicker from "../components/misc/EmojiPicker";

import { DEFAULT_VALUES } from "../lib/constants";
import getTemplate from "../lib/getTemplate";
import utils from "../lib/utils";
import useResume from "../hooks/useResume";
import useAutoSaveToast from "../hooks/useAutoSaveToast";

import { Resume, Fields } from "../types";

function ResumeTitle() {
  const [resume, setResume] = useResume({ isolated: true });
  const form = useForm({ defaultValues: { title: "" } });

  function handleOnIconChange(emoji: string) {
    setResume({
      ...resume,
      updatedAt: Date.now(),
      icon: emoji,
    });
  }

  function handleOnTitleChange(nextValue: string) {
    setResume({
      ...resume,
      updatedAt: Date.now(),
      title: nextValue,
    });
  }

  if (resume) {
    return (
      <Flex>
        <EmojiPicker
          emoji={resume.icon}
          onSelect={(emoji) => handleOnIconChange(emoji)}
        />
        <Editable
          defaultValue={resume.title}
          onSubmit={(nextValue) => handleOnTitleChange(nextValue)}
          ml="2"
          maxWidth="256px"
        >
          <EditablePreview noOfLines={1} overflowWrap="anywhere" />
          <EditableInput {...form.register("title")} />
        </Editable>
      </Flex>
    );
  }
  return <></>;
}

function Header(props: { form: UseFormReturn<Resume, object> }) {
  const { form } = props;
  const backgroundColor = useColorModeValue("white", "gray.800");
  const boxShadow = useColorModeValue(
    "rgba(0, 0, 0, 0.03) 0px 2px 0px 0px",
    "rgba(255, 255, 255, 0.03) 0px 2px 0px 0px"
  );

  function handleOnImport(fields: Fields) {
    form.setValue("about", fields.about);
    form.setValue("section", fields.section);
  }

  return (
    <Box
      backgroundColor={backgroundColor}
      boxShadow={boxShadow}
      as="header"
      padding="2"
      position="fixed"
      left="0"
      top="0"
      right="0"
      zIndex="3"
    >
      <Flex as="nav" justifyContent="space-between">
        <Logo />
        <ResumeTitle />
        <Flex>
          <Button
            mr="2"
            size="sm"
            onClick={() => utils.exportAsPdf(form.getValues())}
          >
            Export PDF
          </Button>
          <HeaderPopover onImport={handleOnImport} />
        </Flex>
      </Flex>
    </Box>
  );
}

function Document(props: { form: UseFormReturn<Resume, object> }) {
  const { form } = props;
  const [isFullWidth] = useLocalStorageValue("isFullWidth", false, {
    initializeWithStorageValue: false,
  });
  const [_resume, setResume] = useResume({ isolated: true });
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
      animate={{ width: isFullWidth ? "100%" : "900px" }}
      margin="0 auto"
      backgroundColor="#fff"
    >
      {document}
    </Box>
  );
}

function Builder() {
  const [resume] = useResume();
  const form = useForm<Resume>({ defaultValues: DEFAULT_VALUES });
  useAutoSaveToast({});

  return (
    <>
      <Head>
        <title>{resume?.title} - resumebuilder.dev</title>
      </Head>
      <Header form={form} />
      <Grid
        as="main"
        templateColumns="340px 1fr"
        paddingTop="calc(2rem + 48px)"
        paddingBottom="8"
        height="100vh"
      >
        <Tabs>
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
