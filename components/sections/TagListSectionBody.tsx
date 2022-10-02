import {
  Grid,
  AccordionPanel,
  GridItem,
  Textarea,
  FormControl,
  FormHelperText,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "next-i18next";

import { Section } from "../../types";

type props = {
  index: number;
  name: Section;
};

function getHelperTextTransKey(name: Section) {
  switch (name) {
    case "skills":
      return "add_one_skill_on_each_line";
    case "hobbies":
      return "add_one_hobbie_on_each_line";
    case "languages":
      return "add_one_language_on_each_line";
    default:
      return "add_one_item_on_each_line";
  }
}

function TagListSectionBody(props: props) {
  const { index, name } = props;
  const { t } = useTranslation();
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
            <FormHelperText>{t(getHelperTextTransKey(name))}</FormHelperText>
          </FormControl>
        </GridItem>
      </Grid>
    </AccordionPanel>
  );
}

export default TagListSectionBody;
