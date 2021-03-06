import React from "react";
import {
  IconButton,
  AccordionButton,
  Box,
  Tooltip,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Editable,
  EditablePreview,
  EditableInput,
  useAccordionItemState,
} from "@chakra-ui/react";
import {
  MoreHorizontal,
  Copy,
  Trash2,
  Plus,
  Edit,
  ChevronDown,
  ChevronUp,
} from "react-feather";
import { isNil } from "ramda";
import { useFormContext } from "react-hook-form";

type props = {
  label: string;
  index?: number;
  onAppend?: () => void;
  onDuplicate?: () => void;
  onRemove?: () => void;
};

const TOOLTIP_ADD_LABEL = "Add an item";
const TOOLTIP_MORE_LABEL = "Delete, duplicate, and more...";

function SectionHeader(props: props) {
  const { label, index, onAppend, onDuplicate, onRemove } = props;
  const isStandardSection = !isNil(onAppend);
  const isAbout =
    isNil(index) && isNil(onAppend) && isNil(onDuplicate) && isNil(onRemove);
  const isNested = isNil(index);
  const isEditable = !isAbout && !isNested;
  const ref = React.useRef<HTMLSpanElement>(null);
  const { register } = useFormContext();
  const { isOpen } = useAccordionItemState();

  function handleOnAppend(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    onAppend();
  }

  function handleOnFocus(event: React.FocusEvent<HTMLDivElement>) {
    if (
      event.relatedTarget &&
      event.relatedTarget["dataset"]["action"] === "rename"
    ) {
      return event;
    }
    return event.preventDefault();
  }

  return (
    <h2>
      <AccordionButton as="div" role="group">
        {isOpen ? (
          <ChevronUp size={16} style={{ marginRight: "0.5rem" }} />
        ) : (
          <ChevronDown size={16} style={{ marginRight: "0.5rem" }} />
        )}
        {isEditable ? (
          <Editable defaultValue={label} flex="1" mr="2">
            <EditablePreview
              ref={ref}
              noOfLines={1}
              cursor="inherit"
              overflowWrap="anywhere"
              onFocus={handleOnFocus}
            />
            <EditableInput {...register(`section.${index}.label` as const)} />
          </Editable>
        ) : (
          <Box isTruncated flex="1" mr="2">
            {label || "Untitled"}
          </Box>
        )}
        {isAbout ? (
          <></>
        ) : (
          <Menu isLazy>
            {({ isOpen }) => (
              <>
                <Tooltip
                  label={TOOLTIP_MORE_LABEL}
                  aria-label={TOOLTIP_MORE_LABEL}
                  isDisabled={isOpen}
                >
                  <MenuButton
                    as={IconButton}
                    size="xs"
                    aria-label={TOOLTIP_MORE_LABEL}
                    display="none"
                    _groupHover={{ display: "inline-flex" }}
                    icon={<MoreHorizontal size={20} />}
                    onClick={(e) => e.stopPropagation()}
                    onPointerDown={(e) => e.preventDefault()}
                  />
                </Tooltip>
                <MenuList
                  onClick={(e) => e.stopPropagation()}
                  onPointerDown={(e) => e.preventDefault()}
                >
                  <MenuItem onClick={onRemove} icon={<Trash2 size={20} />}>
                    Delete
                  </MenuItem>
                  <MenuItem onClick={onDuplicate} icon={<Copy size={20} />}>
                    Duplicate
                  </MenuItem>
                  {isNested ? (
                    <></>
                  ) : (
                    <MenuItem
                      data-action="rename"
                      onClick={() => ref.current.focus()}
                      icon={<Edit size={20} />}
                    >
                      Rename
                    </MenuItem>
                  )}
                </MenuList>
              </>
            )}
          </Menu>
        )}
        {isStandardSection ? (
          <Tooltip label={TOOLTIP_ADD_LABEL} aria-label={TOOLTIP_ADD_LABEL}>
            <IconButton
              size="xs"
              aria-label={TOOLTIP_ADD_LABEL}
              display="none"
              ml="2"
              _groupHover={{ display: "inline-flex" }}
              icon={<Plus size={20} />}
              onClick={(e) => handleOnAppend(e)}
              onPointerDown={(e) => e.preventDefault()}
            />
          </Tooltip>
        ) : (
          <></>
        )}
      </AccordionButton>
    </h2>
  );
}

export default SectionHeader;
