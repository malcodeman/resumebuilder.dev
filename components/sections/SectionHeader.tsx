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
} from "@chakra-ui/react";
import { MoreHorizontal, Copy, Trash2, Plus } from "react-feather";
import * as R from "ramda";

type props = {
  label: string;
  onAppend?: () => void;
  onDuplicate?: () => void;
  onRemove?: () => void;
};

const TOOLTIP_ADD_LABEL = "Add an item";
const TOOLTIP_MORE_LABEL = "Delete, duplicate, and more...";

function SectionHeader(props: props) {
  const { label, onAppend, onDuplicate, onRemove } = props;
  const isTagList = R.isNil(onAppend);
  const isAbout =
    R.isNil(onAppend) && R.isNil(onDuplicate) && R.isNil(onRemove);

  function handleOnAppend(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    onAppend();
  }

  return (
    <h2>
      <AccordionButton as="div" role="group">
        <AccordionIcon mr="2" />
        <Box flex="1" textAlign="left" isTruncated>
          {label || "Untitled"}
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
                  <MenuItem onClick={onDuplicate} icon={<Copy size={20} />}>
                    Duplicate
                  </MenuItem>
                  <MenuItem onClick={onRemove} icon={<Trash2 size={20} />}>
                    Delete
                  </MenuItem>
                </MenuList>
              </>
            )}
          </Menu>
        )}
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
