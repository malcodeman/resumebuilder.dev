import React from "react";
import Head from "next/head";
import {
  Grid,
  Box,
  Center,
  Spinner,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { isNil } from "ramda";
import { useMediaQuery, useMountEffect } from "@react-hookz/web";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import Sections from "../../../components/sections/Sections";
import Header from "../../../components/builder/Header";
import HeaderMobile from "../../../components/builder/HeaderMobile";
import Document from "../../../components/builder/Document";
import NotFound from "../../../components/misc/NotFound";
import TemplatesTabPanel from "../../../components/builder/TemplatesTabPanel";
import Preview from "../../../components/builder/Preview";

import useResume from "../../../hooks/useResume";
import useAutoSaveToast from "../../../hooks/useAutoSaveToast";
import useLocalStorage from "../../../hooks/useLocalStorage";
import utils from "../../../lib/utils";

import { Resume, Template } from "../../../types";

function Builder() {
  const { t } = useTranslation();
  const { resume, isLoading } = useResume({ isolated: true });
  const form = useForm<Resume>();
  const [_viewDashboard, setViewDashboard] = useLocalStorage("view-dashboard");
  const isLargeDevice = useMediaQuery("(min-width: 62em)");

  React.useEffect(() => {
    if (resume) {
      form.reset(resume);
    }
  }, [resume, form]);

  useMountEffect(() => {
    setViewDashboard(true);
  });

  useAutoSaveToast({});

  function handleOnChangeTemplate(nextTemplate: Template) {
    form.setValue("updatedAt", Date.now());
    form.setValue("design.template", nextTemplate);
  }

  if (isLoading) {
    return (
      <Center flexDirection="column" minH="100vh" padding="4">
        <Spinner />
      </Center>
    );
  }

  if (isNil(resume)) {
    return (
      <>
        <Head>
          <title>Resume not found | resumebuilder.dev</title>
        </Head>
        <NotFound description={t("resume_404_description")} link="/resumes" />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{resume.title} | resumebuilder.dev</title>
      </Head>
      {isLargeDevice ? <Header form={form} /> : null}
      <Grid
        as="main"
        templateColumns={{ base: "1fr", lg: "340px 1fr" }}
        paddingTop={{ base: "0", lg: "48px" }}
        paddingBottom={{ base: "54px", lg: "0" }}
        height="100vh"
      >
        <Tabs size="sm" paddingTop="8" overflowY="hidden" isFitted>
          <TabList>
            <Tab data-cy="sections-tab">{t("sections")}</Tab>
            <Tab data-cy="templates-tab">{t("templates")}</Tab>
            {isLargeDevice ? null : (
              <Tab data-cy="preview-tab">{t("preview")}</Tab>
            )}
          </TabList>
          <TabPanels height="calc(100% - 31px)">
            <TabPanel height="full" padding="0">
              <Sections form={form} />
            </TabPanel>
            <TabPanel height="full" padding="0">
              <TemplatesTabPanel onChangeTemplate={handleOnChangeTemplate} />
            </TabPanel>
            {isLargeDevice ? null : (
              <TabPanel height="full" padding="0">
                <Box
                  paddingTop="2"
                  paddingInlineEnd="4"
                  paddingBottom="2"
                  paddingInlineStart="4"
                  overflowY="auto"
                  sx={utils.getScrollbarStyle()}
                >
                  <Preview form={form} />
                </Box>
              </TabPanel>
            )}
          </TabPanels>
        </Tabs>
        <Box
          overflowY="auto"
          display={{ base: "none", lg: "block" }}
          padding="8"
          backgroundColor="var(--chakra-colors-blackAlpha-50)"
          sx={utils.getScrollbarStyle()}
        >
          <Document form={form} />
        </Box>
      </Grid>
      {isLargeDevice ? null : <HeaderMobile form={form} />}
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default Builder;
