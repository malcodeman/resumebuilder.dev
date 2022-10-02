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
} from "@chakra-ui/react";
import { isEmpty, map } from "ramda";
import { FiChevronLeft } from "react-icons/fi";
import { useTranslation } from "next-i18next";

import FileUploader from "../misc/FileUploader";
import ImportFromGithub from "./importFromGithub";
import ImportFromPasteData from "./ImportFromPasteData";

import parser from "../../lib/parser";
import utils from "../../lib/utils";

import { Fields } from "../../types";

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
  | "csv"
  | "xml"
  | "pdf";

const IMPORTS: { label: string; value: Source; isDisabled: boolean }[] = [
  { label: "JSON Resume", value: "jsonResume", isDisabled: false },
  { label: "JSON", value: "json", isDisabled: false },
  { label: "GitHub", value: "github", isDisabled: false },
  { label: "paste_data", value: "pasteData", isDisabled: false },
  { label: "CSV", value: "csv", isDisabled: true },
  { label: "XML", value: "xml", isDisabled: true },
  { label: "PDF", value: "pdf", isDisabled: true },
];

function ImportDataModal(props: Props) {
  const { isOpen, onClose, onImport } = props;
  const { t } = useTranslation();
  const [source, setSource] = React.useState<Source | "">("");
  const [isLoading, setIsLoading] = React.useState(false);
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
      setIsLoading(true);
      const result = await utils.readAsTextAsync(acceptedFiles[0]);
      const text = result instanceof ArrayBuffer ? "" : result;
      const fields = getFields(text);
      onImport(fields);
      onClose();
    } catch (error) {
      toast({
        description: t("something_went_wrong"),
        status: "error",
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
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
                    data-cy={`import-${item.value}`}
                    onClick={() => setSource(item.value)}
                  >
                    {t(item.label)}
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
      default:
        return <FileUploader onDrop={handleOnDrop} isLoading={isLoading} />;
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {isEmpty(source) ? (
            <Text>{t("import_data")}</Text>
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
