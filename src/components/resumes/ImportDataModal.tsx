import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Grid,
  Button,
  useToast,
  useBoolean,
} from "@chakra-ui/react";
import { equals, isEmpty, map } from "ramda";
import { FiChevronLeft } from "react-icons/fi";
import { useTranslations } from "next-intl";
import FileUploader from "components/misc/FileUploader";
import ImportFromGithub from "components/resumes/importFromGithub";
import ImportFromPasteData from "components/resumes/ImportFromPasteData";
import ImportFromLinkedin from "components/resumes/ImportFromLinkedin";
import parser from "lib/parser";
import utils from "lib/utils";
import { Fields } from "types";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onImport: (fields: Fields) => void;
};
type Source =
  | "jsonResume"
  | "json"
  | "github"
  | "pasteData"
  | "linkedin"
  | "pdf";

const IMPORTS: { label: string; value: Source; isDisabled: boolean }[] = [
  { label: "JSON Resume", value: "jsonResume", isDisabled: false },
  { label: "JSON", value: "json", isDisabled: false },
  { label: "GitHub", value: "github", isDisabled: false },
  { label: "paste_data", value: "pasteData", isDisabled: false },
  { label: "LinkedIn", value: "linkedin", isDisabled: false },
  { label: "PDF", value: "pdf", isDisabled: true },
];

function ImportDataModal(props: Props) {
  const { isOpen, onClose, onImport } = props;
  const t = useTranslations();
  const [source, setSource] = React.useState<Source | "">("");
  const [isLoading, setIsLoading] = useBoolean();
  const toast = useToast();

  React.useEffect(() => {
    if (!isOpen) {
      setSource("");
    }
  }, [isOpen]);

  function getFields(text: string): Fields {
    switch (source) {
      case "jsonResume":
        return parser.parseJsonResume(text);
      case "json":
        return JSON.parse(text);
    }
  }

  async function handleOnDrop(acceptedFiles: File[]) {
    try {
      setIsLoading.on();
      const text = await utils.file2Text(acceptedFiles[0]);
      const fields = getFields(text);
      onImport(fields);
      onClose();
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

  function handleOnImport(fields: Fields) {
    onImport(fields);
    onClose();
  }

  function renderBody() {
    switch (source) {
      case "":
        return (
          <>
            <Text mb="2">{t("import_data_description")}</Text>
            <Grid
              gridTemplateColumns={["1fr", "1fr 1fr", "1fr 1fr 1fr"]}
              gap="4"
            >
              {map((item) => {
                return (
                  <Button
                    key={item.label}
                    variant="outline"
                    size="sm"
                    isDisabled={item.isDisabled}
                    data-testid={`import-${item.value}`}
                    onClick={() => setSource(item.value)}
                  >
                    {equals(item.label, "paste_data")
                      ? t(item.label)
                      : item.label}
                  </Button>
                );
              }, IMPORTS)}
            </Grid>
          </>
        );
      case "github":
        return <ImportFromGithub onImport={handleOnImport} />;
      case "pasteData":
        return <ImportFromPasteData onImport={handleOnImport} />;
      case "linkedin":
        return <ImportFromLinkedin onImport={handleOnImport} />;
      default:
        return (
          <FileUploader
            onDrop={handleOnDrop}
            isLoading={isLoading}
            accept={[".json"]}
          />
        );
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent data-testid="import-data-modal-content">
        <ModalHeader>
          {isEmpty(source) ? (
            t("import_data")
          ) : (
            <Button
              size="sm"
              variant="link"
              leftIcon={<FiChevronLeft />}
              onClick={() => setSource("")}
            >
              {t("back")}
            </Button>
          )}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>{renderBody()}</ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
}
export default ImportDataModal;
