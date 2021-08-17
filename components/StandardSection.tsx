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
  Text,
  Box,
} from "@chakra-ui/react";
import {
  useFieldArray,
  UseFormGetValues,
  Control,
  FieldArrayMethodProps,
} from "react-hook-form";
import * as R from "ramda";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import SectionHeader from "./SectionHeader";

import { Register, Fields } from "../types";

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
    fields,
    remove: removeNested,
    append: appendNested,
  } = useFieldArray({
    control,
    name: `standardSection.${nestIndex}.nested` as const,
  });
  const { attributes, listeners, transform, transition, setNodeRef } =
    useSortable({ id });
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  function onDuplicate(index: number) {
    appendNested(
      getValues(`standardSection.${nestIndex}.nested.${index}` as const)
    );
  }

  function onAppend() {
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
        labelRegister={register(`standardSection.${nestIndex}.label` as const)}
        title={getValues(`standardSection.${nestIndex}.label` as const)}
        onAppend={onAppend}
        onRemove={() => remove(nestIndex)}
        onDuplicate={() => append(getValues(`standardSection.${nestIndex}`))}
      />
      <AccordionPanel>
        {R.isEmpty(fields) ? (
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
        {fields.map((item, index) => {
          return (
            <Accordion key={item.id} allowToggle>
              <AccordionItem
                borderTopWidth="0"
                _last={{ borderBottomWidth: 0 }}
              >
                <SectionHeader
                  defaultLabel=""
                  title={
                    getValues(
                      `standardSection.${nestIndex}.nested.${index}.title` as const
                    ) || "Untitled"
                  }
                  onAppend={onAppend}
                  onRemove={() => removeNested(index)}
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
                            `standardSection.${nestIndex}.nested.${index}.title` as const
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
                            `standardSection.${nestIndex}.nested.${index}.subtitle` as const
                          )}
                        />
                      </FormControl>
                    </GridItem>
                    <FormControl>
                      <FormLabel>Website</FormLabel>
                      <Input
                        size="sm"
                        {...register(
                          `standardSection.${nestIndex}.nested.${index}.website` as const
                        )}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>City</FormLabel>
                      <Input
                        size="sm"
                        {...register(
                          `standardSection.${nestIndex}.nested.${index}.city` as const
                        )}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Start date</FormLabel>
                      <Input
                        size="sm"
                        {...register(
                          `standardSection.${nestIndex}.nested.${index}.startDate` as const
                        )}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>End date</FormLabel>
                      <Input
                        size="sm"
                        {...register(
                          `standardSection.${nestIndex}.nested.${index}.endDate` as const
                        )}
                      />
                    </FormControl>
                    <GridItem colSpan={2}>
                      <FormControl>
                        <FormLabel>Description</FormLabel>
                        <Textarea
                          size="sm"
                          {...register(
                            `standardSection.${nestIndex}.nested.${index}.description` as const
                          )}
                        />
                      </FormControl>
                    </GridItem>
                  </Grid>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          );
        })}
      </AccordionPanel>
    </AccordionItem>
  );
}

export default StandardSection;
