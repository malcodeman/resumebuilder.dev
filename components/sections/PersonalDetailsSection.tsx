import {
  Grid,
  AccordionItem,
  AccordionPanel,
  Input,
  GridItem,
  Textarea,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  FormHelperText,
  useDisclosure,
} from "@chakra-ui/react";
import { FiMail, FiPhone } from "react-icons/fi";
import { useFormContext, useWatch } from "react-hook-form";
import { concat, replace } from "ramda";
import { useTranslation } from "next-i18next";

import phrases from "../../lib/phrases";

import SectionHeader from "./SectionHeader";
import PreWrittenPhrasesModal from "./PreWrittenPhrasesModal";

function Summary() {
  const { t } = useTranslation();
  const { control, register, getValues, setValue } = useFormContext();
  const phrasesModal = useDisclosure();
  const inputName = "about.summary";
  const summary = useWatch({
    control,
    name: inputName,
  });

  function handleOnPhraseChange(phrase: string, isChecked: boolean) {
    const currentValue: string = getValues(inputName);
    const sentence = `${phrase} `;
    if (isChecked) {
      setValue(inputName, replace(sentence, "", currentValue));
    } else {
      setValue(inputName, concat(currentValue, sentence));
    }
  }

  return (
    <>
      <GridItem colSpan={2}>
        <FormControl>
          <FormLabel>{t("summary")}</FormLabel>
          <Textarea variant="filled" size="sm" {...register("about.summary")} />
          <FormHelperText onClick={phrasesModal.onOpen}>
            {t("add_pre_written_phrases")}
          </FormHelperText>
        </FormControl>
      </GridItem>
      <PreWrittenPhrasesModal
        isOpen={phrasesModal.isOpen}
        value={summary}
        phrases={phrases.SUMMARY}
        onClose={phrasesModal.onClose}
        onChange={handleOnPhraseChange}
      />
    </>
  );
}

function PersonalDetailsSection() {
  const { t } = useTranslation();
  const { register } = useFormContext();

  return (
    <AccordionItem
      borderTopWidth="0"
      cursor="pointer"
      _last={{ borderBottomWidth: 0 }}
    >
      <SectionHeader label={t("personal_details")} />
      <AccordionPanel>
        <Grid templateColumns="1fr 1fr" gap="4">
          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>{t("title")}</FormLabel>
              <Input variant="filled" size="sm" {...register("about.title")} />
            </FormControl>
          </GridItem>
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <FormControl>
              <FormLabel>{t("first_name")}</FormLabel>
              <Input
                variant="filled"
                size="sm"
                {...register("about.firstName")}
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <FormControl>
              <FormLabel>{t("last_name")}</FormLabel>
              <Input
                variant="filled"
                size="sm"
                {...register("about.lastName")}
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <InputGroup size="sm">
                <InputLeftElement>
                  <FiMail />
                </InputLeftElement>
                <Input variant="filled" {...register("about.email")} />
              </InputGroup>
            </FormControl>
          </GridItem>
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <FormControl>
              <FormLabel>{t("phone")}</FormLabel>
              <InputGroup size="sm">
                <InputLeftElement>
                  <FiPhone />
                </InputLeftElement>
                <Input variant="filled" {...register("about.phone")} />
              </InputGroup>
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>{t("website")}</FormLabel>
              <Input
                variant="filled"
                size="sm"
                {...register("about.website")}
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <FormControl>
              <FormLabel>{t("city")}</FormLabel>
              <Input variant="filled" size="sm" {...register("about.city")} />
            </FormControl>
          </GridItem>
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <FormControl>
              <FormLabel>{t("country")}</FormLabel>
              <Input
                variant="filled"
                size="sm"
                {...register("about.country")}
              />
            </FormControl>
          </GridItem>
          <Summary />
        </Grid>
      </AccordionPanel>
    </AccordionItem>
  );
}

export default PersonalDetailsSection;
