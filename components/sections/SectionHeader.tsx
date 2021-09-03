import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  IconButton,
  Button,
  Flex,
  AccordionButton,
  AccordionIcon,
  Box,
  Tooltip,
} from "@chakra-ui/react";
import { MoreHorizontal, Copy, Trash2, Plus } from "react-feather";
import * as R from "ramda";

type props = {
  label: string;
  onAppend?: () => void;
  onDuplicate: () => void;
  onRemove: () => void;
};

const TOOLTIP_ADD_LABEL = "Add an item";
const TOOLTIP_MORE_LABEL = "Delete, duplicate, and more...";

function SectionHeader(props: props) {
  const { label, onAppend, onDuplicate, onRemove } = props;
  const isTagList = R.isNil(onAppend);

  function handleOnDuplicate(onClose: () => void) {
    onClose();
    onDuplicate();
  }

  function handleOnRemove(onClose: () => void) {
    onClose();
    onRemove();
  }

  function handleOnAppend(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    onAppend();
  }

  return (
    <h2>
      <AccordionButton as="div" role="group" height="42.5px">
        <AccordionIcon mr="2" />
        <Box flex="1" textAlign="left" isTruncated>
          {label || "Untitled"}
        </Box>
        <Popover>
          {({ onClose, isOpen }) => (
            <>
              <Tooltip
                label={TOOLTIP_MORE_LABEL}
                aria-label={TOOLTIP_MORE_LABEL}
                isDisabled={isOpen}
              >
                <Flex>
                  <PopoverTrigger>
                    <IconButton
                      size="xs"
                      aria-label={TOOLTIP_MORE_LABEL}
                      display="none"
                      _groupHover={{ display: "inline-flex" }}
                      icon={<MoreHorizontal size={20} />}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </PopoverTrigger>
                </Flex>
              </Tooltip>
              <PopoverContent
                width="260px"
                onClick={(e) => e.stopPropagation()}
              >
                <PopoverBody>
                  <Flex flexDirection="column">
                    <Button
                      size="sm"
                      mb="2"
                      justifyContent="flex-start"
                      leftIcon={<Copy size={20} />}
                      onClick={() => handleOnDuplicate(onClose)}
                    >
                      Duplicate
                    </Button>
                    <Button
                      size="sm"
                      justifyContent="flex-start"
                      leftIcon={<Trash2 size={20} />}
                      onClick={() => handleOnRemove(onClose)}
                    >
                      Delete
                    </Button>
                  </Flex>
                </PopoverBody>
              </PopoverContent>
            </>
          )}
        </Popover>
        {isTagList ? (
          <></>
        ) : (
          <Tooltip label={TOOLTIP_ADD_LABEL} aria-label={TOOLTIP_ADD_LABEL}>
            <IconButton
              size="xs"
              aria-label={TOOLTIP_ADD_LABEL}
              display="none"
              ml="2"
              _groupHover={{ display: "inline-flex" }}
              icon={<Plus size={20} />}
              onClick={(e) => handleOnAppend(e)}
            />
          </Tooltip>
        )}
      </AccordionButton>
    </h2>
  );
}

export default SectionHeader;
