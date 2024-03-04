import {
  Center,
  Heading,
  Flex,
  Button,
  Text,
  Grid,
  Box,
  Image,
  useBoolean,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";
import { length, map } from "ramda";
import { useTranslations } from "next-intl";
import { useMediaQuery } from "@react-hookz/web";

import useResumes from "../../hooks/useResumes";
import { useRouter } from "../../navigation";

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
  const t = useTranslations();
  const router = useRouter();
  const { resumes, createNew } = useResumes();
  const [isLoading, setIsLoading] = useBoolean();
  const screenshotSourceMobile = useColorModeValue(
    "landing/builder-screenshot-mobile-light.png",
    "landing/builder-screenshot-mobile-dark.png"
  );
  const screenshotSourceDesktop = useColorModeValue(
    "landing/builder-screenshot-desktop-light.png",
    "landing/builder-screenshot-desktop-dark.png"
  );
  const isSmallDevice = useMediaQuery("(min-width: 30em)");
  const screenshotSource = isSmallDevice
    ? screenshotSourceDesktop
    : screenshotSourceMobile;

  function handleOnSubmit() {
    setIsLoading.on();
    const resume = createNew();
    if (length(resumes) > 0) {
      router.push(`/resumes/${resume.id}`);
    } else {
      router.push(`/resumes/${resume.id}/about`);
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
          data-cy="build-for-free-bottom-button"
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
      <Image
        src={screenshotSource}
        alt=""
        boxShadow="0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)"
      />
    </Box>
  );
}

export default GetStarted;
