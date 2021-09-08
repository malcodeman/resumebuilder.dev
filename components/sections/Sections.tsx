import React from "react";
import { Accordion, Box, Button, useDisclosure } from "@chakra-ui/react";
import { Plus } from "react-feather";
import { useFieldArray, FormProvider, UseFormReturn } from "react-hook-form";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import * as R from "ramda";

import PersonalDetailsSection from "../../components/sections/PersonalDetailsSection";
import TagListSection from "../../components/sections/TagListSection";
import StandardSection from "../../components/sections/StandardSection";
import AddSectionModal from "./AddSectionModal";

import { STANDARD_SECTION_DEFAULT_VALUES } from "../../lib/constants";
import utils from "../../lib/utils";
import useResume from "../../hooks/useResume";

import { Resume, Section } from "../../types";

function SectionNewButton({ onSubmit }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  function handleOnSubmit(data: { label: string; name: Section }) {
    onClose();
    onSubmit(data);
  }

  return (
    <>
      <Box mb="4" paddingInlineStart="4" paddingInlineEnd="4">
        <Button
          size="sm"
          width="100%"
          variant="ghost"
          leftIcon={<Plus size={20} />}
          onClick={onOpen}
        >
          New section
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

type props = {
  form: UseFormReturn<Resume, object>;
};

function Sections(props: props) {
  const { form } = props;
  const [resume] = useResume();
  const {
    fields: sectionFields,
    append: appendSection,
    remove: removeSection,
    swap: swapSection,
  } = useFieldArray({
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

  React.useEffect(() => {
    if (resume?.id && !form.getValues().id) {
      form.reset({ ...resume });
    }
  }, [resume?.id, form, resume]);

  function handleOnDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active.id !== over.id) {
      const from = R.findIndex(R.propEq("id", active.id))(sectionFields);
      const to = R.findIndex(R.propEq("id", over.id))(sectionFields);
      swapSection(from, to);
    }
  }

  function handleOnSubmit(data: { label: string; name: Section }) {
    if (utils.isStandardSection(data.name)) {
      appendSection({
        name: data.name,
        label: data.label,
        nested: [STANDARD_SECTION_DEFAULT_VALUES],
      });
      form.reset({ ...form.getValues() });
    } else {
      appendSection({
        name: data.name,
        label: data.label,
        tags: "",
      });
    }
  }

  return (
    <>
      <Accordion defaultIndex={[0]} allowToggle reduceMotion mb="4">
        <FormProvider {...form}>
          <DndContext sensors={sensors} onDragEnd={handleOnDragEnd}>
            <PersonalDetailsSection />
            <SortableContext
              items={sectionFields}
              strategy={verticalListSortingStrategy}
            >
              {sectionFields.map((item, index) => {
                const props = {
                  index,
                  key: item.id,
                  id: item.id,
                  label: item.label,
                  name: item.name,
                  remove: removeSection,
                  append: appendSection,
                };
                return utils.isStandardSection(item.name) ? (
                  <StandardSection {...props} />
                ) : (
                  <TagListSection {...props} />
                );
              })}
            </SortableContext>
          </DndContext>
        </FormProvider>
      </Accordion>
      <SectionNewButton onSubmit={handleOnSubmit} />
    </>
  );
}

export default Sections;
