import React from "react";
import {
  Flex,
  Box,
  Text,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Editable,
  EditablePreview,
  EditableInput,
} from "@chakra-ui/react";
import { Copy, MoreHorizontal, Trash2, Edit } from "react-feather";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { useForm } from "react-hook-form";

import getTemplate from "../../lib/getTemplate";

import { Resume } from "../../types";

type props = {
  resume: Resume;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  onTitleChange: (id: string, nextValue: string) => void;
};

function ResumeItem(props: props) {
  const { resume, onDelete, onDuplicate, onTitleChange, ...rest } = props;
  const ref = React.useRef<HTMLSpanElement>(null);
  const form = useForm({ defaultValues: { title: "" } });

  return (
    <Link href={`/${resume.id}`} passHref>
      <Flex {...rest} direction="column">
        <Box
          height="360px"
          mb="2"
          borderRadius="lg"
          overflow="hidden"
          _hover={{ cursor: "pointer" }}
        >
          {getTemplate(resume.meta.template, {
            about: resume.about,
            section: resume.section,
          })}
        </Box>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          onClick={(e) => e.stopPropagation()}
        >
          <Box>
            <Editable
              defaultValue={resume.title}
              onSubmit={(nextValue) => onTitleChange(resume.id, nextValue)}
            >
              <EditablePreview
                ref={ref}
                noOfLines={1}
                overflowWrap="anywhere"
              />
              <EditableInput {...form.register("title")} />
            </Editable>
            <Text opacity="0.5">
              Edited{" "}
              {formatDistanceToNow(resume.updatedAt, {
                addSuffix: true,
              })}
            </Text>
          </Box>
          <Menu isLazy>
            <MenuButton
              as={IconButton}
              size="sm"
              aria-label="More options"
              data-cy="resume_more_options_btn"
              icon={<MoreHorizontal size={20} />}
            />
            <MenuList>
              <MenuItem
                icon={<Trash2 size={20} />}
                onClick={() => onDelete(resume.id)}
                data-cy="delete_resume_btn"
              >
                Delete
              </MenuItem>
              <MenuItem
                icon={<Copy size={20} />}
                onClick={() => onDuplicate(resume.id)}
                data-cy="duplicate_resume_btn"
              >
                Duplicate
              </MenuItem>
              <MenuItem
                icon={<Edit size={20} />}
                onClick={() => ref.current.focus()}
              >
                Rename
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Link>
  );
}

export default ResumeItem;
