import Head from "next/head";
import { useMountEffect } from "@react-hookz/web";

import useLocalStorage from "../hooks/useLocalStorage";

import Layout from "../components/Layout";
import Faq from "../components/landing/Faq";
import GetStarted from "../components/landing/GetStarted";
import Features from "../components/landing/Features";
import Templates from "../components/landing/Templates";
import Builder from "../components/landing/Builder";
import Hero from "../components/landing/Hero";
import Footer from "../components/misc/Footer";

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
        <GetStarted />
        <Footer />
      </Layout>
    </>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      messages: (await import(`../../messages/${locale}.json`)).default,
    },
  };
}

export default Landing;
