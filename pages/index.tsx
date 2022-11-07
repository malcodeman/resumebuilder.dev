import Head from "next/head";
import { useMountEffect } from "@react-hookz/web";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import useLocalStorage from "../hooks/useLocalStorage";

import Layout from "../components/Layout";
import Faq from "../components/landing/Faq";
import Footer from "../components/landing/Footer";
import Features from "../components/landing/Features";
import Templates from "../components/landing/Templates";
import Builder from "../components/landing/Builder";
import Hero from "../components/landing/Hero";

function Landing() {
  const [_viewDashboard, setViewDashboard] = useLocalStorage("view-dashboard");

  useMountEffect(() => {
    setViewDashboard(false);
  });

  return (
    <>
      <Head>
        <title>Free Resume Builder for Developers | resumebuilder.dev</title>
      </Head>
      <Layout>
        <Hero />
        <Templates />
        <Features />
        <Builder />
        <Faq />
        <Footer />
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
