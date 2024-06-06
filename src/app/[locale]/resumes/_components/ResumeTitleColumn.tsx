import {
  Flex,
  Editable,
  EditableInput,
  EditablePreview,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import EmojiPicker from "components/misc/EmojiPicker";

type Props = {
  icon: string;
  title: string;
  onChangeIcon: (nextValue: string) => void;
  onChangeTitle: (nextValue: string) => void;
};

function ResumeTitleColumn(props: Props) {
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
        data-testid="title-editable"
      >
        <EditablePreview
          noOfLines={1}
          lineHeight="base"
          data-testid="title-preview"
          overflowWrap="anywhere"
        />
        <EditableInput {...form.register("title")} data-testid="title-input" />
      </Editable>
    </Flex>
  );
}

export default ResumeTitleColumn;
