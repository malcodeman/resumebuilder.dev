import React from "react";
import {
  Box,
  Grid,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Input,
  GridItem,
  Textarea,
  Button,
  FormControl,
  FormLabel,
  Editable,
  EditablePreview,
  EditableInput,
} from "@chakra-ui/react";
import { Plus } from "react-feather";
import { useFieldArray, UseFormGetValues, Control } from "react-hook-form";

import SectionFooter from "./SectionFooter";

import { Register, Fields } from "../types";

type props = {
  nestIndex: number;
  control: Control<Fields>;
  label: string;
  getValues: UseFormGetValues<Fields>;
  register: Register;
};

function StandardSection(props: props) {
  const { nestIndex, control, label, getValues, register } = props;
  const { fields, remove, append } = useFieldArray({
    control,
    name: `standardSection.${nestIndex}.nested`,
  });

  function onDuplicate(index: number) {
    append(getValues(`standardSection.${nestIndex}.nested.${index}`));
  }

  function handleAppend() {
    append({
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
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            <Editable defaultValue={label}>
              <EditablePreview />
              <EditableInput
                {...register(`standardSection.${nestIndex}.label` as const)}
              />
            </Editable>
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        {fields.map((item, index) => {
          return (
            <React.Fragment key={item.id}>
              <Grid templateColumns="1fr 1fr" gap="4" mb="4">
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
              <SectionFooter
                onDuplicate={() => onDuplicate(index)}
                onRemove={() => remove(index)}
              />
            </React.Fragment>
          );
        })}
        <Button
          size="sm"
          leftIcon={<Plus size={20} />}
          width="100%"
          onClick={handleAppend}
          variant="ghost"
        >
          Add item
        </Button>
      </AccordionPanel>
    </AccordionItem>
  );
}

export default StandardSection;
