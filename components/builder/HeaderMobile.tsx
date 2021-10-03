import {
  Text,
  Flex,
  Box,
  Container,
  HTMLChakraProps,
  useColorModeValue,
} from "@chakra-ui/react";
import { Home } from "react-feather";
import { UseFormReturn } from "react-hook-form";

import NavLink from "../misc/NavLink";
import HeaderPopover from "./HeaderPopover";
import ResumeTitle from "./ResumeTitle";

import utils from "../../lib/utils";

import { Resume, Fields, Template } from "../../types";

type props = HTMLChakraProps<"div"> & {
  form: UseFormReturn<Resume, object>;
};

function HeaderMobile(props: props) {
  const { form } = props;
  const backgroundColor = useColorModeValue("white", "gray.800");
  const boxShadow = useColorModeValue(
    "rgba(0, 0, 0, 0.03) 0px -2px 0px 0px",
    "rgba(255, 255, 255, 0.03) 0 -2px 0 0"
  );

  function handleOnImport(fields: Fields) {
    form.setValue("about", fields.about);
    form.setValue("section", fields.section);
  }

  function handleOnChangeTemplate(nextTemplate: Template) {
    form.setValue("design.template", nextTemplate);
  }

  return (
    <Box
      {...props}
      backgroundColor={backgroundColor}
      boxShadow={boxShadow}
      as="header"
      paddingY="2"
      position="fixed"
      left="0"
      right="0"
      bottom="0"
      zIndex="1"
    >
      <Container maxW="container.lg">
        <Flex as="nav" justifyContent="space-between" alignItems="center">
          <NavLink href="/">
            <Flex flexDirection="column" alignItems="center">
              <Home size={20} />
              <Text fontSize="xs">Home</Text>
            </Flex>
          </NavLink>
          <ResumeTitle form={form} marginX="2" />
          <HeaderPopover
            values={form.getValues()}
            onImport={handleOnImport}
            onChangeTemplate={handleOnChangeTemplate}
            onPdfExport={() => utils.exportAsPdf(form.getValues())}
            onJsonExport={() => utils.exportAsJson(form.getValues())}
            onHtmlExport={() => utils.exportAsHtml(form.getValues())}
            onPngExport={() => utils.exportAsPng(form.getValues())}
          />
        </Flex>
      </Container>
    </Box>
  );
}

export default HeaderMobile;
