import { ColorMode } from "@chakra-ui/react";
import { UseFormRegister } from "react-hook-form";

enum Template {
  berlin = "berlin",
  tokyo = "tokyo",
  london = "london",
  rio = "rio",
}
type Section =
  | "standardSection"
  | "employmentSection"
  | "internshipsSection"
  | "educationSection"
  | "projectsSection"
  | "tagListSection"
  | "skillsSection"
  | "hobbiesSection"
  | "languagesSection";
type AboutField = {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  website: string;
  city: string;
  country: string;
  summary: string;
};
type SectionField = {
  name: Section;
  label: string;
  tags?: string;
  nested?: {
    title: string;
    subtitle: string;
    website: string;
    city: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
};
type Fields = {
  about: AboutField;
  section: SectionField[];
};
type Design = {
  template: Template;
  spacing: number;
};
type Resume = {
  id: string;
  title: string;
  icon: string;
  createdAt: number;
  updatedAt: number;
  design: Design;
  about: AboutField;
  section: SectionField[];
};
type ChakraThemeConfig = {
  initialColorMode: ColorMode;
  useSystemColorMode: boolean;
};
type Register = UseFormRegister<Fields>;
type Export = "pdf" | "json" | "html" | "png";
type View = "grid" | "list";
type Phrase = {
  id: string;
  phrase: string;
};

export type {
  Resume,
  ChakraThemeConfig,
  Register,
  Fields,
  Section,
  Export,
  View,
  Design,
  AboutField,
  Phrase,
};
export { Template };
