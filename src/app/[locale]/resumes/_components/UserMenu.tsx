import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Link,
  useColorMode,
} from "@chakra-ui/react";
import {
  MoreVerticalIcon,
  SunIcon,
  MoonIcon,
  MessageSquareIcon,
} from "lucide-react";
import { equals } from "ramda";
import { useTranslations } from "next-intl";

const FEEDBACK_LINK =
  "https://github.com/malcodeman/resumebuilder.dev/discussions/categories/feedback";

function UserMenu() {
  const t = useTranslations();
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Menu closeOnSelect={false}>
      <MenuButton
        as={IconButton}
        size="sm"
        aria-label="More options"
        icon={<MoreVerticalIcon size={16} />}
        data-testid="header-more-options-menu-button"
      />
      <MenuList>
        <Link href={FEEDBACK_LINK} isExternal>
          <MenuItem icon={<MessageSquareIcon size={16} />}>
            {t("give_feedback")}
          </MenuItem>
        </Link>
        <MenuItem
          onClick={toggleColorMode}
          icon={
            equals(colorMode, "dark") ? (
              <MoonIcon size={16} />
            ) : (
              <SunIcon size={16} />
            )
          }
          data-testid="dark-mode-menu-item"
        >
          {equals(colorMode, "dark") ? t("dark_mode") : t("light_mode")}
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

export { UserMenu };
