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
import { useTranslations } from "next-intl";
import { CONSTANTS } from "lib/constants";
import { Template as TemplateType } from "types";

type Props = {
  id: TemplateType;
  renderDescription?: boolean;
  isLoading?: boolean;
  onUseTemplate: (_template: TemplateType) => void;
};

function Template(props: Props) {
  const {
    id,
    renderDescription = true,
    isLoading = false,
    onUseTemplate,
  } = props;
  const t = useTranslations();
  const boxShadow = useColorModeValue(
    "rgba(0, 0, 0, 0.05) 0 0 0 2px",
    "rgba(255, 255, 255, 0.05) 0 0 0 2px"
  );
  const template = find(
    (item) => equals(item.template, id),
    CONSTANTS.TEMPLATES_LIST
  );
  return (
    <Box data-testid="template">
      <Image
        src={template.src}
        alt=""
        mb="2"
        borderRadius="md"
        boxShadow={boxShadow}
      />
      <Flex mb="2" alignItems="center" justifyContent="space-between">
        <Heading fontSize="md">{template.title}</Heading>
        <Button
          as={motion.button}
          whileHover={{ scale: 1.1 }}
          colorScheme="blue"
          size="sm"
          cursor="pointer"
          isLoading={isLoading}
          data-testid="use-template-button"
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

export { Template };
