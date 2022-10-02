import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
} from "@chakra-ui/react";
import { FiMoreVertical, FiSun, FiMoon } from "react-icons/fi";
import { equals } from "ramda";
import { useTranslation } from "next-i18next";

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
