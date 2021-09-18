import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Grid,
  Button,
  Text,
} from "@chakra-ui/react";
import * as R from "ramda";

import { Export } from "../../types";

type props = {
  isOpen: boolean;
  onClose: () => void;
  onPdfExport: () => void;
  onJsonExport: () => void;
  onHtmlExport: () => void;
};

const EXPORTS = [
  { label: "JSON", value: "json" as const, isDisabled: false },
  { label: "PDF", value: "pdf" as const, isDisabled: false },
  { label: "HTML", value: "html" as const, isDisabled: false },
];

function ExportResumeModal(props: props) {
  const { isOpen, onClose, onPdfExport, onJsonExport, onHtmlExport } = props;

  function handleOnSubmit(format: Export) {
    switch (format) {
      default:
      case "pdf":
        return onPdfExport();
      case "json":
        return onJsonExport();
      case "html":
        return onHtmlExport();
    }
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
                return (
                  <Button
                    key={item.label}
                    variant="outline"
                    size="sm"
                    isDisabled={item.isDisabled}
                    onClick={() => handleOnSubmit(item.value)}
                  >
                    {item.label}
                  </Button>
                );
              }, EXPORTS)}
            </Grid>
          </>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
export default ExportResumeModal;
