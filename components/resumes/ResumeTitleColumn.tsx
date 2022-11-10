import {
  Flex,
  Editable,
  EditableInput,
  EditablePreview,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import EmojiPicker from "../misc/EmojiPicker";

type props = {
  icon: string;
  title: string;
  onChangeIcon: (nextValue: string) => void;
  onChangeTitle: (nextValue: string) => void;
};

function ResumeTitleColumn(props: props) {
  const { icon, title, onChangeIcon, onChangeTitle } = props;
  const form = useForm({ defaultValues: { title: "" } });
  return (
    <Flex alignItems="center">
      <EmojiPicker emoji={icon} onSelect={onChangeIcon} />
      <Editable
        placeholder={title}
        defaultValue={title}
        onSubmit={onChangeTitle}
        ml="2"
        maxW="256px"
        data-cy="title-editable"
      >
        <EditablePreview
          noOfLines={1}
          lineHeight="base"
          data-cy="title-preview"
          overflowWrap="anywhere"
        />
        <EditableInput {...form.register("title")} data-cy="title-input" />
      </Editable>
    </Flex>
  );
}

export default ResumeTitleColumn;
