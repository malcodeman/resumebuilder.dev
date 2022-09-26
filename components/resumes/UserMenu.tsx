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

function UserMenu() {
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
          {equals(colorMode, "dark") ? "Dark mode" : "Light mode"}
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

export default UserMenu;
