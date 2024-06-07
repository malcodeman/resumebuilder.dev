import React from "react";
import {
  Tooltip,
  Popover,
  PopoverTrigger,
  IconButton,
  PopoverContent,
  Flex,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { values, map, find, equals } from "ramda";
import { useTranslations } from "next-intl";
import native from "emojis/native.json";

const TOOLTIP_LABEL = "Change icon";

type Props = {
  emoji?: string;
  onSelect: (_emoji: string) => void;
};

const EMOJIS = values(native.emojis);
const DEFAULT_EMOJI = find((e) => equals(e.id, "page_facing_up"), EMOJIS)
  .skins[0].native;

function EmojiPicker(props: Props) {
  const { emoji, onSelect } = props;
  const t = useTranslations();
  const icon = (
    <Text as="span" fontSize="16px">
      {EMOJIS.find((e) => equals(`:${e.id}:`, emoji))?.skins[0].native ||
        DEFAULT_EMOJI}
    </Text>
  );

  function handleOnSelect(id: string, onClose: () => void) {
    onSelect(`:${id}:`);
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
          <PopoverContent>
            <PopoverHeader>
              <Text as="span" fontSize="16px">
                👇
              </Text>{" "}
              {t("pick_an_emoji")}
            </PopoverHeader>
            <PopoverCloseButton />
            <PopoverBody maxHeight="256px" overflowY="scroll">
              <Wrap>
                {map(
                  (emoji) => (
                    <WrapItem
                      key={emoji.id}
                      title={emoji.id}
                      cursor="pointer"
                      data-testid="emoji"
                      onClick={() => handleOnSelect(emoji.id, onClose)}
                    >
                      <Text as="span" fontSize="16px">
                        {emoji.skins[0].native}
                      </Text>
                    </WrapItem>
                  ),
                  EMOJIS
                )}
              </Wrap>
            </PopoverBody>
          </PopoverContent>
        </>
      )}
    </Popover>
  );
}

export default EmojiPicker;
