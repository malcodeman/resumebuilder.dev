import {
  Text,
  Flex,
  Box,
  Container,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiHome } from "react-icons/fi";
import { FormProvider, UseFormReturn } from "react-hook-form";
import { useTranslations } from "next-intl";
import NavLink from "../misc/NavLink";
import HeaderPopover from "./HeaderPopover";
import ResumeTitle from "./ResumeTitle";

import utils from "../../lib/utils";
import useLocalStorage from "../../hooks/useLocalStorage";
import useProfilePicture from "../../hooks/useProfilePicture";

import { Resume, Fields } from "../../types";

type props = {
  form: UseFormReturn<Resume, object>;
};

function HeaderMobile(props: props) {
  const { form } = props;
  const t = useTranslations();
  const backgroundColor = useColorModeValue("white", "gray.800");
  const boxShadow = useColorModeValue(
    "rgba(0, 0, 0, 0.03) 0px -2px 0px 0px",
    "rgba(255, 255, 255, 0.03) 0 -2px 0 0"
  );
  const [devTools] = useLocalStorage("dev-tools");
  const [profilePicture] = useProfilePicture();
  const [hideSensitiveData] = useLocalStorage("hide-sensitive-data");

  function handleOnImport(fields: Fields) {
    form.setValue("updatedAt", Date.now());
    form.setValue("about", fields.about);
    form.setValue("section", fields.section);
  }

  function handleOnExportAsPdf() {
    utils.exportAsPdf({
      resume: form.getValues(),
      profilePicture,
      hideSensitiveData,
    });
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
              <FiHome />
              <Text fontSize="xs">{t("home")}</Text>
            </Flex>
          </NavLink>
          <ResumeTitle form={form} marginX="2" />
          <FormProvider {...form}>
            <HeaderPopover
              devTools={devTools}
              onImport={handleOnImport}
              onPdfExport={handleOnExportAsPdf}
              onJsonExport={() => utils.exportAsJson(form.getValues())}
              onHtmlExport={handleOnExportAsHtml}
              onPngExport={() => utils.exportAsPng(form.getValues())}
            />
          </FormProvider>
        </Flex>
      </Container>
    </Box>
  );
}

export default HeaderMobile;
