import { ColorMode } from "@chakra-ui/react";
import { UseFormRegister } from "react-hook-form";

enum Template {
  berlin = "berlin",
  tokyo = "tokyo",
}
type Fields = {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  summary: string;
  standardSection: {
    label: string;
    nested: {
      title: string;
      subtitle: string;
      website: string;
      city: string;
      startDate: string;
      endDate: string;
      description: string;
    }[];
  }[];
  skill: {
    name: string;
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

export type { Resume, ChakraThemeConfig, Register, Fields };
export { Template };
