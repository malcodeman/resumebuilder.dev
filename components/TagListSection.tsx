import {
  Grid,
  AccordionItem,
  AccordionPanel,
  GridItem,
  Textarea,
  FormControl,
  FormHelperText,
} from "@chakra-ui/react";
import { UseFormGetValues, FieldArrayMethodProps } from "react-hook-form";

import SectionHeader from "./SectionHeader";

import { Register, Fields } from "../types";

type props = {
  nestIndex: number;
  defaultLabel: string;
  getValues: UseFormGetValues<Fields>;
  register: Register;
  remove: (index: number) => void;
  append: (
    value: Partial<any> | Partial<any>[],
    options?: FieldArrayMethodProps
  ) => void;
};

function TagListSection(props: props) {
  const { nestIndex, defaultLabel, getValues, register, remove, append } =
    props;

  return (
    <AccordionItem borderTopWidth="0" _last={{ borderBottomWidth: 0 }}>
      <SectionHeader
        defaultLabel={defaultLabel}
        labelRegister={register(`tagListSection.${nestIndex}.label` as const)}
        title={getValues(`tagListSection.${nestIndex}.label` as const)}
        onRemove={() => remove(nestIndex)}
        onDuplicate={() => append(getValues(`tagListSection.${nestIndex}`))}
      />
      <AccordionPanel>
        <Grid templateColumns="1fr 1fr" gap="4">
          <GridItem colSpan={2}>
            <FormControl>
              <Textarea
                size="sm"
                {...register(`tagListSection.${nestIndex}.tags` as const)}
              />
              <FormHelperText>Add one item on each line</FormHelperText>
            </FormControl>
          </GridItem>
        </Grid>
      </AccordionPanel>
    </AccordionItem>
  );
}

export default TagListSection;
