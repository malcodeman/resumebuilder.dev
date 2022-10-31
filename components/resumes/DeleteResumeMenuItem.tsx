import { MenuItem, useDisclosure } from "@chakra-ui/react";
import { FiTrash2 } from "react-icons/fi";
import { useTranslation } from "next-i18next";

import DeleteResumeModal from "./DeleteResumeModal";

type props = {
  onDelete: () => void;
};

function DeleteResumeMenuItem(props: props) {
  const { onDelete } = props;
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <MenuItem icon={<FiTrash2 />} onClick={onOpen} data-cy="delete-menu-item">
        {t("delete")}
      </MenuItem>
      <DeleteResumeModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onDelete}
      />
    </>
  );
}

export default DeleteResumeMenuItem;
