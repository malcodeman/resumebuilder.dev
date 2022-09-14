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
  const { resume, changeIcon, changeTitle } = useResume({ isolated: true });

  useDocumentTitle(`${resume?.title} - resumebuilder.dev`);

  function handleOnIconChange(icon: string) {
    form.setValue("icon", icon);
    form.setValue("updatedAt", Date.now());
    changeIcon(icon);
  }

  function handleOnTitleChange(title: string) {
    form.setValue("title", title);
    form.setValue("updatedAt", Date.now());
    changeTitle(title);
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
