import { ColorMode } from "@chakra-ui/react";
import { UseFormRegister, FieldArrayWithId } from "react-hook-form";

type Resume = {
  id: string;
  name: string;
  updated: number;
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

export type { Resume, ChakraThemeConfig, Register };
