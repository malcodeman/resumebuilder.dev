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
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { CheckCircleIcon } from "lucide-react";
import { length } from "ramda";
import Poser12 from "illustrations/Poser12";
import useResumes from "hooks/useResumes";
import { useRouter } from "navigation";

function Hero() {
  const t = useTranslations();
  const router = useRouter();
  const { resumes, createNew } = useResumes();
  const [isLoading, setIsLoading] = useBoolean();

  async function handleOnSubmit() {
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
          data-testid="build-for-free-top-button"
          onClick={() => handleOnSubmit()}
        >
          {t("build_for_free")}
        </Button>
        <List>
          <ListItem>
            <ListIcon as={CheckCircleIcon} size={16} color="green.500" />
            {t("no_credit_card_needed")}
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} size={16} color="green.500" />
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
