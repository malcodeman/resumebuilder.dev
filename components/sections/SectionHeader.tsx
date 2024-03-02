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
  FiMoreHorizontal,
  FiCopy,
  FiTrash2,
  FiPlus,
  FiEdit,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import { and, isNil, equals } from "ramda";
import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";

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
  const t = useTranslations();
  const isStandardSection = !isNil(onAppend);
  const isAbout =
    isNil(index) && isNil(onAppend) && isNil(onDuplicate) && isNil(onRemove);
  const isNested = isNil(index);
  const isEditable = and(!isAbout, !isNested);
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
      equals(event.relatedTarget["dataset"]["action"], "rename")
    ) {
      return event;
    }
    return event.preventDefault();
  }

  return (
    <h2>
      <AccordionButton
        as="div"
        role="group"
        cursor="pointer"
        height="48px"
        data-cy="section-label-accordion-button"
      >
        {isOpen ? (
          <FiChevronUp style={{ marginRight: "0.5rem" }} />
        ) : (
          <FiChevronDown style={{ marginRight: "0.5rem" }} />
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
          <Box noOfLines={1} flex="1" mr="2">
            {label || t("untitled")}
          </Box>
        )}
        {isAbout ? (
          <></>
        ) : (
          <Menu isLazy>
            {({ isOpen }) => (
              <>
                <Tooltip
                  label={t("delete_duplicate_and_more")}
                  aria-label={TOOLTIP_MORE_LABEL}
                  isDisabled={isOpen}
                >
                  <MenuButton
                    as={IconButton}
                    size="xs"
                    aria-label={TOOLTIP_MORE_LABEL}
                    visibility="hidden"
                    _groupHover={{ visibility: "visible" }}
                    icon={<FiMoreHorizontal />}
                    onClick={(e) => e.stopPropagation()}
                    onPointerDown={(e) => e.preventDefault()}
                  />
                </Tooltip>
                <MenuList
                  onClick={(e) => e.stopPropagation()}
                  onPointerDown={(e) => e.preventDefault()}
                >
                  <MenuItem onClick={onRemove} icon={<FiTrash2 />}>
                    {t("delete")}
                  </MenuItem>
                  <MenuItem onClick={onDuplicate} icon={<FiCopy />}>
                    {t("duplicate")}
                  </MenuItem>
                  {isNested ? (
                    <></>
                  ) : (
                    <MenuItem
                      data-action="rename"
                      onClick={() => ref.current.focus()}
                      icon={<FiEdit />}
                    >
                      {t("rename")}
                    </MenuItem>
                  )}
                </MenuList>
              </>
            )}
          </Menu>
        )}
        {isStandardSection ? (
          <Tooltip label={t("add_item")} aria-label={TOOLTIP_ADD_LABEL}>
            <IconButton
              size="xs"
              ml="2"
              aria-label={TOOLTIP_ADD_LABEL}
              visibility="hidden"
              _groupHover={{ visibility: "visible" }}
              icon={<FiPlus />}
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
