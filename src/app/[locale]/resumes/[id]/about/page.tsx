"use client";
import React from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { FiArrowRight, FiMail, FiPhone } from "react-icons/fi";
import { motion } from "framer-motion";
import { isNil } from "ramda";
import useResume from "hooks/useResume";
import NotFound from "components/misc/NotFound";
import StepsNavigation from "app/[locale]/resumes/[id]/components/StepsNavigation";
import { Link, useRouter } from "navigation";
import { AboutField } from "types";

const ARROW_RIGHT_VARIANTS = {
  mouseenter: { x: 5 },
  mouseleave: { x: 0 },
};
const defaultValues = {
  title: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  website: "",
  city: "",
  country: "",
  summary: "",
};

function About() {
  const t = useTranslations();
  const form = useForm({ defaultValues });
  const { resume, isLoading, setResume } = useResume();
  const router = useRouter();
  const id = resume?.id;

  React.useEffect(() => {
    if (resume) {
      form.reset({ ...resume.about });
    }
  }, [resume, form]);

  function handleOnSubmit(about: AboutField) {
    const nextResume = {
      ...resume,
      about,
    };
    setResume(nextResume);
    router.push(`/resumes/${resume.id}/employment`);
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
      <Heading mb="4">{t("personal_details")}</Heading>
      <Text>{t("tell_us_about_yourself")}</Text>
      <Text mb="4">{t("you_will_be_able_to_edit_this_later")}</Text>
      <StepsNavigation mb="4" currentPage="about" />
      <form onSubmit={form.handleSubmit(handleOnSubmit)}>
        <Grid mb="16" templateColumns="1fr 1fr" gap="4">
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <FormControl>
              <FormLabel>{t("first_name")}</FormLabel>
              <Input
                variant="filled"
                size="sm"
                borderRadius="md"
                data-testid="first-name-input"
                {...form.register("firstName")}
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
                data-testid="last-name-input"
                {...form.register("lastName")}
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
                  variant="filled"
                  borderRadius="md"
                  data-testid="email-input"
                  {...form.register("email")}
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
                  variant="filled"
                  borderRadius="md"
                  data-testid="phone-input"
                  {...form.register("phone")}
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
                data-testid="city-input"
                {...form.register("city")}
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
                data-testid="country-input"
                {...form.register("country")}
              />
            </FormControl>
          </GridItem>
        </Grid>
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
              <FiArrowRight />
            </motion.div>
          }
        >
          {t("next")}
        </Button>
        <Link href={`/resumes/${id}/employment`} passHref>
          <Button size="sm" width="full" variant="ghost">
            {t("skip")}
          </Button>
        </Link>
      </form>
    </Container>
  );
}

export default About;
