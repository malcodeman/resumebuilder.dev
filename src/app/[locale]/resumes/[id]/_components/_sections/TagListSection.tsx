import { AccordionItem } from "@chakra-ui/react";
import { FieldArrayMethodProps, useFormContext } from "react-hook-form";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { and, not, equals } from "ramda";
import SectionHeader from "app/[locale]/resumes/[id]/_components/_sections/SectionHeader";
import TagListSectionBody from "app/[locale]/resumes/[id]/_components/_sections/TagListSectionBody";
import { Section } from "types";

type Props = {
  id: string;
  index: number;
  label: string;
  name: Section;
  isDragDisabled: boolean;
  remove: (_index: number) => void;
  append: (
    _value: Partial<any> | Partial<any>[],
    _options?: FieldArrayMethodProps
  ) => void;
};

function TagListSection(props: Props) {
  const { id, index, label, name, isDragDisabled, remove, append } = props;
  const {
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
    overIndex,
    setNodeRef,
  } = useSortable({ id, disabled: isDragDisabled });
  const { getValues } = useFormContext();
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };
  const isOver = and(not(isDragging), equals(overIndex, index));

  return (
    <AccordionItem
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      borderTopWidth="0"
      opacity={isDragging ? "0.5" : "initial"}
      backgroundColor={isOver ? "rgba(0, 0, 0, 0.1)" : "initial"}
      _last={{ borderBottomWidth: 0 }}
    >
      <SectionHeader
        label={label}
        index={index}
        onRemove={() => remove(index)}
        onDuplicate={() => append(getValues(`section.${index}`))}
      />
      <TagListSectionBody index={index} name={name} />
    </AccordionItem>
  );
}

export default TagListSection;
