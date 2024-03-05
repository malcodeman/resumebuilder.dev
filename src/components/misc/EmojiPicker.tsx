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
import { EmojiData, Picker, Emoji } from "emoji-mart";
import { FiFileText } from "react-icons/fi";
import { isNil, isEmpty, or } from "ramda";

const TOOLTIP_LABEL = "Change icon";

type props = {
  emoji?: string;
  onSelect: (emoji: string) => void;
};

function EmojiPicker(props: props) {
  const { emoji, onSelect } = props;
  const { colorMode } = useColorMode();
  const icon = or(isNil(emoji), isEmpty(emoji)) ? (
    <FiFileText />
  ) : (
    <Emoji size={16} emoji={emoji} />
  );

  function handleOnSelect(emoji: EmojiData, onClose: () => void) {
    onSelect(emoji.colons);
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
              theme={colorMode}
              showPreview={false}
              showSkinTones={false}
              onSelect={(emoji) => handleOnSelect(emoji, onClose)}
            />
          </PopoverContent>
        </>
      )}
    </Popover>
  );
}

export default EmojiPicker;
