import {
  Tag,
  TagLabel,
  TagLeftIcon,
  TagProps,
  Tooltip,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { FiZap } from "react-icons/fi";

function OfflineTag(props: TagProps) {
  const t = useTranslations();
  return (
    <Tooltip
      label={t("you_are_offline_check_your_connection")}
      aria-label={t("you_are_offline_check_your_connection")}
    >
      <Tag {...props} colorScheme="red">
        <TagLeftIcon boxSize="16px" as={FiZap} />
        <TagLabel>{t("offline")}</TagLabel>
      </Tag>
    </Tooltip>
  );
}

export default OfflineTag;
