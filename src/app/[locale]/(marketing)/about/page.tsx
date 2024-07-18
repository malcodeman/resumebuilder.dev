import { Metadata } from "next";
import { About } from "app/[locale]/(marketing)/_components/About";

export const metadata: Metadata = {
  title: "About | resumebuilder.dev",
};

function AboutPage() {
  return <About />;
}

export default AboutPage;
