import {
  Flex,
  Box,
  Text,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Button,
} from "@chakra-ui/react";
import { Copy, MoreHorizontal, Trash2 } from "react-feather";
import { formatDistanceToNow } from "date-fns";

type props = {
  id: string;
  name: string;
  updated: number;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
};

function ResumeItem(props: props) {
  const { id, name, updated, onDelete, onDuplicate, ...rest } = props;

  function handleOnDuplicate(id: string, onClose: () => void) {
    onDuplicate(id);
    onClose();
  }

  function handleOnDelete(id: string, onClose: () => void) {
    onDelete(id);
    onClose();
  }

  return (
    <Flex {...rest} direction="column" role="group">
      <Box
        backgroundColor="#f3f3f3"
        height="360px"
        marginBottom="10px"
        borderRadius="lg"
      />
      <Flex justifyContent="space-between" alignItems="center">
        <Box>
          <Text>{name}</Text>
          <Text opacity="0.5">
            {formatDistanceToNow(updated, {
              addSuffix: true,
            })}
          </Text>
        </Box>
        <Popover>
          {({ onClose }) => (
            <>
              <PopoverTrigger>
                <IconButton
                  size="sm"
                  aria-label="More options"
                  icon={<MoreHorizontal size={20} />}
                />
              </PopoverTrigger>
              <PopoverContent width="unset">
                <PopoverBody>
                  <Flex flexDirection="column">
                    <Button
                      size="sm"
                      leftIcon={<Copy size={20} />}
                      mb="2"
                      onClick={() => handleOnDuplicate(id, onClose)}
                    >
                      Duplicate
                    </Button>
                    <Button
                      size="sm"
                      leftIcon={<Trash2 size={20} />}
                      onClick={() => handleOnDelete(id, onClose)}
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
    </Flex>
  );
}

export default ResumeItem;
