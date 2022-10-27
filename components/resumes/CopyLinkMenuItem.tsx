import { MenuItem, useClipboard, useToast } from "@chakra-ui/react";
import { FiLink } from "react-icons/fi";
import { useTranslation } from "next-i18next";

import utils from "../../lib/utils";

type props = {
  id: string;
};

function DeleteResumeMenuItem(props: props) {
  const { id } = props;
  const { t } = useTranslation();
  const { onCopy } = useClipboard(
    utils.isBrowser ? `${window.location.href}/${id}` : ""
  );
  const toast = useToast();

  function handleOnCopyLink() {
    onCopy();
    toast({
      description: t("link_copied"),
      isClosable: true,
    });
  }

  return (
    <MenuItem icon={<FiLink />} onClick={handleOnCopyLink}>
      {t("copy_link")}
    </MenuItem>
  );
}

export default DeleteResumeMenuItem;
