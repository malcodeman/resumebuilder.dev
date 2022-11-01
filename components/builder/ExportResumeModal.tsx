import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Grid,
  Button,
  Text,
} from "@chakra-ui/react";
import { and, equals, map, or } from "ramda";
import { useLocalStorageValue, useMediaQuery } from "@react-hookz/web";
import { useTranslation } from "next-i18next";

import { Export } from "../../types";

type props = {
  isOpen: boolean;
  onClose: () => void;
  onPdfExport: () => void;
  onJsonExport: () => void;
  onHtmlExport: () => void;
  onPngExport: () => void;
};

const EXPORTS = [
  { label: "JSON", value: "json" as const },
  { label: "PDF", value: "pdf" as const },
  { label: "HTML", value: "html" as const },
  { label: "PNG", value: "png" as const },
];

function ExportResumeModal(props: props) {
  const {
    isOpen,
    onClose,
    onPdfExport,
    onJsonExport,
    onHtmlExport,
    onPngExport,
  } = props;
  const { t } = useTranslation();
  const isSmallDevice = useMediaQuery("only screen and (max-width: 62em)");
  const [isPdfViewer] = useLocalStorageValue("is-pdf-viewer", false, {
    initializeWithStorageValue: false,
  });

  function handleOnSubmit(format: Export) {
    switch (format) {
      default:
      case "pdf":
        return onPdfExport();
      case "json":
        return onJsonExport();
      case "html":
        return onHtmlExport();
      case "png":
        return onPngExport();
    }
  }

  function getIsDisabled(item: Export) {
    if (and(equals(item, "png"), or(isSmallDevice, isPdfViewer))) {
      return true;
    }
    return false;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent data-cy="export-resume-modal-content">
        <ModalHeader>{t("export")}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb="2">{t("export_description")}</Text>
          <Grid gridTemplateColumns={["1fr", "1fr 1fr"]} gap="4">
            {map((item) => {
              const isDisabled = getIsDisabled(item.value);
              return (
                <Button
                  key={item.label}
                  variant="outline"
                  size="sm"
                  isDisabled={isDisabled}
                  onClick={() => handleOnSubmit(item.value)}
                >
                  {item.label}
                </Button>
              );
            }, EXPORTS)}
          </Grid>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
}
export default ExportResumeModal;
