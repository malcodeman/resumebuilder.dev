import React from "react";
import { Accordion, Box, Button, Flex, useDisclosure } from "@chakra-ui/react";
import { PlusIcon } from "lucide-react";
import { useFieldArray, FormProvider, UseFormReturn } from "react-hook-form";
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
import { SortableContext } from "@dnd-kit/sortable";
import { useMediaQuery } from "@react-hookz/web";
import { findIndex, propEq, isEmpty, find, equals } from "ramda";
import { useTranslations } from "next-intl";
import { PersonalDetailsSection } from "app/[locale]/resumes/[id]/_components/_sections/PersonalDetailsSection";
import { TagListSection } from "app/[locale]/resumes/[id]/_components/_sections/TagListSection";
import { StandardSection } from "app/[locale]/resumes/[id]/_components/_sections/StandardSection";
import { AddSectionModal } from "app/[locale]/resumes/[id]/_components/_sections/AddSectionModal";
import { DraggableItem } from "app/[locale]/resumes/[id]/_components/_sections/DraggableItem";
import { CONSTANTS } from "lib/constants";
import { utils } from "lib/utils";
import { Resume, Section } from "types";

function SectionNewButton({ onSubmit }) {
  const t = useTranslations();
  const { isOpen, onOpen, onClose } = useDisclosure();

  function handleOnSubmit(data: { label: string; name: Section }) {
    onClose();
    onSubmit(data);
  }

  return (
    <>
      <Box
        marginTop={{ lg: "auto" }}
        paddingInlineStart="4"
        paddingInlineEnd="4"
        paddingY="4"
      >
        <Button
          size="sm"
          width="full"
          variant="ghost"
          leftIcon={<PlusIcon size={16} />}
          onClick={onOpen}
          justifyContent="flex-start"
          data-testid="new-section-button"
        >
          {t("new_section")}
        </Button>
      </Box>
      <AddSectionModal
        isOpen={isOpen}
        onSubmit={handleOnSubmit}
        onClose={onClose}
      />
    </>
  );
}

type Props = {
  form: UseFormReturn<Resume, object>;
};

function Sections(props: Props) {
  const { form } = props;
  const fieldArray = useFieldArray({
    control: form.control,
    name: "section",
  });
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );
  const isSmallDevice = useMediaQuery("only screen and (max-width: 62em)", {
    initializeWithValue: false,
  });
  const [activeLabel, setActiveLabel] = React.useState("");

  function handleOnDragStart(event: DragStartEvent) {
    const item = find(
      (item) => equals(item.id, event.active.id),
      fieldArray.fields
    );
    setActiveLabel(item.label);
  }

  function handleOnDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active.id !== over.id) {
      const from = findIndex(propEq("id", active.id))(fieldArray.fields);
      const to = findIndex(propEq("id", over.id))(fieldArray.fields);
      fieldArray.swap(from, to);
    }
  }

  function handleOnSubmit(data: { label: string; name: Section }) {
    if (utils.isStandardSection(data.name)) {
      fieldArray.append({
        name: data.name,
        label: data.label,
        nested: [CONSTANTS.STANDARD_SECTION_DEFAULT_VALUES],
      });
    } else {
      fieldArray.append({
        name: data.name,
        label: data.label,
        tags: "",
      });
    }
  }

  function disableSortingStrategy() {
    return null;
  }

  return (
    <Flex height="100%" flexDirection="column">
      <Accordion
        defaultIndex={[0]}
        allowToggle
        reduceMotion
        overflowY="auto"
        userSelect="none"
        sx={utils.getScrollbarStyle()}
      >
        <FormProvider {...form}>
          <DndContext
            id="dnd"
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleOnDragStart}
            onDragEnd={handleOnDragEnd}
          >
            <PersonalDetailsSection />
            <SortableContext
              items={fieldArray.fields}
              strategy={disableSortingStrategy}
            >
              {fieldArray.fields.map((item, index) => {
                const props = {
                  index,
                  id: item.id,
                  label: item.label,
                  name: item.name,
                  isDragDisabled: isSmallDevice,
                  remove: fieldArray.remove,
                  append: fieldArray.append,
                };
                return utils.isStandardSection(item.name) ? (
                  <StandardSection key={item.id} {...props} />
                ) : (
                  <TagListSection key={item.id} {...props} />
                );
              })}
            </SortableContext>
            <DragOverlay>
              {isEmpty(activeLabel) ? null : (
                <DraggableItem>{activeLabel}</DraggableItem>
              )}
            </DragOverlay>
          </DndContext>
        </FormProvider>
      </Accordion>
      <SectionNewButton onSubmit={handleOnSubmit} />
    </Flex>
  );
}

export { Sections };
