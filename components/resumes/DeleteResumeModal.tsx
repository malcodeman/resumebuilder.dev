import React from "react";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogFooter,
  Button,
  Text,
} from "@chakra-ui/react";

type props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
};

function DeleteResumeModal(props: props) {
  const { isOpen, onClose, onSubmit } = props;
  const cancelRef = React.useRef();

  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>Delete resume</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          <Text mb="2">
            Are you sure you want to delete this resume permanently?
          </Text>
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button
            ref={cancelRef}
            size="sm"
            mr="2"
            variant="ghost"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button size="sm" colorScheme="pink" onClick={onSubmit}>
            Yes. Delete this resume
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteResumeModal;
