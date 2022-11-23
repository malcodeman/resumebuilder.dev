import {
  Text,
  Link,
  OrderedList,
  ListItem,
  useBoolean,
  useToast,
} from "@chakra-ui/react";
import { Trans, useTranslation } from "next-i18next";
import JSZip from "jszip";

import parser from "../../lib/parser";
import { LINKS } from "../../lib/constants";

import FileUploader from "../misc/FileUploader";

import { Fields } from "../../types";

type props = {
  onImport: (fields: Fields) => void;
};

function ImportFromLinkedin(props: props) {
  const { onImport } = props;
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useBoolean();
  const toast = useToast();

  async function handleOnLinkedinDrop(acceptedFiles: File[]) {
    try {
      setIsLoading.on();
      const zip = new JSZip();
      const loaded = await zip.loadAsync(acceptedFiles[0]);
      const certifications = loaded.files["Certifications.csv"]
        ? await zip.file("Certifications.csv").async("string")
        : "";
      const education = loaded.files["Education.csv"]
        ? await zip.file("Education.csv").async("string")
        : "";
      const emailAddresses = loaded.files["Email Addresses.csv"]
        ? await zip.file("Email Addresses.csv").async("string")
        : "";
      const languages = loaded.files["Languages.csv"]
        ? await zip.file("Languages.csv").async("string")
        : "";
      const phoneNumbers = loaded.files["PhoneNumbers.csv"]
        ? await zip.file("PhoneNumbers.csv").async("string")
        : "";
      const positions = loaded.files["Positions.csv"]
        ? await zip.file("Positions.csv").async("string")
        : "";
      const profile = loaded.files["Profile.csv"]
        ? await zip.file("Profile.csv").async("string")
        : "";
      const projects = loaded.files["Projects.csv"]
        ? await zip.file("Projects.csv").async("string")
        : "";
      const skills = loaded.files["Skills.csv"]
        ? await zip.file("Skills.csv").async("string")
        : "";
      const fields = parser.parseLinkedin({
        certifications,
        education,
        emailAddresses,
        languages,
        phoneNumbers,
        positions,
        profile,
        projects,
        skills,
      });

      onImport(fields);
    } catch {
      toast({
        description: t("something_went_wrong"),
        status: "error",
        isClosable: true,
      });
    } finally {
      setIsLoading.off();
    }
  }

  return (
    <>
      <Trans
        i18nKey="import_from_linkedin_description"
        values={{ link: t("settings_and_privacy") }}
      >
        The easiest and fastest way to obtain a copy of your LinkedIn data is to
        initiate a data download from your{" "}
        <Link href={LINKS.LINKEDIN_DATA_PRIVACY} color="blue.400" isExternal>
          Settings & Privacy
        </Link>{" "}
        page:
      </Trans>
      <OrderedList mb="2">
        <ListItem>
          <Trans
            i18nKey="import_from_linkedin_list_item_1"
            values={{ bold: t("get_copy_of_your_data") }}
          >
            Under the How LinkedIn uses your data section, click{" "}
            <Text as="span" fontWeight="bold">
              Get a copy of your data
            </Text>
            .
          </Trans>
        </ListItem>
        <ListItem>
          <Trans
            i18nKey="import_from_linkedin_list_item_2"
            values={{ bold: t("request_archive") }}
          >
            Select the data that you&apos;re looking for and{" "}
            <Text as="span" fontWeight="bold">
              Request archive
            </Text>
            .
          </Trans>
        </ListItem>
      </OrderedList>
      <FileUploader
        onDrop={handleOnLinkedinDrop}
        isLoading={isLoading}
        accept={[".zip"]}
      />
    </>
  );
}

export default ImportFromLinkedin;
