import React from "react";
import {
  Grid,
  AccordionItem,
  AccordionPanel,
  Input,
  GridItem,
  Textarea,
  FormControl,
  FormLabel,
  Accordion,
  useAccordionItemState,
  FormHelperText,
  useDisclosure,
} from "@chakra-ui/react";
import { useFormContext, useWatch } from "react-hook-form";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { and, not, equals, replace, concat } from "ramda";

import { Section } from "../../types";

import phrases from "../../lib/phrases";

import SectionHeader from "./SectionHeader";
import PreWrittenPhrasesModal from "./PreWrittenPhrasesModal";

type props = {
  id: string;
  index: number;
  nestIndex: number;
  name: Section;
  isDragDisabled: boolean;
  onDuplicate: (index: number) => void;
  onRemove: (index: number) => void;
};

function Header({ index, nestIndex, isDragging, onRemove, onDuplicate }) {
  const { control } = useFormContext();
  const label = useWatch({
    control,
    name: `section.${index}.nested.${nestIndex}.title`,
  });
  const { isOpen, onClose } = useAccordionItemState();

  React.useEffect(() => {
    if (and(isOpen, isDragging)) {
      onClose();
    }
  }, [isOpen, isDragging, onClose]);

  return (
    <SectionHeader
      label={label}
      onRemove={onRemove}
      onDuplicate={onDuplicate}
    />
  );
}

function Description({ index, nestIndex, isEmployment }) {
  const { control, register, getValues, setValue } = useFormContext();
  const inputName = `section.${index}.nested.${nestIndex}.description`;
  const description = useWatch({
    control,
    name: inputName,
  });
  const phrasesModal = useDisclosure();

  function handleOnPhraseChange(phrase: string, isChecked: boolean) {
    const currentValue: string = getValues(inputName);
    const point = `• ${phrase}\n`;
    if (isChecked) {
      setValue(inputName, replace(point, "", currentValue));
    } else {
      setValue(inputName, concat(currentValue, point));
    }
  }

  return (
    <>
      <GridItem colSpan={2}>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea
            variant="filled"
            size="sm"
            {...register(
              `section.${index}.nested.${nestIndex}.description` as const
            )}
          />
          {isEmployment ? (
            <FormHelperText onClick={phrasesModal.onOpen}>
              Add pre-written phrases
            </FormHelperText>
          ) : null}
        </FormControl>
      </GridItem>
      {isEmployment ? (
        <PreWrittenPhrasesModal
          isOpen={phrasesModal.isOpen}
          value={description}
          phrases={phrases.EMPLOYMENT}
          onClose={phrasesModal.onClose}
          onChange={handleOnPhraseChange}
        />
      ) : null}
    </>
  );
}

function getTitleLabel(name: Section) {
  switch (name) {
    case "employment":
    case "internships":
      return "Company";
    case "education":
      return "School";
    case "projects":
      return "Name";
    default:
      return "Title";
  }
}

function getSubtitleLabel(name: Section) {
  switch (name) {
    case "employment":
    case "internships":
      return "Job title";
    case "education":
      return "Degree";
    case "projects":
      return "Role";
    default:
      return "Subtitle";
  }
}

function StandardSectionBody(props: props) {
  const { id, index, nestIndex, name, isDragDisabled, onDuplicate, onRemove } =
    props;
  const {
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
    overIndex,
    setNodeRef,
  } = useSortable({ id, disabled: isDragDisabled });
  const { register } = useFormContext();
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };
  const isOver = and(not(isDragging), equals(overIndex, nestIndex));

  function onPointerDownHandler(e: React.PointerEvent<HTMLDivElement>) {
    e.stopPropagation();
  }

  return (
    <Accordion
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      opacity={isDragging ? "0.5" : "initial"}
      backgroundColor={isOver ? "rgba(0, 0, 0, 0.1)" : "initial"}
      allowToggle
      reduceMotion
    >
      <AccordionItem borderTopWidth="0" _last={{ borderBottomWidth: 0 }}>
        {({ isExpanded }) => (
          <>
            <Header
              index={index}
              nestIndex={nestIndex}
              isDragging={isDragging}
              onRemove={() => onRemove(nestIndex)}
              onDuplicate={() => onDuplicate(nestIndex)}
            />
            {isExpanded ? (
              <AccordionPanel onPointerDown={onPointerDownHandler}>
                <Grid templateColumns="1fr 1fr" gap="4">
                  <GridItem colSpan={2}>
                    <FormControl>
                      <FormLabel>{getTitleLabel(name)}</FormLabel>
                      <Input
                        variant="filled"
                        size="sm"
                        {...register(
                          `section.${index}.nested.${nestIndex}.title`
                        )}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={2}>
                    <FormControl>
                      <FormLabel>{getSubtitleLabel(name)}</FormLabel>
                      <Input
                        variant="filled"
                        size="sm"
                        {...register(
                          `section.${index}.nested.${nestIndex}.subtitle` as const
                        )}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={{ base: 2, md: 1 }}>
                    <FormControl>
                      <FormLabel>Website</FormLabel>
                      <Input
                        variant="filled"
                        size="sm"
                        {...register(
                          `section.${index}.nested.${nestIndex}.website` as const
                        )}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={{ base: 2, md: 1 }}>
                    <FormControl>
                      <FormLabel>City</FormLabel>
                      <Input
                        variant="filled"
                        size="sm"
                        {...register(
                          `section.${index}.nested.${nestIndex}.city` as const
                        )}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={{ base: 2, md: 1 }}>
                    <FormControl>
                      <FormLabel>Start date</FormLabel>
                      <Input
                        variant="filled"
                        size="sm"
                        {...register(
                          `section.${index}.nested.${nestIndex}.startDate` as const
                        )}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={{ base: 2, md: 1 }}>
                    <FormControl>
                      <FormLabel>End date</FormLabel>
                      <Input
                        variant="filled"
                        size="sm"
                        {...register(
                          `section.${index}.nested.${nestIndex}.endDate` as const
                        )}
                      />
                    </FormControl>
                  </GridItem>
                  <Description
                    index={index}
                    nestIndex={nestIndex}
                    isEmployment={equals(name, "employment")}
                  />
                </Grid>
              </AccordionPanel>
            ) : (
              <></>
            )}
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
}

export default StandardSectionBody;
