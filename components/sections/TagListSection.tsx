import { AccordionItem } from "@chakra-ui/react";
import { UseFormGetValues, FieldArrayMethodProps } from "react-hook-form";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import SectionHeader from "./SectionHeader";
import TagListSectionBody from "./TagListSectionBody";

import { Register, Fields } from "../../types";

type props = {
  id: string;
  nestIndex: number;
  defaultLabel: string;
  getValues: UseFormGetValues<Fields>;
  register: Register;
  remove: (index: number) => void;
  append: (
    value: Partial<any> | Partial<any>[],
    options?: FieldArrayMethodProps
  ) => void;
};

function TagListSection(props: props) {
  const { id, nestIndex, defaultLabel, getValues, register, remove, append } =
    props;
  const {
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
    setNodeRef,
  } = useSortable({ id });
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
        defaultLabel={defaultLabel}
        labelRegister={register(`section.${nestIndex}.label` as const)}
        title={getValues(`section.${nestIndex}.label` as const)}
        onRemove={() => remove(nestIndex)}
        onDuplicate={() => append(getValues(`section.${nestIndex}`))}
      />
      <TagListSectionBody nestIndex={nestIndex} register={register} />
    </AccordionItem>
  );
}

export default TagListSection;
