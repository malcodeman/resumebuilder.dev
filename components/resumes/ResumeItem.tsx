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
  Editable,
  EditablePreview,
  EditableInput,
} from "@chakra-ui/react";
import { Copy, MoreHorizontal, Trash2 } from "react-feather";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

import getTemplate from "../../lib/getTemplate";

import { Resume } from "../../types";

type props = {
  resume: Resume;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  onNameChange: (id: string, nextValue: string) => void;
};

function ResumeItem(props: props) {
  const { resume, onDelete, onDuplicate, onNameChange, ...rest } = props;

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
    <Link href={`/${resume.id}`} passHref>
      <Flex
        {...rest}
        direction="column"
        role="group"
        _hover={{ cursor: "pointer" }}
      >
        <Box
          height="360px"
          marginBottom="10px"
          borderRadius="lg"
          overflow="hidden"
        >
          {getTemplate(resume.template, resume.fields)}
        </Box>
        <Flex justifyContent="space-between" alignItems="center">
          <Box>
            <Text noOfLines={2} overflowWrap="anywhere">
              {resume.name}
            </Text>
            <Text opacity="0.5">
              Edited{" "}
              {formatDistanceToNow(resume.updated, {
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
                    data-cy="resume_more_options_btn"
                  />
                </PopoverTrigger>
                <PopoverContent
                  width="260px"
                  onClick={(e) => e.stopPropagation()}
                >
                  <PopoverBody>
                    <Flex flexDirection="column">
                      <Editable
                        mb="2"
                        value={resume.name}
                        onSubmit={onClose}
                        onChange={(nextValue) =>
                          onNameChange(resume.id, nextValue)
                        }
                      >
                        <EditablePreview
                          noOfLines={1}
                          overflowWrap="anywhere"
                        />
                        <EditableInput />
                      </Editable>
                      <Button
                        size="sm"
                        leftIcon={<Copy size={20} />}
                        mb="2"
                        onClick={(e) =>
                          handleOnDuplicate(resume.id, onClose, e)
                        }
                        data-cy="duplicate_resume_btn"
                      >
                        Duplicate
                      </Button>
                      <Button
                        size="sm"
                        leftIcon={<Trash2 size={20} />}
                        onClick={(e) => handleOnDelete(resume.id, onClose, e)}
                        data-cy="delete_resume_btn"
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
