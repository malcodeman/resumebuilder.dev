import React from "react";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useForm, useFieldArray } from "react-hook-form";
import {
  Button,
  Center,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  Spinner,
  Text,
  useBoolean,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { FiArrowRight, FiPlus } from "react-icons/fi";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { equals, find, isNil, length, map } from "ramda";

import useResume from "../../../hooks/useResume";

import NotFound from "../../../components/misc/NotFound";
import StepsNavigation from "../../../components/builder/StepsNavigation";

import { NestedField, SectionField } from "../../../types";

const ARROW_RIGHT_VARIANTS = {
  mouseenter: { x: 5 },
  mouseleave: { x: 0 },
};
const defaultValues = {
  title: "",
  subtitle: "",
  website: "",
  city: "",
  startDate: "",
  endDate: "",
  description: "",
};

function Education() {
  const { t } = useTranslation();
  const form = useForm({
    defaultValues: {
      education: [defaultValues],
    },
  });
  const { resume, isLoading, setResume } = useResume();
  const router = useRouter();
  const { fields, append } = useFieldArray({
    control: form.control,
    name: "education",
  });
  const [isPageLoading, setIsPageLoading] = useBoolean();

  React.useEffect(() => {
    if (resume) {
      const field = find(
        (item) => equals(item.name, "education"),
        resume.section
      );
      if (field) {
        form.reset({ education: field.nested });
      }
    }
  }, [resume, form]);

  async function handleOnSubmit(values: { education: NestedField[] }) {
    setIsPageLoading.on();
    const section: SectionField = {
      name: "education",
      label: "Education",
      nested: values.education,
    };
    const nextResume = {
      ...resume,
      section: map(
        (item) => (equals(item.name, "education") ? section : item),
        resume.section
      ),
    };
    setResume(nextResume);
    await router.push(`/resumes/${resume.id}`);
    setIsPageLoading.off();
  }

  if (isLoading) {
    return (
      <Center flexDirection="column" minH="100vh" padding="4">
        <Spinner />
      </Center>
    );
  }

  if (isNil(resume)) {
    return (
      <>
        <Head>
          <title>Resume not found | resumebuilder.dev</title>
        </Head>
        <NotFound description={t("resume_404_description")} link="/resumes" />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Education | resumebuilder.dev</title>
      </Head>
      <Container paddingY="8" maxW="container.sm">
        <Heading mb="4">{t("education")}</Heading>
        <Text mb="4">{t("tell_us_about_your_educational_background")}</Text>
        <StepsNavigation mb="4" currentPage="education" />
        <form onSubmit={form.handleSubmit(handleOnSubmit)}>
          {fields.map((field, index) => (
            <React.Fragment key={field.id}>
              <Grid mb="4" templateColumns="1fr 1fr" gap="4">
                <GridItem colSpan={2}>
                  <FormControl>
                    <FormLabel>{t("school")}</FormLabel>
                    <Input
                      variant="filled"
                      size="sm"
                      borderRadius="md"
                      data-cy="education-title-input"
                      {...form.register(`education.${index}.title` as const)}
                    />
                  </FormControl>
                </GridItem>
                <GridItem colSpan={2}>
                  <FormControl>
                    <FormLabel>{t("degree")}</FormLabel>
                    <Input
                      variant="filled"
                      size="sm"
                      borderRadius="md"
                      data-cy="education-subtitle-input"
                      {...form.register(`education.${index}.subtitle` as const)}
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
                      data-cy="education-start-date-input"
                      {...form.register(
                        `education.${index}.startDate` as const
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
                      data-cy="education-end-date-input"
                      {...form.register(`education.${index}.endDate` as const)}
                    />
                  </FormControl>
                </GridItem>
              </Grid>
              {index < length(fields) - 1 ? <Divider marginY="2" /> : null}
            </React.Fragment>
          ))}
          <Button
            mb="16"
            size="sm"
            width="100%"
            variant="ghost"
            leftIcon={<FiPlus />}
            onClick={() => append(defaultValues)}
          >
            {t("add_one_more_education")}
          </Button>
          <Button
            as={motion.button}
            isLoading={isPageLoading}
            size="sm"
            mb="2"
            width="full"
            colorScheme="blue"
            whileHover="mouseenter"
            type="submit"
            data-cy="finish-button"
            rightIcon={
              <motion.div variants={ARROW_RIGHT_VARIANTS}>
                <FiArrowRight />
              </motion.div>
            }
          >
            {t("finish")}
          </Button>
        </form>
      </Container>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default Education;
