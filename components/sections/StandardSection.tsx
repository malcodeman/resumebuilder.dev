import React from "react";
import { AccordionItem, AccordionPanel, Text, Box } from "@chakra-ui/react";
import {
  useFieldArray,
  FieldArrayMethodProps,
  useFormContext,
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

function StandardSection(props: props) {
  const { id, index, label, remove, append } = props;
  const { control, getValues } = useFormContext();
  const {
    fields: fieldsNested,
    remove: removeNested,
    append: appendNested,
    swap: swapNested,
  } = useFieldArray({
    control,
    name: `section.${index}.nested` as const,
  });
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
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  function handleOnDuplicate(nestIndex: number) {
    appendNested(getValues(`section.${index}.nested.${nestIndex}` as const));
  }

  function handleOnRemove(nestIndex: number) {
    removeNested(nestIndex);
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
      opacity={isDragging ? "0.5" : "initial"}
      _last={{ borderBottomWidth: 0 }}
    >
      <SectionHeader
        label={label}
        onAppend={handleOnAppend}
        onRemove={() => remove(index)}
        onDuplicate={() => append(getValues(`section.${index}`))}
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
            {fieldsNested.map((item, nestIndex) => {
              return (
                <StandardSectionBody
                  key={item.id}
                  id={item.id}
                  index={index}
                  label={item.title}
                  nestIndex={nestIndex}
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
