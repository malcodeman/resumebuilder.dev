import {
  Flex,
  Editable,
  EditablePreview,
  EditableInput,
  HTMLChakraProps,
} from "@chakra-ui/react";
import { UseFormReturn } from "react-hook-form";

import EmojiPicker from "../misc/EmojiPicker";

import useResume from "../../hooks/useResume";

import { Resume } from "../../types";

type props = HTMLChakraProps<"div"> & {
  form: UseFormReturn<Resume, object>;
};

function ResumeTitle(props: props) {
  const { form } = props;
  const { resume, changeIcon, changeTitle } = useResume({ isolated: true });

  function handleOnIconChange(icon: string) {
    form.setValue("icon", icon);
    form.setValue("updatedAt", Date.now());
    changeIcon(icon);
  }

  function handleOnTitleChange(title: string) {
    form.setValue("title", title);
    form.setValue("updatedAt", Date.now());
    document.title = `${title} | resumebuilder.dev`;
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
