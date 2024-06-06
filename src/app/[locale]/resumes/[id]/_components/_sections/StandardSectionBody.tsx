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
  useAccordionItemState,
} from "@chakra-ui/react";
import { useFormContext, useWatch } from "react-hook-form";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { and, not, equals, replace, concat } from "ramda";
import { useTranslations } from "next-intl";
import { Section } from "types";
import utils from "lib/utils";
import SectionHeader from "app/[locale]/resumes/[id]/_components/_sections/SectionHeader";
import AddPreWrittenPhrasesButton from "app/[locale]/resumes/[id]/_components/_sections/AddPreWrittenPhrasesButton";

type Props = {
  id: string;
  index: number;
  nestIndex: number;
  name: Section;
  isDragDisabled: boolean;
  onDuplicate: (index: number) => void;
  onRemove: (index: number) => void;
};

function Header({ index, nestIndex, isDragging, onRemove, onDuplicate }) {
  const { control } = useFormContext();
  const label = useWatch({
    control,
    name: `section.${index}.nested.${nestIndex}.title`,
  });
  const { isOpen, onClose } = useAccordionItemState();

  React.useEffect(() => {
    if (and(isOpen, isDragging)) {
      onClose();
    }
  }, [isOpen, isDragging, onClose]);

  return (
    <SectionHeader
      label={label}
      onRemove={onRemove}
      onDuplicate={onDuplicate}
    />
  );
}

function Description({ index, nestIndex, isEmployment }) {
  const t = useTranslations();
  const { control, register, getValues, setValue } = useFormContext();
  const inputName = `section.${index}.nested.${nestIndex}.description`;
  const description = useWatch({
    control,
    name: inputName,
  });

  function handleOnPhraseChange(phrase: string, isChecked: boolean) {
    const currentValue: string = getValues(inputName);
    const point = `• ${phrase}\n`;
    if (isChecked) {
      setValue(inputName, replace(point, "", currentValue));
    } else {
      setValue(inputName, concat(currentValue, point));
    }
  }

  return (
    <>
      <GridItem colSpan={2}>
        <FormControl mb="2">
          <FormLabel>{t("description")}</FormLabel>
          <Textarea
            variant="filled"
            size="sm"
            borderRadius="md"
            height="40"
            sx={utils.getScrollbarStyle()}
            data-testid="section-nested-description-textarea"
            {...register(
              `section.${index}.nested.${nestIndex}.description` as const
            )}
          />
        </FormControl>
        {isEmployment ? (
          <AddPreWrittenPhrasesButton
            currentPhrases={description}
            onChange={handleOnPhraseChange}
          />
        ) : null}
      </GridItem>
    </>
  );
}

function getTitleLabelTransKey(name: Section) {
  switch (name) {
    case "employment":
    case "internships":
      return "company";
    case "education":
      return "school";
    case "projects":
      return "name";
    default:
      return "title";
  }
}

function getSubtitleLabelTransKey(name: Section) {
  switch (name) {
    case "employment":
    case "internships":
      return "job_title";
    case "education":
      return "degree";
    case "projects":
      return "role";
    default:
      return "subtitle";
  }
}

function StandardSectionBody(props: Props) {
  const { id, index, nestIndex, name, isDragDisabled, onDuplicate, onRemove } =
    props;
  const t = useTranslations();
  const {
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
    overIndex,
    setNodeRef,
  } = useSortable({ id, disabled: isDragDisabled });
  const { register } = useFormContext();
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };
  const isOver = and(not(isDragging), equals(overIndex, nestIndex));
  return (
    <Accordion
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      opacity={isDragging ? "0.5" : "initial"}
      backgroundColor={isOver ? "rgba(0, 0, 0, 0.1)" : "initial"}
      allowToggle
      reduceMotion
    >
      <AccordionItem borderTopWidth="0" _last={{ borderBottomWidth: 0 }}>
        {({ isExpanded }) => (
          <>
            <Header
              index={index}
              nestIndex={nestIndex}
              isDragging={isDragging}
              onRemove={() => onRemove(nestIndex)}
              onDuplicate={() => onDuplicate(nestIndex)}
            />
            {isExpanded ? (
              <AccordionPanel
                cursor="default"
                onPointerDown={(e) => e.stopPropagation()}
              >
                <Grid templateColumns="1fr 1fr" gap="4">
                  <GridItem colSpan={2}>
                    <FormControl>
                      <FormLabel>{t(getTitleLabelTransKey(name))}</FormLabel>
                      <Input
                        variant="filled"
                        size="sm"
                        borderRadius="md"
                        data-testid="section-nested-title-input"
                        {...register(
                          `section.${index}.nested.${nestIndex}.title`
                        )}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={2}>
                    <FormControl>
                      <FormLabel>{t(getSubtitleLabelTransKey(name))}</FormLabel>
                      <Input
                        variant="filled"
                        size="sm"
                        borderRadius="md"
                        data-testid="section-nested-subtitle-input"
                        {...register(
                          `section.${index}.nested.${nestIndex}.subtitle` as const
                        )}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={{ base: 2, md: 1 }}>
                    <FormControl>
                      <FormLabel>{t("website")}</FormLabel>
                      <Input
                        variant="filled"
                        size="sm"
                        borderRadius="md"
                        data-testid="section-nested-website-input"
                        {...register(
                          `section.${index}.nested.${nestIndex}.website` as const
                        )}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={{ base: 2, md: 1 }}>
                    <FormControl>
                      <FormLabel>{t("city")}</FormLabel>
                      <Input
                        variant="filled"
                        size="sm"
                        borderRadius="md"
                        data-testid="section-nested-city-input"
                        {...register(
                          `section.${index}.nested.${nestIndex}.city` as const
                        )}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={{ base: 2, md: 1 }}>
                    <FormControl>
                      <FormLabel>{t("start_date")}</FormLabel>
                      <Input
                        variant="filled"
                        size="sm"
                        borderRadius="md"
                        data-testid="section-nested-start-date-input"
                        {...register(
                          `section.${index}.nested.${nestIndex}.startDate` as const
                        )}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={{ base: 2, md: 1 }}>
                    <FormControl>
                      <FormLabel>{t("end_date")}</FormLabel>
                      <Input
                        variant="filled"
                        size="sm"
                        borderRadius="md"
                        data-testid="section-nested-end-date-input"
                        {...register(
                          `section.${index}.nested.${nestIndex}.endDate` as const
                        )}
                      />
                    </FormControl>
                  </GridItem>
                  <Description
                    index={index}
                    nestIndex={nestIndex}
                    isEmployment={equals(name, "employment")}
                  />
                </Grid>
              </AccordionPanel>
            ) : (
              <></>
            )}
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
}

export default StandardSectionBody;
