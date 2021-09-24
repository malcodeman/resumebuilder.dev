import React from "react";
import Head from "next/head";
import {
  Grid,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
  Text,
  Center,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useMediaQuery, useIsomorphicLayoutEffect } from "@react-hookz/web";
import * as R from "ramda";
import Link from "next/link";

import Sections from "../../components/sections/Sections";
import Templates from "../../components/templates/Templates";
import Header from "../../components/builder/Header";
import HeaderMobile from "../../components/builder/HeaderMobile";
import Document from "../../components/builder/Document";
import DocumentMobile from "../../components/builder/DocumentMobile";

import { DEFAULT_VALUES } from "../../lib/constants";
import useResume from "../../hooks/useResume";
import useAutoSaveToast from "../../hooks/useAutoSaveToast";

import { Resume } from "../../types";

function Builder() {
  const [resume, isLoading] = useResume();
  const form = useForm<Resume>({ defaultValues: DEFAULT_VALUES });
  const [tabIndex, setTabIndex] = React.useState(0);
  const isWide = useMediaQuery("(min-width: 62em)");

  useAutoSaveToast({});

  useIsomorphicLayoutEffect(() => {
    if (isWide) {
      setTabIndex(0);
    }
  }, [isWide]);

  if (isLoading) {
    return (
      <Center flexDirection="column" height="100vh" padding="4">
        <Spinner />
      </Center>
    );
  }

  if (R.isNil(resume)) {
    return (
      <>
        <Head>
          <title>Resume not found - resumebuilder.dev</title>
        </Head>
        <Center flexDirection="column" height="100vh" padding="4">
          <Text mb="2" fontSize="4xl">
            404
          </Text>
          <Text marginBottom="4">We’re sorry. This resume was not found.</Text>
          <Link href="/" passHref>
            <Button>Return home</Button>
          </Link>
        </Center>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{resume.title} - resumebuilder.dev</title>
      </Head>
      <Header form={form} display={{ base: "none", lg: "block" }} />
      <Grid
        as="main"
        templateColumns={{ base: "1fr", lg: "340px 1fr" }}
        paddingTop={{ base: "8", lg: "calc(2rem + 48px)" }}
        paddingBottom={{ base: "calc(2rem + 54px)", lg: "8" }}
        height="100vh"
      >
        <Tabs
          isLazy
          isFitted
          index={tabIndex}
          onChange={(index) => setTabIndex(index)}
        >
          <TabList>
            <Tab>Sections</Tab>
            <Tab>Templates</Tab>
            <Tab display={{ base: "flex", lg: "none" }}>Preview</Tab>
          </TabList>
          <TabPanels>
            <TabPanel padding="0">
              <Sections form={form} />
            </TabPanel>
            <TabPanel>
              <Templates form={form} />
            </TabPanel>
            <TabPanel display={{ base: "block", lg: "none" }}>
              <DocumentMobile form={form} />
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Document form={form} />
      </Grid>
      <HeaderMobile form={form} display={{ base: "block", lg: "none" }} />
    </>
  );
}

export default Builder;
