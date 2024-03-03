import React from "react";
import {
  Heading,
  Box,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Code,
  List,
  ListItem,
  ListIcon,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { FiCheckCircle, FiCircle } from "react-icons/fi";
import { map } from "ramda";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

import { LINKS } from "../../lib/constants";

function Faq() {
  const t = useTranslations();
  const faq = React.useMemo(
    () => [
      {
        questionTransKey: "faq_question_1",
        answer: t("faq_answer_1"),
      },
      {
        questionTransKey: "faq_question_2",
        answer: t.rich("faq_answer_2", {
          code: (chunks) => <Code>{chunks}</Code>,
        }),
      },
      {
        questionTransKey: "faq_question_3",
        answer: t.rich("faq_answer_3", {
          link: (chunks) => (
            <ChakraLink
              href="https://vercel.com/analytics"
              color="blue.400"
              isExternal
            >
              {chunks}
            </ChakraLink>
          ),
        }),
      },
      {
        questionTransKey: "faq_question_4",
        answer: t.rich("faq_answer_4", {
          link: (chunks) => (
            <ChakraLink href={LINKS.GITHUB_REPO} color="blue.400" isExternal>
              {chunks}
            </ChakraLink>
          ),
        }),
      },
      {
        questionTransKey: "faq_question_5",
        answer: (
          <>
            <Text>{t("currently_we_support")}</Text>
            <List mb="2">
              <ListItem>
                <ListIcon as={FiCheckCircle} color="green.500" />
                <ChakraLink
                  href="https://jsonresume.org/"
                  color="blue.400"
                  isExternal
                >
                  JSON Resume
                </ChakraLink>
              </ListItem>
              <ListItem>
                <ListIcon as={FiCheckCircle} color="green.500" />
                GitHub
              </ListItem>
              <ListItem>
                <ListIcon as={FiCheckCircle} color="green.500" />
                JSON
              </ListItem>
              <ListItem>
                <ListIcon as={FiCheckCircle} color="green.500" />
                LinkedIn
              </ListItem>
            </List>
            <Text>{t("working_on")}</Text>
            <List>
              <ListItem>
                <ListIcon as={FiCircle} />
                PDF
              </ListItem>
            </List>
          </>
        ),
      },
      {
        questionTransKey: "faq_question_6",
        answer: (
          <>
            <Text>{t("currently_we_support")}</Text>
            <List mb="2">
              <ListItem>
                <ListIcon as={FiCheckCircle} color="green.500" />
                JSON
              </ListItem>
              <ListItem>
                <ListIcon as={FiCheckCircle} color="green.500" />
                PDF
              </ListItem>
              <ListItem>
                <ListIcon as={FiCheckCircle} color="green.500" />
                HTML
              </ListItem>
              <ListItem>
                <ListIcon as={FiCheckCircle} color="green.500" />
                PNG
              </ListItem>
            </List>
            <Text>{t("working_on")}</Text>
            <List>
              <ListItem>
                <ListIcon as={FiCircle} />
                <ChakraLink
                  href="https://jsonresume.org/"
                  color="blue.400"
                  isExternal
                >
                  JSON Resume
                </ChakraLink>
              </ListItem>
            </List>
          </>
        ),
      },
    ],
    [t]
  );

  return (
    <Box
      as={motion.section}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      mb="32"
    >
      <Heading mb="4">{t("frequently_asked_questions")}</Heading>
      <Accordion defaultIndex={[0]} allowMultiple>
        {map(
          (item) => (
            <AccordionItem key={item.questionTransKey}>
              <h2>
                <AccordionButton data-cy="accordion-button">
                  <Box flex="1" textAlign="left">
                    {t(item.questionTransKey)}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} data-cy="accordion-panel">
                {item.answer}
              </AccordionPanel>
            </AccordionItem>
          ),
          faq
        )}
      </Accordion>
    </Box>
  );
}

export default Faq;
