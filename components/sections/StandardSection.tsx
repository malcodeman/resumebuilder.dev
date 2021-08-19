import React from "react";
import { AccordionItem, AccordionPanel, Text, Box } from "@chakra-ui/react";
import {
  useFieldArray,
  UseFormGetValues,
  Control,
  FieldArrayMethodProps,
} from "react-hook-form";
import * as R from "ramda";
import {
  useSortable,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";

import SectionHeader from "./SectionHeader";
import StandardSectionBody from "./StandardSectionBody";

import { Register, Fields } from "../../types";

type props = {
  id: string;
  nestIndex: number;
  control: Control<Fields>;
  defaultLabel: string;
  getValues: UseFormGetValues<Fields>;
  register: Register;
  remove: (index: number) => void;
  append: (
    value: Partial<any> | Partial<any>[],
    options?: FieldArrayMethodProps
  ) => void;
};

function StandardSection(props: props) {
  const {
    id,
    nestIndex,
    control,
    defaultLabel,
    getValues,
    register,
    remove,
    append,
  } = props;
  const {
    fields: fieldsNested,
    remove: removeNested,
    append: appendNested,
    swap: swapNested,
  } = useFieldArray({
    control,
    name: `section.${nestIndex}.nested` as const,
  });
  const { attributes, listeners, transform, transition, setNodeRef } =
    useSortable({ id });
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  function handleOnDuplicate(index: number) {
    appendNested(getValues(`section.${nestIndex}.nested.${index}` as const));
  }

  function handleOnRemove(index: number) {
    removeNested(index);
  }

  function handleOnAppend() {
    appendNested({
      title: "",
      subtitle: "",
      website: "",
      city: "",
      startDate: "",
      endDate: "",
      description: "",
    });
  }

  function handleOnDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active.id !== over.id) {
      const from = R.findIndex(R.propEq("id", active.id))(fieldsNested);
      const to = R.findIndex(R.propEq("id", over.id))(fieldsNested);
      swapNested(from, to);
    }
  }

  return (
    <AccordionItem
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      borderTopWidth="0"
      _last={{ borderBottomWidth: 0 }}
    >
      <SectionHeader
        defaultLabel={defaultLabel}
        labelRegister={register(`section.${nestIndex}.label` as const)}
        title={getValues(`section.${nestIndex}.label` as const)}
        onAppend={handleOnAppend}
        onRemove={() => remove(nestIndex)}
        onDuplicate={() => append(getValues(`section.${nestIndex}`))}
      />
      <AccordionPanel>
        {R.isEmpty(fieldsNested) ? (
          <Box
            paddingY="2"
            paddingInlineStart="calc(1.5rem + 20px)"
            paddingInlineEnd="4"
          >
            <Text>No items inside</Text>
          </Box>
        ) : (
          <></>
        )}
        <DndContext sensors={sensors} onDragEnd={handleOnDragEnd}>
          <SortableContext
            items={fieldsNested}
            strategy={verticalListSortingStrategy}
          >
            {fieldsNested.map((item, index) => {
              return (
                <StandardSectionBody
                  key={item.id}
                  id={item.id}
                  nestIndex={nestIndex}
                  index={index}
                  getValues={getValues}
                  register={register}
                  onDuplicate={handleOnDuplicate}
                  onRemove={handleOnRemove}
                />
              );
            })}
          </SortableContext>
        </DndContext>
      </AccordionPanel>
    </AccordionItem>
  );
}

export default StandardSection;
