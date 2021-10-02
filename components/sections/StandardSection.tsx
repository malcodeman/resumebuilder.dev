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

import { STANDARD_SECTION_DEFAULT_VALUES } from "../../lib/constants";

import { Resume, Section } from "../../types";

type props = {
  id: string;
  index: number;
  label: string;
  name: Section;
  isDragDisabled: boolean;
  remove: (index: number) => void;
  append: (
    value: Partial<any> | Partial<any>[],
    options?: FieldArrayMethodProps
  ) => void;
};

function StandardSection(props: props) {
  const { id, index, label, name, isDragDisabled, remove, append } = props;
  const { control, getValues, reset } = useFormContext<Resume>();
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
  } = useSortable({ id, disabled: isDragDisabled });
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

  function handleOnDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active.id !== over.id) {
      const from = R.findIndex(R.propEq("id", active.id))(fieldsNested);
      const to = R.findIndex(R.propEq("id", over.id))(fieldsNested);
      swapNested(from, to);
    }
  }

  function handleOnDuplicate() {
    // Each useFieldArray holds it's own reference, if you want to copy nested field array, then you need to use nested field array's method or reset the form
    append(getValues(`section.${index}`));
    reset({ ...getValues() });
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
      {({ isExpanded }) => (
        <>
          <SectionHeader
            label={label}
            index={index}
            onAppend={() => appendNested(STANDARD_SECTION_DEFAULT_VALUES)}
            onRemove={() => remove(index)}
            onDuplicate={handleOnDuplicate}
          />
          {isExpanded ? (
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
                        nestIndex={nestIndex}
                        name={name}
                        isDragDisabled={isDragDisabled}
                        onDuplicate={() =>
                          appendNested(
                            getValues(`section.${index}.nested.${nestIndex}`)
                          )
                        }
                        onRemove={() => removeNested(nestIndex)}
                      />
                    );
                  })}
                </SortableContext>
              </DndContext>
            </AccordionPanel>
          ) : (
            <></>
          )}
        </>
      )}
    </AccordionItem>
  );
}

export default StandardSection;
