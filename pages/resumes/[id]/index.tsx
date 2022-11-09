import React from "react";
import Head from "next/head";
import { Grid, Box, Center, Spinner } from "@chakra-ui/react";
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

import useResume from "../../../hooks/useResume";
import useAutoSaveToast from "../../../hooks/useAutoSaveToast";
import useLocalStorage from "../../../hooks/useLocalStorage";
import utils from "../../../lib/utils";

import { Resume } from "../../../types";

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
        <Sections form={form} />
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