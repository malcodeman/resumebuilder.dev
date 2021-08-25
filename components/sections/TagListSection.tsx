import { AccordionItem } from "@chakra-ui/react";
import { FieldArrayMethodProps, useFormContext } from "react-hook-form";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import SectionHeader from "./SectionHeader";
import TagListSectionBody from "./TagListSectionBody";

type props = {
  id: string;
  index: number;
  label: string;
  remove: (index: number) => void;
  append: (
    value: Partial<any> | Partial<any>[],
    options?: FieldArrayMethodProps
  ) => void;
};

function TagListSection(props: props) {
  const { id, index, label, remove, append } = props;
  const {
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
    setNodeRef,
  } = useSortable({ id });
  const { getValues } = useFormContext();
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <AccordionItem
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      borderTopWidth="0"
      opacity={isDragging ? "0.5" : "initial"}
      _last={{ borderBottomWidth: 0 }}
    >
      <SectionHeader
        label={label}
        onRemove={() => remove(index)}
        onDuplicate={() => append(getValues(`section.${index}`))}
      />
      <TagListSectionBody index={index} />
    </AccordionItem>
  );
}

export default TagListSection;
