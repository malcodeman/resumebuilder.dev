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
} from "@chakra-ui/react";
import { useFormContext, useWatch } from "react-hook-form";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import SectionHeader from "./SectionHeader";

import { Section } from "../../types";

type props = {
  id: string;
  index: number;
  nestIndex: number;
  name: Section;
  onDuplicate: (index: number) => void;
  onRemove: (index: number) => void;
};

function Header({ index, nestIndex, onRemove, onDuplicate }) {
  const { control } = useFormContext();
  const label = useWatch({
    control,
    name: `section.${index}.nested.${nestIndex}.title`,
  });
  return (
    <SectionHeader
      label={label}
      onRemove={onRemove}
      onDuplicate={onDuplicate}
    />
  );
}

function getTitleLabel(name: Section) {
  switch (name) {
    case "employmentSection":
      return "Company";
    case "educationSection":
      return "School";
    default:
      return "Title";
  }
}

function getSubtitleLabel(name: Section) {
  switch (name) {
    case "employmentSection":
      return "Job title";
    case "educationSection":
      return "Degree";
    default:
      return "Subtitle";
  }
}

function StandardSectionBody(props: props) {
  const { id, index, nestIndex, name, onRemove, onDuplicate } = props;
  const {
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
    setNodeRef,
  } = useSortable({ id });
  const { register } = useFormContext();
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  function onPointerDownHanlder(e: React.PointerEvent<HTMLDivElement>) {
    e.stopPropagation();
  }

  return (
    <Accordion
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      opacity={isDragging ? "0.5" : "initial"}
      allowToggle
      reduceMotion
    >
      <AccordionItem borderTopWidth="0" _last={{ borderBottomWidth: 0 }}>
        {({ isExpanded }) => (
          <>
            <Header
              index={index}
              nestIndex={nestIndex}
              onRemove={() => onRemove(nestIndex)}
              onDuplicate={() => onDuplicate(nestIndex)}
            />
            {isExpanded ? (
              <AccordionPanel onPointerDown={onPointerDownHanlder}>
                <Grid templateColumns="1fr 1fr" gap="4">
                  <GridItem colSpan={2}>
                    <FormControl>
                      <FormLabel>{getTitleLabel(name)}</FormLabel>
                      <Input
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
                        size="sm"
                        {...register(
                          `section.${index}.nested.${nestIndex}.subtitle` as const
                        )}
                      />
                    </FormControl>
                  </GridItem>
                  <FormControl>
                    <FormLabel>Website</FormLabel>
                    <Input
                      size="sm"
                      {...register(
                        `section.${index}.nested.${nestIndex}.website` as const
                      )}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>City</FormLabel>
                    <Input
                      size="sm"
                      {...register(
                        `section.${index}.nested.${nestIndex}.city` as const
                      )}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Start date</FormLabel>
                    <Input
                      size="sm"
                      {...register(
                        `section.${index}.nested.${nestIndex}.startDate` as const
                      )}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>End date</FormLabel>
                    <Input
                      size="sm"
                      {...register(
                        `section.${index}.nested.${nestIndex}.endDate` as const
                      )}
                    />
                  </FormControl>
                  <GridItem colSpan={2}>
                    <FormControl>
                      <FormLabel>Description</FormLabel>
                      <Textarea
                        size="sm"
                        {...register(
                          `section.${index}.nested.${nestIndex}.description` as const
                        )}
                      />
                    </FormControl>
                  </GridItem>
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
