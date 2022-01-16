import {
  Flex,
  Editable,
  EditablePreview,
  EditableInput,
  HTMLChakraProps,
} from "@chakra-ui/react";
import { UseFormReturn } from "react-hook-form";
import { useDocumentTitle } from "@react-hookz/web";

import EmojiPicker from "../misc/EmojiPicker";

import useResume from "../../hooks/useResume";

import { Resume } from "../../types";

type props = HTMLChakraProps<"div"> & {
  form: UseFormReturn<Resume, object>;
};

function ResumeTitle(props: props) {
  const { form } = props;
  const [resume, _isLoading, setResume] = useResume({ isolated: true });

  useDocumentTitle(`${resume?.title} - resumebuilder.dev`);

  function handleOnIconChange(emoji: string) {
    form.setValue("icon", emoji);
    setResume({
      ...resume,
      updatedAt: Date.now(),
      icon: emoji,
    });
  }

  function handleOnTitleChange(nextValue: string) {
    form.setValue("title", nextValue);
    setResume({
      ...resume,
      updatedAt: Date.now(),
      title: nextValue,
    });
  }

  if (resume) {
    return (
      <Flex {...props}>
        <EmojiPicker
          emoji={resume.icon}
          onSelect={(emoji) => handleOnIconChange(emoji)}
        />
        <Editable
          defaultValue={resume.title}
          onSubmit={(nextValue) => handleOnTitleChange(nextValue)}
          ml="2"
          maxWidth="256px"
        >
          <EditablePreview noOfLines={1} overflowWrap="anywhere" />
          <EditableInput data-cy="resume-title" {...form.register("title")} />
        </Editable>
      </Flex>
    );
  }
  return <></>;
}

export default ResumeTitle;
