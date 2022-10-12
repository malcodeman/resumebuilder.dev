import {
  Center,
  Heading,
  Flex,
  Button,
  Text,
  Grid,
  Box,
  useBoolean,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";
import { length, map } from "ramda";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

import useResumes from "../../hooks/useResumes";

import Poser20 from "../../illustrations/Poser20";

const LIST = [
  {
    textTransKey: "unlimited_resumes",
  },
  {
    textTransKey: "unlimited_sections",
  },
  {
    textTransKey: "unlimited_downloads",
  },
];

function Footer() {
  const { t } = useTranslation();
  const router = useRouter();
  const { createNew } = useResumes();
  const [isLoading, setIsLoading] = useBoolean();

  async function handleOnSubmit() {
    setIsLoading.on();
    const resume = createNew();
    await router.push(`/resumes/${resume.id}`);
    setIsLoading.off();
  }

  return (
    <Center as="section" flexDirection="column">
      <Heading mb="4">{t("get_started_with_resume_builder")}</Heading>
      <Button
        as={motion.button}
        whileHover={{ scale: 1.1 }}
        colorScheme="blue"
        mb="4"
        isLoading={isLoading}
        data-cy="build-for-free-button"
        onClick={() => handleOnSubmit()}
      >
        {t("build_for_free")}
      </Button>
      <Grid
        templateColumns={["1fr", `repeat(${length(LIST)}, 1fr)`]}
        gap="2"
        mb="16"
      >
        {map(
          (item) => (
            <Flex key={item.textTransKey} alignItems="center">
              <FiCheck style={{ marginRight: "0.5rem" }} />
              <Text mr="2">{t(item.textTransKey)}</Text>
            </Flex>
          ),
          LIST
        )}
      </Grid>
      <Box display={["none", "block"]} width="full">
        <Box maxW="sm">
          <Poser20 />
        </Box>
      </Box>
    </Center>
  );
}

export default Footer;
