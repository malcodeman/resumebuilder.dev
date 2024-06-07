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
import { useMediaQuery } from "@react-hookz/web";
import { useTranslations } from "next-intl";
import useLocalStorage from "hooks/useLocalStorage";
import { Export } from "types";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onPdfExport: () => void;
  onJsonExport: () => void;
  onHtmlExport: () => void;
  onPngExport: () => void;
};

const EXPORTS: { label: string; value: Export }[] = [
  { label: "JSON", value: "json" },
  { label: "PDF", value: "pdf" },
  { label: "HTML", value: "html" },
  { label: "PNG", value: "png" },
];

function ExportResumeModal(props: Props) {
  const {
    isOpen,
    onClose,
    onPdfExport,
    onJsonExport,
    onHtmlExport,
    onPngExport,
  } = props;
  const t = useTranslations();
  const isSmallDevice = useMediaQuery("only screen and (max-width: 62em)", {
    initializeWithValue: false,
  });
  const isPdfViewer = useLocalStorage("is-pdf-viewer");

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
    if (and(equals(item, "png"), or(isSmallDevice, isPdfViewer.value))) {
      return true;
    }
    return false;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent data-testid="export-resume-modal-content">
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
