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
  Avatar,
  Button,
  Flex,
  ButtonGroup,
  useDisclosure,
} from "@chakra-ui/react";
import {
  FiMail,
  FiPhone,
  FiLink,
  FiCamera,
  FiTrash2,
  FiEdit,
} from "react-icons/fi";
import { useFormContext, useWatch } from "react-hook-form";
import { concat, replace, isEmpty } from "ramda";
import { useTranslation } from "next-i18next";

import phrases from "../../lib/phrases";
import useLocalStorage from "../../hooks/useLocalStorage";
import useProfilePicture from "../../hooks/useProfilePicture";

import SectionHeader from "./SectionHeader";
import PreWrittenPhrasesModal from "./PreWrittenPhrasesModal";
import AddProfilePictureModal from "./AddProfilePictureModal";

function ProfilePicture() {
  const { t } = useTranslation();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [profilePicture, setProfilePicture] = useProfilePicture();
  return (
    <>
      <GridItem colSpan={2}>
        {isEmpty(profilePicture) ? (
          <Button
            size="sm"
            width="full"
            leftIcon={<FiCamera />}
            onClick={onOpen}
            data-cy="add-profile-picture-button"
          >
            {t("add_profile_picture")}
          </Button>
        ) : (
          <>
            <Flex mb="4" justifyContent="center">
              <Avatar
                size="xl"
                backgroundColor="transparent"
                src={profilePicture}
              />
            </Flex>
            <ButtonGroup size="sm" width="full" spacing="4">
              <Button
                width="full"
                leftIcon={<FiEdit />}
                onClick={onOpen}
                data-cy="change-profile-picture-button"
              >
                {t("change")}
              </Button>
              <Button
                width="full"
                leftIcon={<FiTrash2 />}
                onClick={() => setProfilePicture("")}
                data-cy="delete-profile-picture-button"
              >
                {t("delete")}
              </Button>
            </ButtonGroup>
          </>
        )}
      </GridItem>
      <AddProfilePictureModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}

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
          <Textarea
            variant="filled"
            size="sm"
            borderRadius="md"
            height="40"
            style={{ scrollbarWidth: "thin" }}
            data-cy="about-summary-textarea"
            {...register("about.summary")}
          />
          <FormHelperText
            cursor="pointer"
            onClick={phrasesModal.onOpen}
            data-cy="add-pre-written-phrases-form-helper-text"
          >
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
  const [hideSensitiveData] = useLocalStorage("hide-sensitive-data");
  return (
    <AccordionItem borderTopWidth="0" _last={{ borderBottomWidth: 0 }}>
      <SectionHeader label={t("personal_details")} />
      <AccordionPanel>
        <Grid templateColumns="1fr 1fr" gap="4">
          <ProfilePicture />
          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>{t("title")}</FormLabel>
              <Input
                variant="filled"
                size="sm"
                borderRadius="md"
                data-cy="about-title-input"
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
                data-cy="about-first-name-input"
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
                data-cy="about-last-name-input"
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
                <Input
                  type={hideSensitiveData ? "password" : "text"}
                  variant="filled"
                  borderRadius="md"
                  data-cy="about-email-input"
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
                  <FiPhone />
                </InputLeftElement>
                <Input
                  type={hideSensitiveData ? "password" : "text"}
                  variant="filled"
                  borderRadius="md"
                  data-cy="about-phone-input"
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
                  <FiLink />
                </InputLeftElement>
                <Input
                  variant="filled"
                  size="sm"
                  borderRadius="md"
                  data-cy="about-website-input"
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
                data-cy="about-city-input"
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
                data-cy="about-country-input"
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
