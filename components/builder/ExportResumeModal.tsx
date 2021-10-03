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
import * as R from "ramda";
import { useMediaQuery } from "@react-hookz/web";

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
  { label: "JSON", value: "json" as const, isDisabled: false },
  { label: "PDF", value: "pdf" as const, isDisabled: false },
  { label: "HTML", value: "html" as const, isDisabled: false },
  { label: "PNG", value: "png" as const, isDisabled: false },
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
  const isSmallDevice = useMediaQuery("only screen and (max-width: 62em)");

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
    if (item === "png" && isSmallDevice) {
      return true;
    }
    return false;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Export</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <>
            <Text mb="2">Choose export format.</Text>
            <Grid gridTemplateColumns="1fr 1fr" gap="4">
              {R.map((item) => {
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
          </>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
}
export default ExportResumeModal;
