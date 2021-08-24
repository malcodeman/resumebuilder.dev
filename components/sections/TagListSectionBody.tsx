import {
  Grid,
  AccordionPanel,
  GridItem,
  Textarea,
  FormControl,
  FormHelperText,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

type props = {
  index: number;
};

function TagListSectionBody(props: props) {
  const { index } = props;
  const { register } = useFormContext();

  return (
    <AccordionPanel onPointerDown={(e) => e.stopPropagation()}>
      <Grid templateColumns="1fr 1fr" gap="4">
        <GridItem colSpan={2}>
          <FormControl>
            <Textarea
              size="sm"
              {...register(`section.${index}.tags` as const)}
            />
            <FormHelperText>Add one item on each line</FormHelperText>
          </FormControl>
        </GridItem>
      </Grid>
    </AccordionPanel>
  );
}

export default TagListSectionBody;
