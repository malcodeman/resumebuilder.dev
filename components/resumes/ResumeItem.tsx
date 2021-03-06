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
  useToast,
  useClipboard,
  useDisclosure,
  useColorModeValue,
  useInterval,
} from "@chakra-ui/react";
import {
  Copy,
  MoreHorizontal,
  Trash2,
  Edit,
  Move,
  Link as IconLink,
} from "react-feather";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useRerender } from "@react-hookz/web";

import EmojiPicker from "../misc/EmojiPicker";
import DeleteResumeModal from "./DeleteResumeModal";

import getTemplate from "../../lib/getTemplate";
import utils from "../../lib/utils";

import { Resume } from "../../types";

function DeleteResume(props: { onDelete: () => void }) {
  const { onDelete } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <MenuItem
        icon={<Trash2 size={20} />}
        onClick={onOpen}
        data-cy="delete_resume_btn"
        color="pink"
      >
        Delete
      </MenuItem>
      <DeleteResumeModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onDelete}
      />
    </>
  );
}

function UpdatedAtText(props: { updatedAt: number }) {
  const { updatedAt } = props;
  const rerender = useRerender();

  useInterval(() => {
    rerender();
  }, 60000);

  return (
    <Text opacity="0.5">
      Edited{" "}
      {formatDistanceToNow(updatedAt, {
        addSuffix: true,
      })}
    </Text>
  );
}

type props = {
  resume: Resume;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  onTitleChange: (id: string, nextValue: string) => void;
  onIconChange: (id: string, emoji: string) => void;
};

function ResumeItem(props: props) {
  const {
    resume,
    onDelete,
    onDuplicate,
    onTitleChange,
    onIconChange,
    ...rest
  } = props;
  const ref = React.useRef<HTMLSpanElement>(null);
  const form = useForm({ defaultValues: { title: "" } });
  const {
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
    setNodeRef,
  } = useSortable({ id: resume.id });
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };
  const toast = useToast();
  const { onCopy } = useClipboard(
    utils.isBrowser ? `${window.location.href}/${resume.id}` : ""
  );
  const boxShadow = useColorModeValue(
    "rgba(0, 0, 0, 0.05) 0 0 0 2px",
    "rgba(255, 255, 255, 0.05) 0 0 0 2px"
  );

  function handleOnCopyLink() {
    onCopy();
    toast({
      description: "Link copied.",
      isClosable: true,
    });
  }

  function handleOnDelete() {
    onDelete(resume.id);
    toast({
      description: "Resume deleted.",
      isClosable: true,
    });
  }

  return (
    <Flex
      {...rest}
      ref={setNodeRef}
      style={style}
      opacity={isDragging ? "0.5" : "initial"}
      direction="column"
      role="group"
    >
      <Link href={`/resumes/${resume.id}`} passHref>
        <Box
          height="360px"
          mb="2"
          borderRadius="lg"
          overflow="hidden"
          userSelect="none"
          boxShadow={boxShadow}
          _hover={{ cursor: "pointer" }}
        >
          {getTemplate(
            { ...resume.design, spacing: 0.6 },
            {
              about: resume.about,
              section: resume.section,
            }
          )}
        </Box>
      </Link>
      <Box>
        <Flex>
          <EmojiPicker
            emoji={resume.icon}
            onSelect={(emoji) => onIconChange(resume.id, emoji)}
          />
          <Editable
            defaultValue={resume.title}
            onSubmit={(nextValue) => onTitleChange(resume.id, nextValue)}
            marginX="2"
            width="100%"
          >
            <EditablePreview ref={ref} noOfLines={1} overflowWrap="anywhere" />
            <EditableInput {...form.register("title")} />
          </Editable>
          <Menu>
            <MenuButton
              as={IconButton}
              size="sm"
              aria-label="More options"
              data-cy="resume_more_options_btn"
              icon={<MoreHorizontal size={20} />}
              mr="2"
              display="none"
              _groupHover={{ display: "inline-flex" }}
            />
            <MenuList>
              <MenuItem
                icon={<Edit size={20} />}
                onClick={() => ref.current.focus()}
              >
                Rename
              </MenuItem>
              <MenuItem
                icon={<Copy size={20} />}
                onClick={() => onDuplicate(resume.id)}
                data-cy="duplicate_resume_btn"
              >
                Duplicate
              </MenuItem>
              <MenuItem
                icon={<IconLink size={20} />}
                onClick={handleOnCopyLink}
              >
                Copy link
              </MenuItem>
              <DeleteResume onDelete={handleOnDelete} />
            </MenuList>
          </Menu>
          <IconButton
            {...attributes}
            {...listeners}
            size="sm"
            aria-label="Drag"
            display="none"
            icon={<Move size={20} />}
            _groupHover={{ display: "inline-flex" }}
          />
        </Flex>
        <UpdatedAtText updatedAt={resume.updatedAt} />
      </Box>
    </Flex>
  );
}

export default ResumeItem;
