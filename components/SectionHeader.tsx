import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  IconButton,
  Button,
  Flex,
  Editable,
  EditablePreview,
  EditableInput,
  AccordionButton,
  AccordionIcon,
  Box,
  Tooltip,
} from "@chakra-ui/react";
import { MoreHorizontal, Copy, Trash2, Plus } from "react-feather";
import { UseFormRegisterReturn } from "react-hook-form";
import * as R from "ramda";

type props = {
  defaultLabel: string;
  title: string;
  labelRegister?: UseFormRegisterReturn;
  onAppend?: () => void;
  onDuplicate: () => void;
  onRemove: () => void;
};

const TOOLTIP_ADD_LABEL = "Add an item";
const TOOLTIP_MORE_LABEL = "Delete, duplicate, and more...";

function SectionHeader(props: props) {
  const {
    defaultLabel,
    title,
    labelRegister,
    onAppend,
    onDuplicate,
    onRemove,
  } = props;
  const isNested = R.isEmpty(defaultLabel);
  const isTagList = R.isNil(labelRegister)
    ? false
    : R.includes("tagList", labelRegister.name);

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
      <AccordionButton role="group" height="42.5px">
        <AccordionIcon mr="2" />
        <Box flex="1" textAlign="left">
          {title}
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
                    {isNested ? (
                      <></>
                    ) : (
                      <Editable
                        onSubmit={onClose}
                        defaultValue={defaultLabel}
                        mb="2"
                      >
                        <EditablePreview />
                        <EditableInput {...labelRegister} />
                      </Editable>
                    )}
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
        {isNested || isTagList ? (
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
