import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  Grid,
  Button,
} from "@chakra-ui/react";
import * as R from "ramda";
import { ChevronLeft } from "react-feather";

import FileUploader from "./misc/FileUploader";

import parser from "../lib/parser";
import utils from "../lib/utils";

import { Fields } from "../types";

type props = {
  isOpen: boolean;
  onClose: () => void;
  onImport: (fields: Fields) => void;
};

const IMPORTS = [
  { label: "JSON Resume", value: "jsonResume", isDisabled: false },
  { label: "JSON", value: "json", isDisabled: true },
  { label: "CSV", value: "csv", isDisabled: true },
  { label: "XML", value: "xml", isDisabled: true },
  { label: "PDF", value: "pdf", isDisabled: true },
  { label: "GitHub", value: "github", isDisabled: true },
];

function ImportModal(props: props) {
  const { isOpen, onClose, onImport } = props;
  const [source, setSource] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (!isOpen) {
      setSource("");
    }
  }, [isOpen]);

  function getFields(text: string) {
    switch (source) {
      case "jsonResume":
        return parser.parseJsonResume(text);
    }
  }

  async function onDropHandler(acceptedFiles: File[]) {
    try {
      setIsLoading(true);
      const result = await utils.readAsTextAsync(acceptedFiles[0]);
      const text = result instanceof ArrayBuffer ? "" : result;
      const fields = getFields(text);
      onImport(fields);
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {R.isEmpty(source) ? (
            <Text>Import data</Text>
          ) : (
            <Button
              size="sm"
              variant="link"
              leftIcon={<ChevronLeft size={20} />}
              onClick={() => setSource("")}
            >
              Back
            </Button>
          )}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {R.isEmpty(source) ? (
            <>
              <Text mb="2">
                Choose one of the below sources to get started.
              </Text>
              <Grid gridTemplateColumns="1fr 1fr 1fr" gap="4">
                {R.map((item) => {
                  return (
                    <Button
                      key={item.label}
                      variant="outline"
                      size="sm"
                      isDisabled={item.isDisabled}
                      onClick={() => setSource(item.value)}
                    >
                      {item.label}
                    </Button>
                  );
                }, IMPORTS)}
              </Grid>
            </>
          ) : (
            <FileUploader onDrop={onDropHandler} isLoading={isLoading} />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
export default ImportModal;
