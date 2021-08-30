import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  ModalFooter,
} from "@chakra-ui/react";

type props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
};

function DeleteResumeModal(props: props) {
  const { isOpen, onClose, onSubmit } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete resume</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb="2">
            Are you sure you want to delete this resume permanently?
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button size="sm" mr="2" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button size="sm" colorScheme="pink" onClick={onSubmit}>
            Yes. Delete this resume
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default DeleteResumeModal;
