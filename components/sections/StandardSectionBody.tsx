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
import { useFormContext } from "react-hook-form";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import SectionHeader from "./SectionHeader";

type props = {
  id: string;
  index: number;
  label: string;
  nestIndex: number;
  onDuplicate: (index: number) => void;
  onRemove: (index: number) => void;
};

function StandardSectionBody(props: props) {
  const { id, index, label, nestIndex, onRemove, onDuplicate } = props;
  const {
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
    setNodeRef,
  } = useSortable({ id });
  const { register } = useFormContext();
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  function onPointerDownHanlder(e: React.PointerEvent<HTMLDivElement>) {
    e.stopPropagation();
  }

  return (
    <Accordion
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      opacity={isDragging ? "0.5" : "initial"}
      allowToggle
      reduceMotion
    >
      <AccordionItem borderTopWidth="0" _last={{ borderBottomWidth: 0 }}>
        <SectionHeader
          label={label}
          onRemove={() => onRemove(nestIndex)}
          onDuplicate={() => onDuplicate(nestIndex)}
        />
        <AccordionPanel onPointerDown={onPointerDownHanlder}>
          <Grid templateColumns="1fr 1fr" gap="4">
            <GridItem colSpan={2}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  size="sm"
                  {...register(
                    `section.${index}.nested.${nestIndex}.title` as const
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
                    `section.${index}.nested.${nestIndex}.subtitle` as const
                  )}
                />
              </FormControl>
            </GridItem>
            <FormControl>
              <FormLabel>Website</FormLabel>
              <Input
                size="sm"
                {...register(
                  `section.${index}.nested.${nestIndex}.website` as const
                )}
              />
            </FormControl>
            <FormControl>
              <FormLabel>City</FormLabel>
              <Input
                size="sm"
                {...register(
                  `section.${index}.nested.${nestIndex}.city` as const
                )}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Start date</FormLabel>
              <Input
                size="sm"
                {...register(
                  `section.${index}.nested.${nestIndex}.startDate` as const
                )}
              />
            </FormControl>
            <FormControl>
              <FormLabel>End date</FormLabel>
              <Input
                size="sm"
                {...register(
                  `section.${index}.nested.${nestIndex}.endDate` as const
                )}
              />
            </FormControl>
            <GridItem colSpan={2}>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  size="sm"
                  {...register(
                    `section.${index}.nested.${nestIndex}.description` as const
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
