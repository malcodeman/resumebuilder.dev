import React from "react";
import {
  Heading,
  Button,
  Grid,
  Box,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { map, slice, equals } from "ramda";
import { ArrowRightIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { TEMPLATES_LIST, DEFAULT_VALUES } from "lib/constants";
import { Template as TemplateType } from "types";
import useResumes from "hooks/useResumes";
import Template from "app/[locale]/(marketing)/_components/Template";
import { Link, useRouter } from "navigation";

const ARROW_RIGHT_VARIANTS = {
  mouseenter: { x: 5 },
  mouseleave: { x: 0 },
};

function Templates() {
  const t = useTranslations();
  const templateCount = useBreakpointValue({
    base: 1,
    sm: 4,
    md: 3,
  });
  const router = useRouter();
  const { createNew } = useResumes();
  const [isLoading, setIsLoading] = React.useState<TemplateType>(null);

  function handleOnSubmit(template: TemplateType) {
    setIsLoading(template);
    const design = {
      ...DEFAULT_VALUES.design,
      template,
    };
    const resume = createNew({ design });
    router.push(`/resumes/${resume.id}`);
    setIsLoading(null);
  }

  return (
    <Box
      as={motion.section}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      mb="32"
    >
      <Box width={["100%", "100%", "50%"]}>
        <Heading mb="4">{t("start_with_template")}</Heading>
        <Text mb="4">
          {t(
            "choose_from_any_of_our_free_templates_that_best_fit_your_personal_and_professional_needs"
          )}
        </Text>
        <Link href="/templates" passHref>
          <Button
            as={motion.button}
            whileHover="mouseenter"
            variant="outline"
            mb="8"
            data-testid="see-all-templates-button"
            rightIcon={
              <motion.div variants={ARROW_RIGHT_VARIANTS}>
                <ArrowRightIcon size={16} />
              </motion.div>
            }
          >
            {t("see_all_templates")}
          </Button>
        </Link>
      </Box>
      <Grid
        templateColumns={[
          "minmax(0, 1fr)",
          "repeat(2, minmax(0, 1fr))",
          "repeat(3, minmax(0, 1fr))",
        ]}
        gap="8"
      >
        {slice(
          0,
          templateCount,
          map(
            (item) => (
              <Template
                key={item.template}
                id={item.template}
                isLoading={equals(isLoading, item.template)}
                onUseTemplate={(template) => handleOnSubmit(template)}
              />
            ),
            TEMPLATES_LIST
          )
        )}
      </Grid>
    </Box>
  );
}

export default Templates;
