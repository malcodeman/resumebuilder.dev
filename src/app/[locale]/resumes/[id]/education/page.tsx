"use client";
import React from "react";
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
import { useTranslations } from "next-intl";
import { ArrowRightIcon, PlusIcon } from "lucide-react";
import { motion } from "framer-motion";
import { equals, find, isNil, length, map } from "ramda";
import useResume from "hooks/useResume";
import NotFound from "components/misc/NotFound";
import StepsNavigation from "app/[locale]/resumes/[id]/components/StepsNavigation";
import { useRouter } from "navigation";
import { NestedField, SectionField } from "types";

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
  const t = useTranslations();
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

  function handleOnSubmit(values: { education: NestedField[] }) {
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
    router.push(`/resumes/${resume.id}`);
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
      <NotFound description={t("resume_404_description")} link="/resumes" />
    );
  }

  return (
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
                    data-testid="education-title-input"
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
                    data-testid="education-subtitle-input"
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
                    data-testid="education-start-date-input"
                    {...form.register(`education.${index}.startDate` as const)}
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
                    data-testid="education-end-date-input"
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
          leftIcon={<PlusIcon size={16} />}
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
          data-testid="finish-button"
          rightIcon={
            <motion.div variants={ARROW_RIGHT_VARIANTS}>
              <ArrowRightIcon size={16} />
            </motion.div>
          }
        >
          {t("finish")}
        </Button>
      </form>
    </Container>
  );
}

export default Education;
