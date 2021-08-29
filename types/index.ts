import { ColorMode } from "@chakra-ui/react";
import { UseFormRegister } from "react-hook-form";

enum Template {
  berlin = "berlin",
  tokyo = "tokyo",
}
type Section = "standardSection" | "tagListSection";
type Fields = {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  summary: string;
  section: {
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
  }[];
};
type Resume = {
  id: string;
  name: string;
  updated: number;
  template: Template;
  fields: Fields;
};
type ChakraThemeConfig = {
  initialColorMode: ColorMode;
  useSystemColorMode: boolean;
};
type Register = UseFormRegister<Fields>;
type Export = "pdf" | "json";

export type { Resume, ChakraThemeConfig, Register, Fields, Section, Export };
export { Template };
