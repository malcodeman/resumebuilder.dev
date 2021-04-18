import { Editable, EditablePreview, EditableInput } from "@chakra-ui/react";

type props = {
  value: string;
  onChange: (nextValue: string) => void;
};

function EditableName(props: props) {
  const { value, onChange, ...rest } = props;

  return (
    <Editable {...rest} value={value} onChange={onChange}>
      <EditablePreview />
      <EditableInput />
    </Editable>
  );
}

export default EditableName;
