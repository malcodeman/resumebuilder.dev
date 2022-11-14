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
import { length, map, equals } from "ramda";
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

function GetStarted() {
  const { t } = useTranslation();
  const router = useRouter();
  const { resumes, createNew } = useResumes();
  const [isLoading, setIsLoading] = useBoolean();

  async function handleOnSubmit() {
    setIsLoading.on();
    const resume = createNew();
    if (equals(length(resumes), 1)) {
      await router.push(`/resumes/${resume.id}`);
    } else {
      await router.push(`/resumes/${resume.id}/about`);
    }
    setIsLoading.off();
  }

  return (
    <Box
      as={motion.section}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      mb="32"
    >
      <Center flexDirection="column" mb="16">
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
        <Grid templateColumns={["1fr", `repeat(${length(LIST)}, 1fr)`]} gap="2">
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
      </Center>
      <Box display={["none", "block"]} maxW="sm">
        <Poser20 />
      </Box>
    </Box>
  );
}

export default GetStarted;
