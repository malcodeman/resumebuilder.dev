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
  MoreHorizontalIcon,
  CopyIcon,
  Trash2Icon,
  PlusIcon,
  EditIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "lucide-react";
import { and, isNil, equals } from "ramda";
import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";

type Props = {
  label: string;
  index?: number;
  onAppend?: () => void;
  onDuplicate?: () => void;
  onRemove?: () => void;
};

const TOOLTIP_ADD_LABEL = "Add an item";
const TOOLTIP_MORE_LABEL = "Delete, duplicate, and more...";

function SectionHeader(props: Props) {
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
        data-testid="section-label-accordion-button"
      >
        {isOpen ? (
          <ChevronUpIcon size={16} style={{ marginRight: "0.5rem" }} />
        ) : (
          <ChevronDownIcon size={16} style={{ marginRight: "0.5rem" }} />
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
                    icon={<MoreHorizontalIcon size={16} />}
                    onClick={(e) => e.stopPropagation()}
                    onPointerDown={(e) => e.preventDefault()}
                  />
                </Tooltip>
                <MenuList
                  onClick={(e) => e.stopPropagation()}
                  onPointerDown={(e) => e.preventDefault()}
                >
                  <MenuItem onClick={onRemove} icon={<Trash2Icon size={16} />}>
                    {t("delete")}
                  </MenuItem>
                  <MenuItem onClick={onDuplicate} icon={<CopyIcon size={16} />}>
                    {t("duplicate")}
                  </MenuItem>
                  {isNested ? (
                    <></>
                  ) : (
                    <MenuItem
                      data-action="rename"
                      onClick={() => ref.current.focus()}
                      icon={<EditIcon size={16} />}
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
              icon={<PlusIcon size={16} />}
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

export { SectionHeader };
