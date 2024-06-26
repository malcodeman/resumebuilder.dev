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
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { ArrowRightIcon, PlusIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { equals, find, isNil, length, map } from "ramda";
import { useResume } from "hooks/useResume";
import { NotFound } from "components/misc/NotFound";
import { StepsNavigation } from "app/[locale]/resumes/[id]/(stepper)/StepsNavigation";
import { Link, useRouter } from "navigation";
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

function Employment() {
  const t = useTranslations();
  const form = useForm({
    defaultValues: {
      employment: [defaultValues],
    },
  });
  const { resume, isLoading, setResume } = useResume();
  const router = useRouter();
  const id = useParams().id;
  const { fields, append } = useFieldArray({
    control: form.control,
    name: "employment",
  });

  React.useEffect(() => {
    if (resume) {
      const field = find(
        (item) => equals(item.name, "employment"),
        resume.section
      );
      if (field) {
        form.reset({ employment: field.nested });
      }
    }
  }, [resume, form]);

  function handleOnSubmit(values: { employment: NestedField[] }) {
    const section: SectionField = {
      name: "employment",
      label: "Employment History",
      nested: values.employment,
    };
    const nextResume = {
      ...resume,
      section: map(
        (item) => (equals(item.name, "employment") ? section : item),
        resume.section
      ),
    };
    setResume(nextResume);
    router.push(`/resumes/${resume.id}/education`);
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
      <Heading mb="4">{t("employment_history")}</Heading>
      <Text mb="4">{t("tell_us_about_your_work_experience")}</Text>
      <StepsNavigation mb="4" currentPage="employment" />
      <form onSubmit={form.handleSubmit(handleOnSubmit)}>
        {fields.map((field, index) => (
          <React.Fragment key={field.id}>
            <Grid mb="4" templateColumns="1fr 1fr" gap="4">
              <GridItem colSpan={2}>
                <FormControl>
                  <FormLabel>{t("company")}</FormLabel>
                  <Input
                    variant="filled"
                    size="sm"
                    borderRadius="md"
                    data-testid="employment-title-input"
                    {...form.register(`employment.${index}.title` as const)}
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={2}>
                <FormControl>
                  <FormLabel>{t("job_title")}</FormLabel>
                  <Input
                    variant="filled"
                    size="sm"
                    borderRadius="md"
                    data-testid="employment-subtitle-input"
                    {...form.register(`employment.${index}.subtitle` as const)}
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
                    data-testid="employment-start-date-input"
                    {...form.register(`employment.${index}.startDate` as const)}
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
                    data-testid="employment-end-date-input"
                    {...form.register(`employment.${index}.endDate` as const)}
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
          {t("add_one_more_employment")}
        </Button>
        <Button
          as={motion.button}
          size="sm"
          mb="2"
          width="full"
          colorScheme="blue"
          whileHover="mouseenter"
          type="submit"
          data-testid="next-button"
          rightIcon={
            <motion.div variants={ARROW_RIGHT_VARIANTS}>
              <ArrowRightIcon size={16} />
            </motion.div>
          }
        >
          {t("next")}
        </Button>
        <Link href={`/resumes/${id}/education`} passHref>
          <Button size="sm" width="full" variant="ghost">
            {t("skip")}
          </Button>
        </Link>
      </form>
    </Container>
  );
}

export default Employment;
