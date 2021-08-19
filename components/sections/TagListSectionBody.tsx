import {
  Grid,
  AccordionPanel,
  GridItem,
  Textarea,
  FormControl,
  FormHelperText,
} from "@chakra-ui/react";

import { Register } from "../../types";

type props = {
  nestIndex: number;
  register: Register;
};

function TagListSectionBody(props: props) {
  const { nestIndex, register } = props;

  return (
    <AccordionPanel>
      <Grid templateColumns="1fr 1fr" gap="4">
        <GridItem colSpan={2}>
          <FormControl onPointerDown={(e) => e.stopPropagation()}>
            <Textarea
              size="sm"
              {...register(`section.${nestIndex}.tags` as const)}
            />
            <FormHelperText>Add one item on each line</FormHelperText>
          </FormControl>
        </GridItem>
      </Grid>
    </AccordionPanel>
  );
}

export default TagListSectionBody;
