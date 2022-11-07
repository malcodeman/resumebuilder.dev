import {
  Box,
  Button,
  Flex,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { FormProvider, UseFormReturn } from "react-hook-form";
import { FiLayers } from "react-icons/fi";
import { trackGoal } from "fathom-client";
import { useTranslation } from "next-i18next";
import { useNetworkState } from "@react-hookz/web";

import Logo from "../Logo";
import HeaderPopover from "./HeaderPopover";
import ResumeTitle from "./ResumeTitle";
import TemplatesModal from "../templates/TemplatesModal";
import OfflineTag from "../misc/OfflineTag";

import { FATHOM_EVENTS } from "../../lib/constants";
import utils from "../../lib/utils";
import useLocalStorage from "../../hooks/useLocalStorage";
import useProfilePicture from "../../hooks/useProfilePicture";

import { Resume, Fields, Template } from "../../types";

type props = {
  form: UseFormReturn<Resume, object>;
};

function ShowTemplates(props: {
  onChangeTemplate: (nextTemplate: Template) => void;
}) {
  const { onChangeTemplate } = props;
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        mr="2"
        size="sm"
        leftIcon={<FiLayers />}
        onClick={onOpen}
        data-cy="header-templates-button"
      >
        {t("templates")}
      </Button>
      <TemplatesModal
        isOpen={isOpen}
        onClose={onClose}
        onChange={onChangeTemplate}
      />
    </>
  );
}

function Header(props: props) {
  const { form } = props;
  const { t } = useTranslation();
  const backgroundColor = useColorModeValue("white", "gray.800");
  const boxShadow = useColorModeValue(
    "rgba(0, 0, 0, 0.03) 0px 2px 0px 0px",
    "rgba(255, 255, 255, 0.03) 0px 2px 0px 0px"
  );
  const [devTools] = useLocalStorage("dev-tools");
  const [profilePicture] = useProfilePicture();
  const [hideSensitiveData] = useLocalStorage("hide-sensitive-data");
  const network = useNetworkState();

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
    utils.exportAsPdf({
      resume: form.getValues(),
      profilePicture,
      hideSensitiveData,
    });
    trackGoal(FATHOM_EVENTS.EXPORT_AS_PDF, 0);
  }

  function handleOnExportAsHtml() {
    utils.exportAsHtml({
      resume: form.getValues(),
      profilePicture,
      hideSensitiveData,
    });
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
          {network.online ? null : <OfflineTag mr="2" />}
          <ShowTemplates onChangeTemplate={handleOnChangeTemplate} />
          <Button
            mr="2"
            size="sm"
            onClick={handleOnExportAsPdf}
            data-cy="header-export-pdf-button"
          >
            {t("export_pdf")}
          </Button>
          <FormProvider {...form}>
            <HeaderPopover
              devTools={devTools}
              onImport={handleOnImport}
              onChangeTemplate={handleOnChangeTemplate}
              onPdfExport={handleOnExportAsPdf}
              onJsonExport={() => utils.exportAsJson(form.getValues())}
              onHtmlExport={handleOnExportAsHtml}
              onPngExport={() => utils.exportAsPng(form.getValues())}
            />
          </FormProvider>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Header;
