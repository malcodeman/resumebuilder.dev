import { Heading, Grid, Box, Text, Center } from "@chakra-ui/react";
import { map } from "ramda";
import { FiLock, FiGift, FiFastForward } from "react-icons/fi";
import { useTranslation } from "next-i18next";

const FEATURES = [
  {
    titleTransKey: "privacy_first",
    textTransKey: "own_and_manage_your_own_database",
    icon: <FiLock size={48} color="#f82b60" />,
  },
  {
    titleTransKey: "free_forever",
    textTransKey: "anyone_can_build_resumes",
    icon: <FiGift size={48} color="#ff6f2c" />,
  },
  {
    titleTransKey: "fast",
    textTransKey: "statically_rendered_pages",
    icon: <FiFastForward size={48} color="#fcb400" />,
  },
];

function Features() {
  const { t } = useTranslation();
  return (
    <Box as="section">
      <Center mb="16">
        <Heading>{t("privacy_focused_and_login_free")}</Heading>
      </Center>
      <Grid templateColumns={["1fr", "1fr 1fr 1fr"]} gap="8">
        {map(
          (item) => (
            <Center key={item.titleTransKey} flexDirection="column">
              {item.icon}
              <Heading mb="4">{t(item.titleTransKey)}</Heading>
              <Text>{t(item.textTransKey)}</Text>
            </Center>
          ),
          FEATURES
        )}
      </Grid>
    </Box>
  );
}

export default Features;
