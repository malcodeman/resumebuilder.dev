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
import { Mail, Phone } from "react-feather";
import { useFormContext, useWatch } from "react-hook-form";
import { concat, replace } from "ramda";

import phrases from "../../lib/phrases";

import SectionHeader from "./SectionHeader";
import PreWrittenPhrasesModal from "./PreWrittenPhrasesModal";

function Summary() {
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
          <FormLabel>Summary</FormLabel>
          <Textarea variant="filled" size="sm" {...register("about.summary")} />
          <FormHelperText onClick={phrasesModal.onOpen}>
            Add pre-written phrases
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
  const { register } = useFormContext();

  return (
    <AccordionItem
      borderTopWidth="0"
      cursor="pointer"
      _last={{ borderBottomWidth: 0 }}
    >
      <SectionHeader label="Personal details" />
      <AccordionPanel>
        <Grid templateColumns="1fr 1fr" gap="4">
          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input variant="filled" size="sm" {...register("about.title")} />
            </FormControl>
          </GridItem>
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input
                variant="filled"
                size="sm"
                {...register("about.firstName")}
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <FormControl>
              <FormLabel>Last name</FormLabel>
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
                  <Mail size={20} />
                </InputLeftElement>
                <Input variant="filled" {...register("about.email")} />
              </InputGroup>
            </FormControl>
          </GridItem>
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <FormControl>
              <FormLabel>Phone</FormLabel>
              <InputGroup size="sm">
                <InputLeftElement>
                  <Phone size={20} />
                </InputLeftElement>
                <Input variant="filled" {...register("about.phone")} />
              </InputGroup>
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>Website</FormLabel>
              <Input
                variant="filled"
                size="sm"
                {...register("about.website")}
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <FormControl>
              <FormLabel>City</FormLabel>
              <Input variant="filled" size="sm" {...register("about.city")} />
            </FormControl>
          </GridItem>
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <FormControl>
              <FormLabel>Country</FormLabel>
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
