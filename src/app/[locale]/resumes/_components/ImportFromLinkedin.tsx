import {
  Text,
  Link,
  OrderedList,
  ListItem,
  useBoolean,
  useToast,
} from "@chakra-ui/react";
import JSZip from "jszip";
import { useTranslations } from "next-intl";
import parser from "lib/parser";
import { LINKS } from "lib/constants";
import FileUploader from "components/misc/FileUploader";
import { Fields } from "types";

type Props = {
  onImport: (fields: Fields) => void;
};

function ImportFromLinkedin(props: Props) {
  const { onImport } = props;
  const t = useTranslations();
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
      {t.rich("import_from_linkedin_description", {
        link: (chunks) => (
          <Link href={LINKS.LINKEDIN_DATA_PRIVACY} color="blue.400" isExternal>
            {chunks}
          </Link>
        ),
      })}
      <OrderedList mb="2">
        <ListItem>
          {t.rich("import_from_linkedin_list_item_1", {
            text: (chunks) => (
              <Text as="span" fontWeight="bold">
                {chunks}
              </Text>
            ),
          })}
        </ListItem>
        <ListItem>
          {t.rich("import_from_linkedin_list_item_2", {
            text: (chunks) => (
              <Text as="span" fontWeight="bold">
                {chunks}
              </Text>
            ),
          })}
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
