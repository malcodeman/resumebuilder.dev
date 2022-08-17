import {
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
} from "@chakra-ui/react";
import { MoreVertical, Sun, Moon } from "react-feather";
import { equals } from "ramda";

function UserMenu() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Menu closeOnSelect={false}>
      <MenuButton as={Button} size="sm">
        <Icon as={MoreVertical} />
      </MenuButton>
      <MenuList>
        <MenuItem
          onClick={toggleColorMode}
          icon={equals(colorMode, "dark") ? <Sun /> : <Moon />}
        >
          {equals(colorMode, "dark") ? "Dark mode" : "Light mode"}
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

export default UserMenu;
