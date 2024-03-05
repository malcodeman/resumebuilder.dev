import { extendTheme } from "@chakra-ui/react";
import { ChakraThemeConfig } from "types";

const config: ChakraThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};
const theme = extendTheme({ config });

export default theme;
