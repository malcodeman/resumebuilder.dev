import {
  Flex,
  Editable,
  EditablePreview,
  EditableInput,
  HTMLChakraProps,
} from "@chakra-ui/react";
import { UseFormReturn } from "react-hook-form";
import { isEmpty } from "ramda";
import EmojiPicker from "components/misc/EmojiPicker";
import useResume from "hooks/useResume";
import { Resume } from "types";

type props = HTMLChakraProps<"div"> & {
  form: UseFormReturn<Resume, object>;
};

function ResumeTitle(props: props) {
  const { form } = props;
  const { resume, changeIcon, changeTitle } = useResume({ isolated: true });

  function handleOnIconChange(icon: string) {
    changeIcon(icon);
  }

  function handleOnTitleChange(title: string) {
    if (!isEmpty(title)) {
      document.title = `${title} | resumebuilder.dev`;
      changeTitle(title);
    }
  }

  if (resume) {
    return (
      <Flex {...props}>
        <EmojiPicker
          emoji={resume.icon}
          onSelect={(emoji) => handleOnIconChange(emoji)}
        />
        <Editable
          placeholder={resume.title}
          defaultValue={resume.title}
          onSubmit={(nextValue) => handleOnTitleChange(nextValue)}
          ml="2"
          maxWidth="256px"
          data-cy="title-editable"
        >
          <EditablePreview
            noOfLines={1}
            overflowWrap="anywhere"
            data-cy="title-preview"
          />
          <EditableInput data-cy="title-input" {...form.register("title")} />
        </Editable>
      </Flex>
    );
  }
  return <></>;
}

export default ResumeTitle;
