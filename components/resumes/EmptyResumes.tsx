import {
  Flex,
  Grid,
  Heading,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { Layers, Plus, Upload } from "react-feather";
import { map } from "ramda";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import { useLocalStorageValue } from "@react-hookz/web";
import { motion } from "framer-motion";

import ImportDataModal from "./ImportDataModal";

import { DEFAULT_VALUES } from "../../lib/constants";

import { Fields, Resume, Template } from "../../types";

function EmptyResumes() {
  const boxShadow = useColorModeValue(
    "rgba(0, 0, 0, 0.05) 0 0 0 2px",
    "rgba(255, 255, 255, 0.05) 0 0 0 2px"
  );
  const green = useColorModeValue("#00876b", "#4dab9a");
  const blue = useColorModeValue("#0078df", "#529cca");
  const purple = useColorModeValue("#6724de", "#9a6dd7");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const [resumes, setResumes] = useLocalStorageValue<Resume[]>("resumes", [], {
    initializeWithStorageValue: false,
  });
  const ITEMS = [
    {
      color: green,
      icon: <Plus size={36} color={green} />,
      heading: "Start from scratch",
      text: "Create a new blank resume with custom sections and templates.",
      dataCy: "start-from-scratch",
      onClick: () => handleOnNew(),
    },
    {
      color: blue,
      icon: <Upload size={36} color={blue} />,
      heading: "Quickly upload",
      text: "Easily migrate your existing data in just a few seconds.",
      dataCy: "quickly-upload",
      onClick: () => onOpen(),
    },
    {
      color: purple,
      icon: <Layers size={36} color={purple} />,
      heading: "Start with templates",
      text: "Select a template to get started and customize as you go.",
      dataCy: "start-with-templates",
      onClick: () => router.push("/templates"),
    },
  ];

  function handleOnNew() {
    const resume = {
      ...DEFAULT_VALUES,
      id: nanoid(),
      title: "Untitled resume",
    };
    setResumes([...resumes, resume]);
    router.push(`/resumes/${resume.id}`);
  }

  function handleOnImport(fields: Fields) {
    const resume = {
      ...fields,
      id: nanoid(),
      title: "Untitled",
      icon: "",
      createdAt: Date.now(),
      updatedAt: Date.now(),
      design: {
        template: Template.berlin,
        spacing: 1,
      },
    };
    setResumes([...resumes, resume]);
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
              key={item.heading}
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
                {item.heading}
              </Heading>
              <Text>{item.text}</Text>
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
