import { MenuItem, useDisclosure } from "@chakra-ui/react";
import { Trash2 } from "react-feather";

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
        icon={<Trash2 size="20" />}
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
