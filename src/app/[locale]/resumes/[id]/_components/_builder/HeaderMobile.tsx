import {
  Text,
  Flex,
  Box,
  Container,
  useColorModeValue,
} from "@chakra-ui/react";
import { HomeIcon } from "lucide-react";
import { FormProvider, UseFormReturn } from "react-hook-form";
import { useTranslations } from "next-intl";
import NavLink from "components/misc/NavLink";
import HeaderPopover from "app/[locale]/resumes/[id]/_components/_builder/HeaderPopover";
import ResumeTitle from "app/[locale]/resumes/[id]/_components/_builder/ResumeTitle";
import utils from "lib/utils";
import useLocalStorage from "hooks/useLocalStorage";
import useProfilePicture from "hooks/useProfilePicture";
import { Resume, Fields } from "types";

type Props = {
  form: UseFormReturn<Resume, object>;
};

function HeaderMobile(props: Props) {
  const { form } = props;
  const t = useTranslations();
  const backgroundColor = useColorModeValue("white", "gray.800");
  const boxShadow = useColorModeValue(
    "rgba(0, 0, 0, 0.03) 0px -2px 0px 0px",
    "rgba(255, 255, 255, 0.03) 0 -2px 0 0"
  );
  const devTools = useLocalStorage("dev-tools");
  const profilePicture = useProfilePicture();
  const hideSensitiveData = useLocalStorage("hide-sensitive-data");

  function handleOnImport(fields: Fields) {
    form.setValue("updatedAt", Date.now());
    form.setValue("about", fields.about);
    form.setValue("section", fields.section);
  }

  function handleOnExportAsPdf() {
    utils.exportAsPdf({
      resume: form.getValues(),
      profilePicture: profilePicture.value,
      hideSensitiveData: hideSensitiveData.value,
    });
  }

  function handleOnExportAsHtml() {
    utils.exportAsHtml({
      resume: form.getValues(),
      profilePicture: profilePicture.value,
      hideSensitiveData: hideSensitiveData.value,
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
              <HomeIcon size={16} />
              <Text fontSize="xs">{t("home")}</Text>
            </Flex>
          </NavLink>
          <ResumeTitle form={form} marginX="2" />
          <FormProvider {...form}>
            <HeaderPopover
              devTools={devTools.value}
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
