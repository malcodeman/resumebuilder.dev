import { MenuItem, useClipboard, useToast } from "@chakra-ui/react";
import { FiLink } from "react-icons/fi";
import { useTranslations } from "next-intl";
import utils from "lib/utils";

type props = {
  id: string;
};

function CopyLinkMenuItem(props: props) {
  const { id } = props;
  const t = useTranslations();
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
    <MenuItem
      icon={<FiLink />}
      onClick={handleOnCopyLink}
      data-testid="copy-link-menu-item"
    >
      {t("copy_link")}
    </MenuItem>
  );
}

export default CopyLinkMenuItem;
