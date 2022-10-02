import {
  Flex,
  Grid,
  Heading,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { FiLayers, FiPlus, FiUpload } from "react-icons/fi";
import { map } from "ramda";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";

import ImportDataModal from "./ImportDataModal";

import { Fields } from "../../types";

import useResumes from "../../hooks/useResumes";

function EmptyResumes() {
  const { t } = useTranslation();
  const boxShadow = useColorModeValue(
    "rgba(0, 0, 0, 0.05) 0 0 0 2px",
    "rgba(255, 255, 255, 0.05) 0 0 0 2px"
  );
  const green = useColorModeValue("#00876b", "#4dab9a");
  const blue = useColorModeValue("#0078df", "#529cca");
  const purple = useColorModeValue("#6724de", "#9a6dd7");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { createNew } = useResumes();
  const ITEMS = [
    {
      color: green,
      icon: <FiPlus size={48} color={green} />,
      headingTransKey: "start_from_scratch",
      textTransKey: "start_from_scratch_description",
      dataCy: "start-from-scratch",
      onClick: () => handleOnNew(),
    },
    {
      color: blue,
      icon: <FiUpload size={48} color={blue} />,
      headingTransKey: "quickly_upload",
      textTransKey: "quickly_upload_description",
      dataCy: "quickly-upload",
      onClick: () => onOpen(),
    },
    {
      color: purple,
      icon: <FiLayers size={48} color={purple} />,
      headingTransKey: "start_with_templates",
      textTransKey: "start_with_templates_description",
      dataCy: "start-with-templates",
      onClick: () => router.push("/templates"),
    },
  ];

  function handleOnNew() {
    const resume = createNew();
    router.push(`/resumes/${resume.id}`);
  }

  function handleOnImport(fields: Fields) {
    const resume = createNew({ fields });
    onClose();
    router.push(`/resumes/${resume.id}`);
  }

  return (
    <>
      <Grid
        gap="8"
        templateColumns={["1fr", "repeat(2, 1fr)", "repeat(3, 1fr)"]}
      >
        {map(
          (item) => (
            <Flex
              as={motion.div}
              whileHover={{ scale: 1.1 }}
              key={item.headingTransKey}
              paddingX="4"
              paddingY="8"
              cursor="pointer"
              borderRadius="lg"
              textAlign="center"
              alignItems="center"
              flexDirection="column"
              boxShadow={boxShadow}
              data-cy={item.dataCy}
              onClick={item.onClick}
            >
              <Flex
                mb="8"
                padding="4"
                width="72px"
                height="72px"
                borderRadius="lg"
                alignItems="center"
                justifyContent="center"
                backgroundColor={`${item.color}40`}
              >
                {item.icon}
              </Flex>
              <Heading mb="2" fontSize="md">
                {t(item.headingTransKey)}
              </Heading>
              <Text>{t(item.textTransKey)}</Text>
            </Flex>
          ),
          ITEMS
        )}
      </Grid>
      <ImportDataModal
        isOpen={isOpen}
        onClose={onClose}
        onImport={handleOnImport}
      />
    </>
  );
}

export default EmptyResumes;
