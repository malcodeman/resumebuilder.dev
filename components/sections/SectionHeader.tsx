import React from "react";
import {
  IconButton,
  AccordionButton,
  AccordionIcon,
  Box,
  Tooltip,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Input,
} from "@chakra-ui/react";
import { MoreHorizontal, Copy, Trash2, Plus, Edit } from "react-feather";
import * as R from "ramda";
import { useFormContext } from "react-hook-form";

type props = {
  label: string;
  index?: number;
  onAppend?: () => void;
  onDuplicate?: () => void;
  onRemove?: () => void;
};

function SectionLabel({ index, onSubmit }) {
  const { reset, getValues, register } = useFormContext();

  function handleOnSubmit() {
    reset({ ...getValues() });
    onSubmit();
  }

  return (
    <form onSubmit={handleOnSubmit}>
      <Input
        size="sm"
        autoFocus
        onClick={(e) => e.stopPropagation()}
        {...register(`section.${index}.label` as const)}
        onBlur={handleOnSubmit}
      />
    </form>
  );
}

const TOOLTIP_ADD_LABEL = "Add an item";
const TOOLTIP_MORE_LABEL = "Delete, duplicate, and more...";

function SectionHeader(props: props) {
  const { label, index, onAppend, onDuplicate, onRemove } = props;
  const isStandardSection = !R.isNil(onAppend);
  const isAbout =
    R.isNil(index) &&
    R.isNil(onAppend) &&
    R.isNil(onDuplicate) &&
    R.isNil(onRemove);
  const isNested = R.isNil(index);
  const [isEditable, setIsEditable] = React.useState(false);

  function handleOnAppend(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    onAppend();
  }

  return (
    <h2>
      <AccordionButton as="div" role="group">
        <AccordionIcon mr="2" />
        <Box flex="1" isTruncated>
          {isEditable ? (
            <SectionLabel index={index} onSubmit={() => setIsEditable(false)} />
          ) : (
            label || "Untitled"
          )}
        </Box>
        {isAbout ? (
          <></>
        ) : (
          <Menu>
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
                  />
                </Tooltip>
                <MenuList onClick={(e) => e.stopPropagation()}>
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
                      onClick={() => setIsEditable(true)}
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
