import { MenuItem, useDisclosure } from "@chakra-ui/react";
import { FiTrash2 } from "react-icons/fi";

import DeleteResumeModal from "./DeleteResumeModal";

type props = {
  onDelete: () => void;
};

function DeleteResumeMenuItem(props: props) {
  const { onDelete } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <MenuItem
        icon={<FiTrash2 />}
        onClick={onOpen}
        data-cy="delete_resume_btn"
      >
        Delete
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
