import {
  Heading,
  Grid,
  Box,
  Text,
  Center,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";

import Poser16 from "../../illustrations/Poser16";

function Builder() {
  const { t } = useTranslation();
  return (
    <Grid as="section" templateColumns={["1fr", "1fr 1fr"]} gap="8" mb="32">
      <Center>
        <Box>
          <Text mb="4" fontSize="xs" fontWeight="700" textTransform="uppercase">
            Resume builder
          </Text>
          <Heading mb="4">{t("powerful_and_easy_to_use")}</Heading>
          <Text mb="4">
            {t("the_fastest_way_to_build_your_software_engineer_resume")}
          </Text>
          <UnorderedList>
            <ListItem mb="2">
              {t(
                "resume_spell_checking_pre_generated_phrases_all_set_templates_and_more"
              )}
            </ListItem>
            <ListItem>
              {t(
                "provide_easy_reading_for_hiring_managers_with_elegant_resume_formatting"
              )}
            </ListItem>
          </UnorderedList>
        </Box>
      </Center>
      <Center>
        <Box maxW="sm" width="full">
          <Poser16 />
        </Box>
      </Center>
    </Grid>
  );
}

export default Builder;
