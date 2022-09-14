import {
  Text,
  Flex,
  Box,
  Container,
  useColorModeValue,
} from "@chakra-ui/react";
import { Home } from "react-feather";
import { FormProvider, UseFormReturn } from "react-hook-form";
import { trackGoal } from "fathom-client";
import { useLocalStorageValue } from "@react-hookz/web";

import NavLink from "../misc/NavLink";
import HeaderPopover from "./HeaderPopover";
import ResumeTitle from "./ResumeTitle";

import { FATHOM_EVENTS } from "../../lib/constants";
import utils from "../../lib/utils";

import { Resume, Fields, Template } from "../../types";

type props = {
  form: UseFormReturn<Resume, object>;
};

function HeaderMobile(props: props) {
  const { form } = props;
  const backgroundColor = useColorModeValue("white", "gray.800");
  const boxShadow = useColorModeValue(
    "rgba(0, 0, 0, 0.03) 0px -2px 0px 0px",
    "rgba(255, 255, 255, 0.03) 0 -2px 0 0"
  );
  const [devTools] = useLocalStorageValue("devTools", false, {
    initializeWithStorageValue: false,
  });

  function handleOnImport(fields: Fields) {
    form.setValue("updatedAt", Date.now());
    form.setValue("about", fields.about);
    form.setValue("section", fields.section);
  }

  function handleOnChangeTemplate(nextTemplate: Template) {
    form.setValue("updatedAt", Date.now());
    form.setValue("design.template", nextTemplate);
  }

  function handleOnExportAsPdf() {
    utils.exportAsPdf(form.getValues());
    trackGoal(FATHOM_EVENTS.EXPORT_AS_PDF, 0);
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
          <NavLink href="/resumes">
            <Flex flexDirection="column" alignItems="center">
              <Home size={20} />
              <Text fontSize="xs">Home</Text>
            </Flex>
          </NavLink>
          <ResumeTitle form={form} marginX="2" />
          <FormProvider {...form}>
            <HeaderPopover
              devTools={devTools}
              onImport={handleOnImport}
              onChangeTemplate={handleOnChangeTemplate}
              onPdfExport={handleOnExportAsPdf}
              onJsonExport={() => utils.exportAsJson(form.getValues())}
              onHtmlExport={() => utils.exportAsHtml(form.getValues())}
              onPngExport={() => utils.exportAsPng(form.getValues())}
            />
          </FormProvider>
        </Flex>
      </Container>
    </Box>
  );
}

export default HeaderMobile;
