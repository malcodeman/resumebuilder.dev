import React from "react";
import { AccordionItem, AccordionPanel } from "@chakra-ui/react";
import {
  useFieldArray,
  FieldArrayMethodProps,
  useFormContext,
} from "react-hook-form";
import { findIndex, propEq, and, equals, not, find, isEmpty, or } from "ramda";
import { useSortable, SortableContext } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  DndContext,
  PointerSensor,
  DragOverlay,
  DragStartEvent,
  DragEndEvent,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SectionHeader } from "app/[locale]/resumes/[id]/_components/_sections/SectionHeader";
import { StandardSectionBody } from "app/[locale]/resumes/[id]/_components/_sections/StandardSectionBody";
import { DraggableItem } from "app/[locale]/resumes/[id]/_components/_sections/DraggableItem";
import { CONSTANTS } from "lib/constants";
import { Resume, Section } from "types";
import { AddSectionItemButton } from "app/[locale]/resumes/[id]/_components/_sections/AddSectionItemButton";

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

function StandardSection(props: Props) {
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
    overIndex,
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
  const [activeLabel, setActiveLabel] = React.useState("");
  const isOver = and(not(isDragging), equals(overIndex, index));

  function handleOnDragStart(event: DragStartEvent) {
    const item = find((item) => equals(item.id, event.active.id), fieldsNested);
    setActiveLabel(or(item.title, "Untitled"));
  }

  function handleOnDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active.id !== over.id) {
      const from = findIndex(propEq("id", active.id))(fieldsNested);
      const to = findIndex(propEq("id", over.id))(fieldsNested);
      swapNested(from, to);
    }
  }

  function handleOnDuplicate() {
    // Each useFieldArray holds it's own reference, if you want to copy nested field array, then you need to use nested field array's method or reset the form
    append(getValues(`section.${index}`));
    reset({ ...getValues() });
  }

  function disableSortingStrategy() {
    return null;
  }

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
      {({ isExpanded }) => (
        <>
          <SectionHeader
            label={label}
            index={index}
            onRemove={() => remove(index)}
            onDuplicate={handleOnDuplicate}
          />
          {isExpanded ? (
            <AccordionPanel
              cursor="default"
              onPointerDown={(e) => e.stopPropagation()}
            >
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleOnDragStart}
                onDragEnd={handleOnDragEnd}
              >
                <SortableContext
                  items={fieldsNested}
                  strategy={disableSortingStrategy}
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
                <DragOverlay>
                  {isEmpty(activeLabel) ? null : (
                    <DraggableItem>{activeLabel}</DraggableItem>
                  )}
                </DragOverlay>
              </DndContext>
              <AddSectionItemButton
                name={name}
                onAppend={() =>
                  appendNested(CONSTANTS.STANDARD_SECTION_DEFAULT_VALUES)
                }
              />
            </AccordionPanel>
          ) : (
            <></>
          )}
        </>
      )}
    </AccordionItem>
  );
}

export { StandardSection };
