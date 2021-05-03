import {
  Flex,
  Popover,
  PopoverTrigger,
  IconButton,
  PopoverContent,
  PopoverBody,
  Button,
} from "@chakra-ui/react";
import { MoreHorizontal, Copy, Trash2 } from "react-feather";

type props = {
  onDuplicate: () => void;
  onRemove: () => void;
};

function SectionFooter(props: props) {
  const { onDuplicate, onRemove } = props;

  function handleOnDuplicate(onClose: () => void) {
    onClose();
    onDuplicate();
  }

  function handleOnDelete(onClose: () => void) {
    onClose();
    onRemove();
  }

  return (
    <Flex marginBottom="4">
      <Popover>
        {({ onClose }) => (
          <>
            <PopoverTrigger>
              <IconButton
                size="sm"
                aria-label="More options"
                icon={<MoreHorizontal size={20} />}
                onClick={(e) => e.stopPropagation()}
              />
            </PopoverTrigger>
            <PopoverContent width="unset">
              <PopoverBody>
                <Flex flexDirection="column">
                  <Button
                    size="sm"
                    leftIcon={<Copy size={20} />}
                    mb="2"
                    onClick={(e) => handleOnDuplicate(onClose)}
                  >
                    Duplicate
                  </Button>
                  <Button
                    size="sm"
                    leftIcon={<Trash2 size={20} />}
                    onClick={(e) => handleOnDelete(onClose)}
                  >
                    Delete
                  </Button>
                </Flex>
              </PopoverBody>
            </PopoverContent>
          </>
        )}
      </Popover>
    </Flex>
  );
}

export default SectionFooter;
