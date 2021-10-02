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

import Logo from "../Logo";
import HeaderPopover from "./HeaderPopover";
import ResumeTitle from "./ResumeTitle";
import TemplatesModal from "./TemplatesModal";

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

  function handleOnImport(fields: Fields) {
    form.setValue("about", fields.about);
    form.setValue("section", fields.section);
  }

  function handleOnChangeTemplate(nextTemplate: Template) {
    form.setValue("meta.template", nextTemplate);
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
          <ShowTemplates
            values={form.getValues()}
            onChangeTemplate={handleOnChangeTemplate}
          />
          <Button
            mr="2"
            size="sm"
            onClick={() => utils.exportAsPdf(form.getValues())}
          >
            Export PDF
          </Button>
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
      </Flex>
    </Box>
  );
}

export default Header;
