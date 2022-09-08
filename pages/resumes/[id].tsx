import React from "react";
import Head from "next/head";
import { Grid, Box, Text, Center, Button, Spinner } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { isNil } from "ramda";
import Link from "next/link";
import { useMountEffect } from "@react-hookz/web";

import Sections from "../../components/sections/Sections";
import Header from "../../components/builder/Header";
import HeaderMobile from "../../components/builder/HeaderMobile";
import Document from "../../components/builder/Document";

import { DEFAULT_VALUES } from "../../lib/constants";

import useResume from "../../hooks/useResume";
import useAutoSaveToast from "../../hooks/useAutoSaveToast";
import useDashboard from "../../hooks/useDashboard";

import { Resume } from "../../types";

function Builder() {
  const { resume, isLoading } = useResume();
  const form = useForm<Resume>({ defaultValues: DEFAULT_VALUES });
  const { setDashboard } = useDashboard();

  useMountEffect(() => {
    setDashboard(true);
  });

  useAutoSaveToast({});

  if (isLoading) {
    return (
      <Center flexDirection="column" height="100vh" padding="4">
        <Spinner />
      </Center>
    );
  }

  if (isNil(resume)) {
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
        <title>{resume.title} | resumebuilder.dev</title>
      </Head>
      <Header form={form} display={{ base: "none", lg: "block" }} />
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
          paddingTop={{ base: "8" }}
          style={{ scrollbarWidth: "thin" }}
        >
          <Document form={form} />
        </Box>
      </Grid>
      <HeaderMobile form={form} display={{ base: "block", lg: "none" }} />
    </>
  );
}

export default Builder;
