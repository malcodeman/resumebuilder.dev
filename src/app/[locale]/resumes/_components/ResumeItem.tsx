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
  CopyIcon,
  MoreHorizontalIcon,
  EditIcon,
  MoveIcon,
  LinkIcon,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useForm } from "react-hook-form";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useRerender } from "@react-hookz/web";
import { useTranslations } from "next-intl";
import { EmojiPicker } from "components/misc/EmojiPicker";
import { DeleteResumeMenuItem } from "app/[locale]/resumes/_components/DeleteResumeMenuItem";
import { Link } from "navigation";
import { getTemplate } from "lib/getTemplate";
import { utils } from "lib/utils";
import { useDateFnsLocale } from "hooks/useDateFnsLocale";
import { useProfilePicture } from "hooks/useProfilePicture";
import { Resume } from "types";

function UpdatedAtText(props: { updatedAt: number }) {
  const t = useTranslations();
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

type Props = {
  resume: Resume;
  onDelete: (_id: string) => void;
  onDuplicate: (_id: string) => void;
  onTitleChange: (_id: string, _nextValue: string) => void;
  onIconChange: (_id: string, _emoji: string) => void;
};

function ResumeItem(props: Props) {
  const {
    resume,
    onDelete,
    onDuplicate,
    onTitleChange,
    onIconChange,
    ...rest
  } = props;
  const t = useTranslations();
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
  const profilePicture = useProfilePicture();

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
      data-testid="resume"
    >
      <Link href={`/resumes/${resume.id}`} passHref>
        <AspectRatio mb="2" ratio={1.618 / 2 / 1}>
          <Box
            borderRadius="md"
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
              profilePicture: profilePicture.value,
              isDescendantOfLink: true,
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
            placeholder={resume.title}
            defaultValue={resume.title}
            onSubmit={(nextValue) => onTitleChange(resume.id, nextValue)}
            marginX="2"
            width="full"
            data-testid="title-editable"
          >
            <EditablePreview
              ref={ref}
              noOfLines={1}
              overflowWrap="anywhere"
              data-testid="title-preview"
            />
            <EditableInput
              {...form.register("title")}
              data-testid="title-input"
            />
          </Editable>
          <Menu>
            <MenuButton
              as={IconButton}
              size="sm"
              aria-label="More options"
              data-testid="resume-more-options-menu-button"
              icon={<MoreHorizontalIcon size={16} />}
              mr="2"
              visibility="hidden"
              _groupHover={{ visibility: "visible" }}
            />
            <MenuList>
              <MenuItem
                icon={<EditIcon size={16} />}
                onClick={() => ref.current.focus()}
                data-testid="rename-menu-item"
              >
                {t("rename")}
              </MenuItem>
              <MenuItem
                icon={<CopyIcon size={16} />}
                onClick={() => onDuplicate(resume.id)}
                data-testid="duplicate-menu-item"
              >
                {t("duplicate")}
              </MenuItem>
              <MenuItem
                icon={<LinkIcon size={16} />}
                onClick={handleOnCopyLink}
                data-testid="copy-link-menu-item"
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
            icon={<MoveIcon size={16} />}
            visibility="hidden"
            _groupHover={{ visibility: "visible" }}
          />
        </Flex>
        <UpdatedAtText updatedAt={resume.updatedAt} />
      </Box>
    </Flex>
  );
}

export { ResumeItem };
