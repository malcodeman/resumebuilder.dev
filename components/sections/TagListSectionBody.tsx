import {
  Grid,
  AccordionPanel,
  GridItem,
  Textarea,
  FormControl,
  FormHelperText,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

import { Section } from "../../types";

type props = {
  index: number;
  name: Section;
};

function getHelperText(name: Section) {
  switch (name) {
    case "skillsSection":
      return "Add one skill on each line";
    case "hobbiesSection":
      return "Add one hobbie on each line";
    case "languagesSection":
      return "Add one language on each line";
    default:
      return "Add one item on each line";
  }
}

function TagListSectionBody(props: props) {
  const { index, name } = props;
  const { register } = useFormContext();

  return (
    <AccordionPanel onPointerDown={(e) => e.stopPropagation()}>
      <Grid templateColumns="1fr 1fr" gap="4">
        <GridItem colSpan={2}>
          <FormControl>
            <Textarea
              variant="filled"
              size="sm"
              {...register(`section.${index}.tags` as const)}
            />
            <FormHelperText>{getHelperText(name)}</FormHelperText>
          </FormControl>
        </GridItem>
      </Grid>
    </AccordionPanel>
  );
}

export default TagListSectionBody;
