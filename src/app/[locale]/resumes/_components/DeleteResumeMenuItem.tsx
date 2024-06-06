import { MenuItem, useDisclosure } from "@chakra-ui/react";
import { Trash2Icon } from "lucide-react";
import { useTranslations } from "next-intl";
import DeleteResumeModal from "app/[locale]/resumes/_components/DeleteResumeModal";

type Props = {
  onDelete: () => void;
};

function DeleteResumeMenuItem(props: Props) {
  const { onDelete } = props;
  const t = useTranslations();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <MenuItem
        icon={<Trash2Icon size={16} />}
        onClick={onOpen}
        data-testid="delete-menu-item"
      >
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
