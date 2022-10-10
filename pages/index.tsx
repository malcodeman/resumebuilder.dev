import Head from "next/head";
import { Divider } from "@chakra-ui/react";
import { useMountEffect } from "@react-hookz/web";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Layout from "../components/Layout";
import Faq from "../components/landing/Faq";
import Footer from "../components/landing/Footer";
import Features from "../components/landing/Features";
import Templates from "../components/landing/Templates";
import Builder from "../components/landing/Builder";
import Hero from "../components/landing/Hero";

import { DEFAULT_VALUES } from "../lib/constants";

import { Template } from "../types";

import useResumes from "../hooks/useResumes";
import useDashboard from "../hooks/useDashboard";

function Landing() {
  const { setDashboard } = useDashboard();
  const router = useRouter();
  const { createNew } = useResumes();

  useMountEffect(() => {
    setDashboard(false);
  });

  function handleOnSubmit(template = Template.berlin) {
    const design = {
      ...DEFAULT_VALUES.design,
      template,
    };
    const resume = createNew({ design });
    router.push(`/resumes/${resume.id}`);
  }

  return (
    <>
      <Head>
        <title>Free Resume Builder for Developers | resumebuilder.dev</title>
      </Head>
      <Layout>
        <Hero />
        <Templates onSubmit={handleOnSubmit} />
        <Divider marginY="16" />
        <Features />
        <Divider marginY="16" />
        <Builder />
        <Divider marginY="16" />
        <Faq />
        <Footer onSubmit={handleOnSubmit} />
      </Layout>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default Landing;
