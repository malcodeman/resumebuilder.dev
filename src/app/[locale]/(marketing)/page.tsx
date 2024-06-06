"use client";
import { useMountEffect } from "@react-hookz/web";
import useLocalStorage from "hooks/useLocalStorage";
import Layout from "components/Layout";
import Faq from "app/[locale]/(marketing)/_components/Faq";
import GetStarted from "app/[locale]/(marketing)/_components/GetStarted";
import Features from "app/[locale]/(marketing)/_components/Features";
import Templates from "app/[locale]/(marketing)/_components/Templates";
import Builder from "app/[locale]/(marketing)/_components/Builder";
import Hero from "app/[locale]/(marketing)/_components/Hero";
import Footer from "app/[locale]/(marketing)/_components/Footer";

function Landing() {
  const [_viewDashboard, setViewDashboard] = useLocalStorage("view-dashboard");

  useMountEffect(() => {
    setViewDashboard(false);
  });

  return (
    <Layout>
      <Hero />
      <Templates />
      <Features />
      <Builder />
      <Faq />
      <GetStarted />
      <Footer />
    </Layout>
  );
}

export default Landing;
