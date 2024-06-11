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
} from "@chakra-ui/react";
import { MailIcon, PhoneIcon, LinkIcon } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";
import { concat, replace } from "ramda";
import { useTranslations } from "next-intl";
import { utils } from "lib/utils";
import { useLocalStorage } from "hooks/useLocalStorage";
import { SectionHeader } from "app/[locale]/resumes/[id]/_components/_sections/SectionHeader";
import { AddPreWrittenPhrasesButton } from "app/[locale]/resumes/[id]/_components/_sections/AddPreWrittenPhrasesButton";
import { ProfilePicture } from "app/[locale]/resumes/[id]/_components/_sections/ProfilePicture";

function ProfilePictureGridItem() {
  const { control } = useFormContext();
  const template = useWatch({
    control,
    name: "design.template",
  });

  return (
    <GridItem colSpan={2}>
      <ProfilePicture template={template} />
    </GridItem>
  );
}

function SummaryGridItem() {
  const t = useTranslations();
  const { control, register, getValues, setValue } = useFormContext();
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
        <FormControl mb="2">
          <FormLabel>{t("summary")}</FormLabel>
          <Textarea
            variant="filled"
            size="sm"
            borderRadius="md"
            height="40"
            sx={utils.getScrollbarStyle()}
            data-testid="about-summary-textarea"
            {...register("about.summary")}
          />
        </FormControl>
        <AddPreWrittenPhrasesButton
          currentPhrases={summary}
          onChange={handleOnPhraseChange}
        />
      </GridItem>
    </>
  );
}

function PersonalDetailsSection() {
  const t = useTranslations();
  const { register } = useFormContext();
  const hideSensitiveData = useLocalStorage("hide-sensitive-data");
  return (
    <AccordionItem borderTopWidth="0" _last={{ borderBottomWidth: 0 }}>
      <SectionHeader label={t("personal_details")} />
      <AccordionPanel>
        <Grid templateColumns="1fr 1fr" gap="4">
          <ProfilePictureGridItem />
          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>{t("title")}</FormLabel>
              <Input
                variant="filled"
                size="sm"
                borderRadius="md"
                data-testid="about-title-input"
                {...register("about.title")}
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <FormControl>
              <FormLabel>{t("first_name")}</FormLabel>
              <Input
                variant="filled"
                size="sm"
                borderRadius="md"
                data-testid="about-first-name-input"
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
                borderRadius="md"
                data-testid="about-last-name-input"
                {...register("about.lastName")}
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <InputGroup size="sm">
                <InputLeftElement>
                  <MailIcon size={16} />
                </InputLeftElement>
                <Input
                  type={hideSensitiveData.value ? "password" : "text"}
                  variant="filled"
                  borderRadius="md"
                  data-testid="about-email-input"
                  {...register("about.email")}
                />
              </InputGroup>
            </FormControl>
          </GridItem>
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <FormControl>
              <FormLabel>{t("phone")}</FormLabel>
              <InputGroup size="sm">
                <InputLeftElement>
                  <PhoneIcon size={16} />
                </InputLeftElement>
                <Input
                  type={hideSensitiveData.value ? "password" : "text"}
                  variant="filled"
                  borderRadius="md"
                  data-testid="about-phone-input"
                  {...register("about.phone")}
                />
              </InputGroup>
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>{t("website")}</FormLabel>
              <InputGroup size="sm">
                <InputLeftElement>
                  <LinkIcon size={16} />
                </InputLeftElement>
                <Input
                  variant="filled"
                  size="sm"
                  borderRadius="md"
                  data-testid="about-website-input"
                  {...register("about.website")}
                />
              </InputGroup>
            </FormControl>
          </GridItem>
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <FormControl>
              <FormLabel>{t("city")}</FormLabel>
              <Input
                variant="filled"
                size="sm"
                borderRadius="md"
                data-testid="about-city-input"
                {...register("about.city")}
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <FormControl>
              <FormLabel>{t("country")}</FormLabel>
              <Input
                variant="filled"
                size="sm"
                borderRadius="md"
                data-testid="about-country-input"
                {...register("about.country")}
              />
            </FormControl>
          </GridItem>
          <SummaryGridItem />
        </Grid>
      </AccordionPanel>
    </AccordionItem>
  );
}

export { PersonalDetailsSection };
