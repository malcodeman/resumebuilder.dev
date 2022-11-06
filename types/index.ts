import { ColorMode } from "@chakra-ui/react";
import { UseFormRegister } from "react-hook-form";

type Template = "berlin" | "tokyo" | "london" | "rio" | "nairobi";
type Section =
  | "standard"
  | "employment"
  | "internships"
  | "education"
  | "projects"
  | "tagList"
  | "skills"
  | "hobbies"
  | "languages";
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
  version: string;
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
type LocalStorageKey =
  | "dev-tools"
  | "hide-sensitive-data"
  | "is-full-width"
  | "is-pdf-viewer"
  | "view-dashboard";
type TemplateProps = {
  isPdf?: boolean;
  hideSensitiveData?: boolean;
  design: Design;
  fields: Fields;
  profilePicture: string;
};
type TemplateTags = "all" | "simple" | "creative" | "professional";

export type {
  Template,
  Resume,
  ChakraThemeConfig,
  Register,
  Fields,
  Section,
  Export,
  View,
  Design,
  AboutField,
  SectionField,
  Phrase,
  LocalStorageKey,
  TemplateProps,
  TemplateTags,
};
