"use client";
import { useMountEffect } from "@react-hookz/web";
import useLocalStorage from "hooks/useLocalStorage";
import Layout from "components/Layout";
import Faq from "app/[locale]/components/Faq";
import GetStarted from "app/[locale]/components/GetStarted";
import Features from "app/[locale]/components/Features";
import Templates from "app/[locale]/components/Templates";
import Builder from "app/[locale]/components/Builder";
import Hero from "app/[locale]/components/Hero";
import Footer from "app/[locale]/components/Footer";

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
