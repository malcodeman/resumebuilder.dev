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
import { FileText } from "react-feather";
import * as R from "ramda";

const TOOLTIP_LABEL = "Change icon";

type props = {
  emoji?: string;
  onSelect: (emoji: string) => void;
};

function EmojiPicker(props: props) {
  const { emoji, onSelect } = props;
  const { colorMode } = useColorMode();
  const icon =
    R.isNil(emoji) || R.isEmpty(emoji) ? (
      <FileText size={20} />
    ) : (
      <Emoji size={20} emoji={emoji} />
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
                <IconButton size="sm" aria-label="Import" icon={icon} />
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
