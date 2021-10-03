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
import * as R from "ramda";
import { ChevronLeft } from "react-feather";

import FileUploader from "../misc/FileUploader";

import parser from "../../lib/parser";
import utils from "../../lib/utils";

import { Fields } from "../../types";

type props = {
  isOpen: boolean;
  onClose: () => void;
  onImport: (fields: Fields) => void;
};

const IMPORTS = [
  { label: "JSON Resume", value: "jsonResume", isDisabled: false },
  { label: "JSON", value: "json", isDisabled: false },
  { label: "CSV", value: "csv", isDisabled: true },
  { label: "XML", value: "xml", isDisabled: true },
  { label: "PDF", value: "pdf", isDisabled: true },
  { label: "GitHub", value: "github", isDisabled: true },
];

function ImportDataModal(props: props) {
  const { isOpen, onClose, onImport } = props;
  const [source, setSource] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const toast = useToast();

  React.useEffect(() => {
    if (!isOpen) {
      setSource("");
    }
  }, [isOpen]);

  function getFields(text: string) {
    switch (source) {
      case "jsonResume":
        return parser.parseJsonResume(text);
      case "json":
        return JSON.parse(text);
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
      toast({
        description: "Something went wrong.",
        status: "error",
        isClosable: true,
      });
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
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
}
export default ImportDataModal;
