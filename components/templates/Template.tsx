import {
  Button,
  Flex,
  Heading,
  Image,
  Text,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { equals, find } from "ramda";
import { useTranslation } from "next-i18next";

import { TEMPLATES_LIST } from "../../lib/constants";

import { Template as TemplateType } from "../../types";

type props = {
  id: TemplateType;
  renderDescription?: boolean;
  onUseTemplate: (template: TemplateType) => void;
};

function Template(props: props) {
  const { id, renderDescription = true, onUseTemplate } = props;
  const { t } = useTranslation();
  const boxShadow = useColorModeValue(
    "rgba(0, 0, 0, 0.05) 0 0 0 2px",
    "rgba(255, 255, 255, 0.05) 0 0 0 2px"
  );
  const template = find((item) => equals(item.template, id), TEMPLATES_LIST);
  return (
    <Box>
      <Image
        src={template.src}
        alt=""
        mb="2"
        borderRadius="lg"
        boxShadow={boxShadow}
      />
      <Flex mb="2" alignItems="center" justifyContent="space-between">
        <Heading fontSize="md">{template.title}</Heading>
        <Button
          as={motion.div}
          whileHover={{ scale: 1.1 }}
          colorScheme="blue"
          size="sm"
          cursor="pointer"
          data-cy="use-template-button"
          onClick={() => onUseTemplate(template.template)}
        >
          {t("use_template")}
        </Button>
      </Flex>
      {renderDescription ? (
        <Text opacity="0.5">{t(template.descriptionTransKey)}</Text>
      ) : (
        <></>
      )}
    </Box>
  );
}

export default Template;
