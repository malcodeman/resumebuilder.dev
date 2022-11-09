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
  AspectRatio,
  useToast,
  useClipboard,
  useColorModeValue,
  useInterval,
} from "@chakra-ui/react";
import {
  FiCopy,
  FiMoreHorizontal,
  FiEdit,
  FiMove,
  FiLink,
} from "react-icons/fi";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useRerender } from "@react-hookz/web";
import { useTranslation } from "next-i18next";

import EmojiPicker from "../misc/EmojiPicker";
import DeleteResumeMenuItem from "./DeleteResumeMenuItem";

import getTemplate from "../../lib/getTemplate";
import utils from "../../lib/utils";

import useDateFnsLocale from "../../hooks/useDateFnsLocale";
import useProfilePicture from "../../hooks/useProfilePicture";

import { Resume } from "../../types";

function UpdatedAtText(props: { updatedAt: number }) {
  const { t } = useTranslation();
  const { updatedAt } = props;
  const rerender = useRerender();
  const { locale } = useDateFnsLocale();

  useInterval(() => {
    rerender();
  }, 60000);

  return (
    <Text opacity="0.5">
      {t("edited_time", {
        time: formatDistanceToNow(updatedAt, {
          addSuffix: true,
          locale,
        }),
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
  const { t } = useTranslation();
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
  const [profilePicture] = useProfilePicture();

  function handleOnCopyLink() {
    onCopy();
    toast({
      description: t("link_copied"),
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
      data-cy="resume"
    >
      <Link href={`/resumes/${resume.id}`} passHref>
        <AspectRatio mb="2" ratio={1.618 / 2 / 1}>
          <Box
            borderRadius="lg"
            userSelect="none"
            boxShadow={boxShadow}
            _hover={{ cursor: "pointer" }}
          >
            {getTemplate({
              design: { ...resume.design, spacing: 0.6 },
              fields: {
                about: resume.about,
                section: resume.section,
              },
              profilePicture,
            })}
          </Box>
        </AspectRatio>
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
            width="full"
            data-cy="title-editable"
          >
            <EditablePreview
              ref={ref}
              noOfLines={1}
              overflowWrap="anywhere"
              data-cy="title-preview"
            />
            <EditableInput {...form.register("title")} data-cy="title-input" />
          </Editable>
          <Menu>
            <MenuButton
              as={IconButton}
              size="sm"
              aria-label="More options"
              data-cy="resume-more-options-menu-button"
              icon={<FiMoreHorizontal />}
              mr="2"
              display="none"
              _groupHover={{ display: "inline-flex" }}
            />
            <MenuList>
              <MenuItem
                icon={<FiEdit />}
                onClick={() => ref.current.focus()}
                data-cy="rename-menu-item"
              >
                {t("rename")}
              </MenuItem>
              <MenuItem
                icon={<FiCopy />}
                onClick={() => onDuplicate(resume.id)}
                data-cy="duplicate-menu-item"
              >
                {t("duplicate")}
              </MenuItem>
              <MenuItem
                icon={<FiLink />}
                onClick={handleOnCopyLink}
                data-cy="copy-link-menu-item"
              >
                {t("copy_link")}
              </MenuItem>
              <DeleteResumeMenuItem onDelete={() => onDelete(resume.id)} />
            </MenuList>
          </Menu>
          <IconButton
            {...attributes}
            {...listeners}
            size="sm"
            aria-label="Drag"
            display="none"
            icon={<FiMove />}
            _groupHover={{ display: "inline-flex" }}
          />
        </Flex>
        <UpdatedAtText updatedAt={resume.updatedAt} />
      </Box>
    </Flex>
  );
}

export default ResumeItem;
