import React from "react";
import {
  Tooltip,
  Popover,
  PopoverTrigger,
  IconButton,
  PopoverContent,
  Flex,
  useColorMode,
} from "@chakra-ui/react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { FiFileText } from "react-icons/fi";
import { isNil, isEmpty, or } from "ramda";
import { useLocale } from "next-intl";
import Emoji from "components/misc/Emoji";
import { Emoji as EmojiType } from "types";

const TOOLTIP_LABEL = "Change icon";

type props = {
  emoji?: string;
  onSelect: (emoji: string) => void;
};

function EmojiPicker(props: props) {
  const { emoji, onSelect } = props;
  const { colorMode } = useColorMode();
  const locale = useLocale();
  const icon = or(isNil(emoji), isEmpty(emoji)) ? (
    <FiFileText />
  ) : (
    <Emoji shortcodes={emoji} />
  );

  function handleOnSelect(emoji: EmojiType, onClose: () => void) {
    onSelect(emoji.shortcodes);
    onClose();
  }

  return (
    <Popover isLazy>
      {({ onClose }) => (
        <>
          <Tooltip label={TOOLTIP_LABEL} aria-label={TOOLTIP_LABEL}>
            <Flex>
              <PopoverTrigger>
                <IconButton
                  size="sm"
                  icon={icon}
                  aria-label="Import"
                  data-testid="emoji-picker-icon-button"
                />
              </PopoverTrigger>
            </Flex>
          </Tooltip>
          <PopoverContent width="unset">
            <Picker
              data={data}
              theme={colorMode}
              previewPosition="none"
              locale={locale}
              onEmojiSelect={(emoji: EmojiType) =>
                handleOnSelect(emoji, onClose)
              }
            />
          </PopoverContent>
        </>
      )}
    </Popover>
  );
}

export default EmojiPicker;
