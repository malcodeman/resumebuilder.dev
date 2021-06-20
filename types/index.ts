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
  employment: {
    jobTitle: string;
    companyName: string;
    startDate: string;
    endDate: string;
    city: string;
    description: string;
  }[];
  education: {
    school: string;
    degree: string;
    startDate: string;
    endDate: string;
    city: string;
    description: string;
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
type Register = UseFormRegister<{
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  summary: string;
  employment: {
    jobTitle: string;
    companyName: string;
    startDate: string;
    endDate: string;
    city: string;
    description: string;
  }[];
  education: {
    school: string;
    degree: string;
    startDate: string;
    endDate: string;
    city: string;
    description: string;
  }[];
  skill: {
    name: string;
  }[];
}>;

export type { Resume, ChakraThemeConfig, Register, Fields };
export { Template };
