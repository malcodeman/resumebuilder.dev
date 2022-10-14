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
import { Trans, useTranslation } from "next-i18next";

function Faq() {
  const { t } = useTranslation();
  const faq = React.useMemo(
    () => [
      {
        questionTransKey: "faq_question_1",
        answer: t("faq_answer_1"),
      },
      {
        questionTransKey: "faq_question_2",
        answer: (
          <Trans i18nKey="faq_answer_2" values={{ code: "localStorage" }}>
            Inside browser
            <Code>localStorage</Code>
          </Trans>
        ),
      },
      {
        questionTransKey: "faq_question_3",
        answer: (
          <Trans i18nKey="faq_answer_3" values={{ link: "Fathom Analytics" }}>
            We use
            <ChakraLink
              href="https://usefathom.com/"
              color="blue.400"
              isExternal
            >
              Fathom Analytics
            </ChakraLink>
            , which is privacy-focused and GDPR compliant.
          </Trans>
        ),
      },
      {
        questionTransKey: "faq_question_4",
        answer: (
          <Trans i18nKey="faq_answer_4" values={{ link: "GitHub" }}>
            Yes, you can find the source code on
            <ChakraLink
              href="https://github.com/malcodeman/resumebuilder.dev"
              color="blue.400"
              isExternal
            >
              GitHub
            </ChakraLink>
            .
          </Trans>
        ),
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
            </List>
            <Text>{t("working_on")}</Text>
            <List>
              <ListItem>
                <ListIcon as={FiCircle} />
                CSV
              </ListItem>
              <ListItem>
                <ListIcon as={FiCircle} />
                XML
              </ListItem>
              <ListItem>
                <ListIcon as={FiCircle} />
                PDF
              </ListItem>
              <ListItem>
                <ListIcon as={FiCircle} />
                LinkedIn
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
    <Box as="section" mb="32">
      <Heading mb="4">{t("frequently_asked_questions")}</Heading>
      <Accordion defaultIndex={[0]} allowMultiple>
        {map(
          (item) => (
            <AccordionItem key={item.questionTransKey}>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    {t(item.questionTransKey)}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>{item.answer}</AccordionPanel>
            </AccordionItem>
          ),
          faq
        )}
      </Accordion>
    </Box>
  );
}

export default Faq;
