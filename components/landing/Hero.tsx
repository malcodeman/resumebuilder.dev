import {
  Heading,
  Button,
  Grid,
  Box,
  Text,
  List,
  ListItem,
  ListIcon,
  Center,
  useBoolean,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { motion } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";
import { useRouter } from "next/router";
import { length } from "ramda";
import { trackGoal } from "fathom-client";

import { FATHOM_EVENTS } from "../../lib/constants";

import Poser12 from "../../illustrations/Poser12";

import useResumes from "../../hooks/useResumes";

function Hero() {
  const { t } = useTranslation();
  const router = useRouter();
  const { resumes, createNew } = useResumes();
  const [isLoading, setIsLoading] = useBoolean();

  async function handleOnSubmit() {
    trackGoal(FATHOM_EVENTS.BUILD_FOR_FREE_TOP, 0);
    setIsLoading.on();
    const resume = createNew();
    if (length(resumes) > 0) {
      await router.push(`/resumes/${resume.id}`);
    } else {
      await router.push(`/resumes/${resume.id}/about`);
    }
    setIsLoading.off();
  }

  return (
    <Grid
      as={motion.section}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      templateColumns={["1fr", "repeat(2, 1fr)"]}
      gap="8"
      mb="32"
    >
      <Box>
        <Heading mb="4">{t("hero_heading")}</Heading>
        <Text mb="4">{t("hero_subheading")}</Text>
        <Button
          as={motion.button}
          isLoading={isLoading}
          whileHover={{ scale: 1.1 }}
          colorScheme="blue"
          mb="4"
          data-cy="build-for-free-top-button"
          onClick={() => handleOnSubmit()}
        >
          {t("build_for_free")}
        </Button>
        <List>
          <ListItem>
            <ListIcon as={FiCheckCircle} color="green.500" />
            {t("no_credit_card_needed")}
          </ListItem>
          <ListItem>
            <ListIcon as={FiCheckCircle} color="green.500" />
            {t("no_account_needed")}
          </ListItem>
        </List>
      </Box>
      <Center>
        <Box maxW="sm" width="full">
          <Poser12 />
        </Box>
      </Center>
    </Grid>
  );
}

export default Hero;
