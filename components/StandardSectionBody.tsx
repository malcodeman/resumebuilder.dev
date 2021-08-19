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
import { UseFormGetValues } from "react-hook-form";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import SectionHeader from "./SectionHeader";

import { Fields, Register } from "../types";

type props = {
  id: string;
  nestIndex: number;
  index: number;
  getValues: UseFormGetValues<Fields>;
  register: Register;
  onDuplicate: (index: number) => void;
  onRemove: (index: number) => void;
};

function StandardSectionBody(props: props) {
  const { id, nestIndex, index, getValues, register, onRemove, onDuplicate } =
    props;
  const { attributes, listeners, transform, transition, setNodeRef } =
    useSortable({ id });
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <Accordion
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      allowToggle
    >
      <AccordionItem borderTopWidth="0" _last={{ borderBottomWidth: 0 }}>
        <SectionHeader
          title={
            getValues(`section.${nestIndex}.nested.${index}.title` as const) ||
            "Untitled"
          }
          onRemove={() => onRemove(index)}
          onDuplicate={() => onDuplicate(index)}
        />
        <AccordionPanel>
          <Grid templateColumns="1fr 1fr" gap="4">
            <GridItem colSpan={2}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  size="sm"
                  {...register(
                    `section.${nestIndex}.nested.${index}.title` as const
                  )}
                />
              </FormControl>
            </GridItem>
            <GridItem colSpan={2}>
              <FormControl>
                <FormLabel>Subtitle</FormLabel>
                <Input
                  size="sm"
                  {...register(
                    `section.${nestIndex}.nested.${index}.subtitle` as const
                  )}
                />
              </FormControl>
            </GridItem>
            <FormControl>
              <FormLabel>Website</FormLabel>
              <Input
                size="sm"
                {...register(
                  `section.${nestIndex}.nested.${index}.website` as const
                )}
              />
            </FormControl>
            <FormControl>
              <FormLabel>City</FormLabel>
              <Input
                size="sm"
                {...register(
                  `section.${nestIndex}.nested.${index}.city` as const
                )}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Start date</FormLabel>
              <Input
                size="sm"
                {...register(
                  `section.${nestIndex}.nested.${index}.startDate` as const
                )}
              />
            </FormControl>
            <FormControl>
              <FormLabel>End date</FormLabel>
              <Input
                size="sm"
                {...register(
                  `section.${nestIndex}.nested.${index}.endDate` as const
                )}
              />
            </FormControl>
            <GridItem colSpan={2}>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  size="sm"
                  {...register(
                    `section.${nestIndex}.nested.${index}.description` as const
                  )}
                />
              </FormControl>
            </GridItem>
          </Grid>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export default StandardSectionBody;
