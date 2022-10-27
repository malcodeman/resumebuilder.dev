import { Editable, EditableInput, EditablePreview } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import useResumes from "../../hooks/useResumes";

type props = {
  id: string;
  defaultValue: string;
};

function ResumeTitleColumn(props: props) {
  const { id, defaultValue } = props;
  const form = useForm({ defaultValues: { title: "" } });
  const { changeTitle } = useResumes();
  return (
    <Editable
      defaultValue={defaultValue}
      onSubmit={(nextValue) => changeTitle(id, nextValue)}
      data-cy="title-editable"
    >
      <EditablePreview
        noOfLines={1}
        overflowWrap="anywhere"
        data-cy="title-preview"
      />
      <EditableInput {...form.register("title")} data-cy="title-input" />
    </Editable>
  );
}

export default ResumeTitleColumn;
