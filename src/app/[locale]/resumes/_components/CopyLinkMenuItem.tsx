import { MenuItem, useClipboard, useToast } from "@chakra-ui/react";
import { LinkIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { utils } from "lib/utils";

type Props = {
  id: string;
};

function CopyLinkMenuItem(props: Props) {
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
      icon={<LinkIcon size={16} />}
      onClick={handleOnCopyLink}
      data-testid="copy-link-menu-item"
    >
      {t("copy_link")}
    </MenuItem>
  );
}

export { CopyLinkMenuItem };
