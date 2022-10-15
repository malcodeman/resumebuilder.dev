import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Link,
  useColorMode,
} from "@chakra-ui/react";
import { FiMoreVertical, FiSun, FiMoon, FiMessageSquare } from "react-icons/fi";
import { equals } from "ramda";
import { useTranslation } from "next-i18next";

const FEEDBACK_LINK =
  "https://github.com/malcodeman/resumebuilder.dev/discussions/categories/feedback";

function UserMenu() {
  const { t } = useTranslation();
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Menu closeOnSelect={false}>
      <MenuButton
        as={IconButton}
        size="sm"
        aria-label="More options"
        icon={<FiMoreVertical />}
      />
      <MenuList>
        <Link href={FEEDBACK_LINK} isExternal>
          <MenuItem icon={<FiMessageSquare />}>{t("give_feedback")}</MenuItem>
        </Link>
        <MenuItem
          onClick={toggleColorMode}
          icon={equals(colorMode, "dark") ? <FiMoon /> : <FiSun />}
        >
          {equals(colorMode, "dark") ? t("dark_mode") : t("light_mode")}
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

export default UserMenu;
