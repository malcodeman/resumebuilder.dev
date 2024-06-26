import { Heading, Grid, Box, Text, Center } from "@chakra-ui/react";
import { map } from "ramda";
import { LockIcon, GiftIcon, FastForwardIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const FEATURES = [
  {
    titleTransKey: "privacy_first",
    textTransKey: "own_and_manage_your_own_database",
    icon: <LockIcon size={48} color="#f82b60" />,
  },
  {
    titleTransKey: "free_forever",
    textTransKey: "anyone_can_build_resumes",
    icon: <GiftIcon size={48} color="#ff6f2c" />,
  },
  {
    titleTransKey: "fast",
    textTransKey: "statically_rendered_pages",
    icon: <FastForwardIcon size={48} color="#fcb400" />,
  },
];

function Features() {
  const t = useTranslations();
  return (
    <Box
      as={motion.section}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      mb="32"
    >
      <Center mb="16">
        <Heading>{t("privacy_focused_and_login_free")}</Heading>
      </Center>
      <Grid
        gap="8"
        alignItems="flex-start"
        templateColumns={["1fr", "1fr 1fr 1fr"]}
      >
        {map(
          (item) => (
            <Center key={item.titleTransKey} flexDirection="column">
              {item.icon}
              <Heading mb="4" textAlign="center">
                {t(item.titleTransKey)}
              </Heading>
              <Text>{t(item.textTransKey)}</Text>
            </Center>
          ),
          FEATURES
        )}
      </Grid>
    </Box>
  );
}

export { Features };
