import { ColorMode } from "@chakra-ui/react";

type Resume = {
  id: string;
  name: string;
  updated: number;
};
type ChakraThemeConfig = {
  initialColorMode: ColorMode;
  useSystemColorMode: boolean;
};

export type { Resume, ChakraThemeConfig };
