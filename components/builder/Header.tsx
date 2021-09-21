import {
  Box,
  Button,
  Flex,
  HTMLChakraProps,
  useColorModeValue,
} from "@chakra-ui/react";
import { UseFormReturn } from "react-hook-form";

import Logo from "../Logo";
import HeaderPopover from "./HeaderPopover";
import ResumeTitle from "./ResumeTitle";

import utils from "../../lib/utils";

import { Resume, Fields } from "../../types";

type props = HTMLChakraProps<"div"> & {
  form: UseFormReturn<Resume, object>;
};

function Header(props: props) {
  const { form } = props;
  const backgroundColor = useColorModeValue("white", "gray.800");
  const boxShadow = useColorModeValue(
    "rgba(0, 0, 0, 0.03) 0px 2px 0px 0px",
    "rgba(255, 255, 255, 0.03) 0px 2px 0px 0px"
  );

  function handleOnImport(fields: Fields) {
    form.setValue("about", fields.about);
    form.setValue("section", fields.section);
  }

  return (
    <Box
      {...props}
      backgroundColor={backgroundColor}
      boxShadow={boxShadow}
      as="header"
      padding="2"
      position="fixed"
      left="0"
      top="0"
      right="0"
      zIndex="3"
    >
      <Flex as="nav" justifyContent="space-between">
        <Logo />
        <ResumeTitle form={form} />
        <Flex>
          <Button
            mr="2"
            size="sm"
            onClick={() => utils.exportAsPdf(form.getValues())}
          >
            Export PDF
          </Button>
          <HeaderPopover
            onImport={handleOnImport}
            onPdfExport={() => utils.exportAsPdf(form.getValues())}
            onJsonExport={() => utils.exportAsJson(form.getValues())}
            onHtmlExport={() => utils.exportAsHtml(form.getValues())}
            onPngExport={() => utils.exportAsPng(form.getValues())}
          />
        </Flex>
      </Flex>
    </Box>
  );
}

export default Header;
