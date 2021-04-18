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
import Link from "next/link";

type props = {
  id: string;
  name: string;
  updated: number;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
};

function ResumeItem(props: props) {
  const { id, name, updated, onDelete, onDuplicate, ...rest } = props;

  function handleOnDuplicate(
    id: string,
    onClose: () => void,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    onDuplicate(id);
    onClose();
    e.stopPropagation();
  }

  function handleOnDelete(
    id: string,
    onClose: () => void,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    onDelete(id);
    onClose();
    e.stopPropagation();
  }

  return (
    <Link href={`/${id}`}>
      <Flex
        {...rest}
        direction="column"
        role="group"
        _hover={{ cursor: "pointer" }}
      >
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
                        onClick={(e) => handleOnDuplicate(id, onClose, e)}
                      >
                        Duplicate
                      </Button>
                      <Button
                        size="sm"
                        leftIcon={<Trash2 size={20} />}
                        onClick={(e) => handleOnDelete(id, onClose, e)}
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
    </Link>
  );
}

export default ResumeItem;
