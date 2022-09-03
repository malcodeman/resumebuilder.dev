import {
  Box,
  Button,
  Flex,
  HTMLChakraProps,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { UseFormReturn } from "react-hook-form";
import { Layers as IconLayers } from "react-feather";
import { trackGoal } from "fathom-client";
import { useLocalStorageValue } from "@react-hookz/web";

import Logo from "../Logo";
import HeaderPopover from "./HeaderPopover";
import ResumeTitle from "./ResumeTitle";
import TemplatesModal from "../templates/TemplatesModal";

import { FATHOM_EVENTS } from "../../lib/constants";
import utils from "../../lib/utils";

import { Resume, Fields, Template } from "../../types";

type props = HTMLChakraProps<"div"> & {
  form: UseFormReturn<Resume, object>;
};

function ShowTemplates(props: {
  values: Resume;
  onChangeTemplate: (nextTemplate: Template) => void;
}) {
  const { values, onChangeTemplate } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        mr="2"
        size="sm"
        leftIcon={<IconLayers size={20} />}
        onClick={onOpen}
      >
        Templates
      </Button>
      <TemplatesModal
        isOpen={isOpen}
        values={values}
        onClose={onClose}
        onChange={onChangeTemplate}
      />
    </>
  );
}

function Header(props: props) {
  const { form } = props;
  const backgroundColor = useColorModeValue("white", "gray.800");
  const boxShadow = useColorModeValue(
    "rgba(0, 0, 0, 0.03) 0px 2px 0px 0px",
    "rgba(255, 255, 255, 0.03) 0px 2px 0px 0px"
  );
  const [devTools] = useLocalStorageValue("devTools", false, {
    initializeWithStorageValue: false,
  });

  function handleOnImport(fields: Fields) {
    form.setValue("about", fields.about);
    form.setValue("section", fields.section);
  }

  function handleOnChangeTemplate(nextTemplate: Template) {
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
      padding="2"
      position="fixed"
      left="0"
      top="0"
      right="0"
      zIndex="3"
    >
      <Flex as="nav" justifyContent="space-between">
        <Logo href="/resumes" />
        <ResumeTitle form={form} />
        <Flex>
          <ShowTemplates
            values={form.getValues()}
            onChangeTemplate={handleOnChangeTemplate}
          />
          <Button mr="2" size="sm" onClick={handleOnExportAsPdf}>
            Export PDF
          </Button>
          <HeaderPopover
            values={form.getValues()}
            devTools={devTools}
            onImport={handleOnImport}
            onChangeTemplate={handleOnChangeTemplate}
            onPdfExport={handleOnExportAsPdf}
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
