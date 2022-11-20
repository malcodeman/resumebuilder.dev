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
      await zip.loadAsync(acceptedFiles[0]);
      const emailAddresses = await zip
        .file("Email Addresses.csv")
        .async("string");
      const phoneNumbers = await zip.file("PhoneNumbers.csv").async("string");
      const positions = await zip.file("Positions.csv").async("string");
      const profile = await zip.file("Profile.csv").async("string");
      const skills = await zip.file("Skills.csv").async("string");
      const fields = parser.parseLinkedin({
        emailAddresses,
        phoneNumbers,
        positions,
        profile,
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
        <Link
          href={"https://www.linkedin.com/psettings/data-privacy/"}
          color="blue.400"
          isExternal
        >
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
