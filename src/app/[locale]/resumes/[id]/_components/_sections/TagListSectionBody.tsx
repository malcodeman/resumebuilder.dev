import {
  Grid,
  AccordionPanel,
  GridItem,
  Textarea,
  FormControl,
  FormHelperText,
  Tag,
  TagLabel,
  TagRightIcon,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useFormContext, useWatch } from "react-hook-form";
import { useTranslations } from "next-intl";
import { PlusIcon } from "lucide-react";
import {
  equals,
  includes,
  isEmpty,
  map,
  or,
  reject,
  slice,
  split,
} from "ramda";
import { Section } from "types";
import { TAGS } from "lib/tags";
import { utils } from "lib/utils";

type Props = {
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

function getTags(name: Section) {
  switch (name) {
    case "skills":
      return TAGS.SKILLS;
    case "hobbies":
      return TAGS.HOBBIES;
    default:
      return [];
  }
}

function TagListSectionBody(props: Props) {
  const { index, name } = props;
  const t = useTranslations();
  const { control, register, setValue } = useFormContext();
  const hasSuggestedTags = or(equals(name, "skills"), equals(name, "hobbies"));
  const tags: string = useWatch({
    control,
    name: `section.${index}.tags`,
    disabled: !hasSuggestedTags,
  });
  const suggestedTags = reject(
    (item: { id: string; value: string }) =>
      includes(item.value, split("\n", tags)),
    getTags(name)
  );

  function handleOnAddTag(item: string) {
    if (isEmpty(tags)) {
      setValue(`section.${index}.tags`, item);
    } else {
      setValue(`section.${index}.tags`, `${tags}\n${item}`);
    }
  }

  return (
    <AccordionPanel cursor="default" onPointerDown={(e) => e.stopPropagation()}>
      <Grid templateColumns="1fr 1fr" gap="4">
        <GridItem colSpan={2}>
          <FormControl mb={hasSuggestedTags ? "2" : "0"}>
            <Textarea
              variant="filled"
              size="sm"
              borderRadius="md"
              sx={utils.getScrollbarStyle()}
              data-testid="section-tags-textarea"
              {...register(`section.${index}.tags` as const)}
            />
            <FormHelperText>{t(getHelperTextTransKey(name))}</FormHelperText>
          </FormControl>
          {hasSuggestedTags ? (
            <Wrap spacing="2">
              {map(
                (item) => (
                  <WrapItem
                    key={item.id}
                    cursor="pointer"
                    data-testid="suggested-tags-wrap-item"
                    onClick={() => handleOnAddTag(item.value)}
                  >
                    <Tag>
                      <TagLabel>{item.value}</TagLabel>
                      <TagRightIcon as={PlusIcon} size={16} />
                    </Tag>
                  </WrapItem>
                ),
                slice(0, 10, suggestedTags)
              )}
            </Wrap>
          ) : null}
        </GridItem>
      </Grid>
    </AccordionPanel>
  );
}

export { TagListSectionBody };
