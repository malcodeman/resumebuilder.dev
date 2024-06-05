"use client";
import React, { useEffect } from "react";
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
import { equals, isNil } from "ramda";
import { useMediaQuery, useMountEffect } from "@react-hookz/web";
import { useTranslations } from "next-intl";
import Sections from "components/sections/Sections";
import Header from "components/builder/Header";
import HeaderMobile from "components/builder/HeaderMobile";
import Document from "components/builder/Document";
import NotFound from "components/misc/NotFound";
import TemplatesTabPanel from "components/builder/TemplatesTabPanel";
import Preview from "components/builder/Preview";
import useResume from "hooks/useResume";
import useAutoSaveToast from "hooks/useAutoSaveToast";
import useLocalStorage from "hooks/useLocalStorage";
import utils from "lib/utils";
import { Resume, Template } from "types";
import Resize from "components/misc/Resize";

function Builder() {
  const t = useTranslations();
  const { resume, isLoading } = useResume();
  const form = useForm<Resume>();
  const [_viewDashboard, setViewDashboard] = useLocalStorage("view-dashboard");
  const isLargeDevice = useMediaQuery("(min-width: 62em)", {
    initializeWithValue: false,
  });

  React.useEffect(() => {
    if (resume && !equals(form.getValues(), resume)) {
      form.reset(resume);
    }
  }, [resume, form]);

  useMountEffect(() => {
    setViewDashboard(true);
  });

  useEffect(() => {
    if (resume) {
      document.title = `${resume.title} | resumebuilder.dev`;
    }
  }, [resume]);

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
      <NotFound description={t("resume_404_description")} link="/resumes" />
    );
  }

  return (
    <>
      {isLargeDevice ? <Header form={form} /> : null}
      <Grid
        as="main"
        templateColumns={{ base: "1fr", lg: "auto 1fr" }}
        paddingTop={{ base: "0", lg: "48px" }}
        paddingBottom={{ base: "54px", lg: "0" }}
        height="100vh"
      >
        <Resize>
          <Tabs size="sm" paddingTop="8" overflowY="hidden" isFitted>
            <TabList>
              <Tab data-testid="sections-tab">{t("sections")}</Tab>
              <Tab data-testid="templates-tab">{t("templates")}</Tab>
              {isLargeDevice ? null : (
                <Tab data-testid="preview-tab">{t("preview")}</Tab>
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
        </Resize>
        <Box
          overflowY="auto"
          display={{ base: "none", lg: "block" }}
          padding="8"
          backgroundColor="var(--chakra-colors-blackAlpha-50)"
          sx={utils.getScrollbarStyle()}
          data-testid="document"
        >
          <Document form={form} />
        </Box>
      </Grid>
      {isLargeDevice ? null : <HeaderMobile form={form} />}
    </>
  );
}

export default Builder;
