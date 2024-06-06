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
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
};

function DeleteResumeModal(props: Props) {
  const t = useTranslations();
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
        <AlertDialogHeader>{t("delete_resume")}</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>{t("delete_resume_description")}</AlertDialogBody>
        <AlertDialogFooter>
          <Button
            ref={cancelRef}
            size="sm"
            mr="2"
            variant="ghost"
            onClick={onClose}
          >
            {t("cancel")}
          </Button>
          <Button
            size="sm"
            colorScheme="red"
            data-testid="delete-this-resume-button"
            onClick={onSubmit}
          >
            {t("yes_delete_this_resume")}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteResumeModal;
