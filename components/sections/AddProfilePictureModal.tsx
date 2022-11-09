import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useToast,
  useBoolean,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";

import utils from "../../lib/utils";
import useProfilePicture from "../../hooks/useProfilePicture";

import FileUploader from "../misc/FileUploader";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function AddProfilePictureModal(props: Props) {
  const { isOpen, onClose } = props;
  const { t } = useTranslation();
  const toast = useToast();
  const [isLoading, setIsLoading] = useBoolean();
  const [_profilePicture, setProfilePicture] = useProfilePicture();

  async function handleOnDrop(acceptedFiles: File[]) {
    try {
      setIsLoading.on();
      const picture = await utils.file2Base64(acceptedFiles[0]);
      setProfilePicture(picture);
      onClose();
    } catch {
      toast({
        description: t("something_went_wrong"),
        status: "error",
        isClosable: true,
      });
    } finally {
      setIsLoading.off();
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent data-cy="add-profile-picture-modal-content">
        <ModalHeader>{t("add_profile_picture")}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FileUploader
            onDrop={handleOnDrop}
            isLoading={isLoading}
            accept={[".png", ".jpg"]}
          />
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
}
export default AddProfilePictureModal;