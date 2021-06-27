import {
  Box,
  Grid,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  GridItem,
  Textarea,
  FormControl,
  FormHelperText,
  Editable,
  EditablePreview,
  EditableInput,
} from "@chakra-ui/react";

import { Register } from "../types";

type props = {
  nestIndex: number;
  label: string;
  register: Register;
};

function TagListSection(props: props) {
  const { nestIndex, label, register } = props;

  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            <Editable defaultValue={label}>
              <EditablePreview />
              <EditableInput
                {...register(`tagListSection.${nestIndex}.label` as const)}
              />
            </Editable>
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <Grid templateColumns="1fr 1fr" gap="4" mb="4">
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
