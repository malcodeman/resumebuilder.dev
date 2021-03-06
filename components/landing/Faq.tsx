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
import { CheckCircle, Circle } from "react-feather";
import { map } from "ramda";

const FAQ = [
  {
    question: "Why is resumebuilder.dev free?",
    answer: (
      <Text>
        Because everyone should have access to a great resume building software.
      </Text>
    ),
  },
  {
    question: "Where is my data stored?",
    answer: (
      <>
        <Text>
          Inside browser <Code>localStorage</Code>.
        </Text>
      </>
    ),
  },
  {
    question: "What analytics tools do you use?",
    answer: (
      <>
        <Text>
          We use{" "}
          <ChakraLink href="https://usefathom.com/" color="blue.400" isExternal>
            Fathom Analytics
          </ChakraLink>
          , which is privacy-focused and GDPR compliant.
        </Text>
      </>
    ),
  },
  {
    question: "Is resumebuilder.dev open source?",
    answer: (
      <Text>
        Yes, you can find the source code on{" "}
        <ChakraLink
          href="https://github.com/malcodeman/resumebuilder.dev"
          color="blue.400"
          isExternal
        >
          GitHub
        </ChakraLink>
        .
      </Text>
    ),
  },
  {
    question: "Which imports are supported?",
    answer: (
      <>
        <Text>Currently we support</Text>
        <List>
          <ListItem>
            <ListIcon as={CheckCircle} color="green.500" />
            <ChakraLink
              href="https://jsonresume.org/"
              color="blue.400"
              isExternal
            >
              JSON Resume
            </ChakraLink>
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircle} color="green.500" />
            GitHub
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircle} color="green.500" />
            JSON
          </ListItem>
        </List>
        <Text>Working on</Text>
        <List>
          <ListItem>
            <ListIcon as={Circle} />
            CSV
          </ListItem>
          <ListItem>
            <ListIcon as={Circle} />
            XML
          </ListItem>
          <ListItem>
            <ListIcon as={Circle} />
            PDF
          </ListItem>
          <ListItem>
            <ListIcon as={Circle} />
            LinkedIn
          </ListItem>
        </List>
      </>
    ),
  },
  {
    question: "Which exports are supported?",
    answer: (
      <>
        <Text>Currently we support</Text>
        <List>
          <ListItem>
            <ListIcon as={CheckCircle} color="green.500" />
            JSON
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircle} color="green.500" />
            PDF
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircle} color="green.500" />
            HTML
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircle} color="green.500" />
            PNG
          </ListItem>
        </List>
        <Text>Working on</Text>
        <List>
          <ListItem>
            <ListIcon as={Circle} />
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
];

function Faq() {
  return (
    <Box as="section" marginBottom="16">
      <Heading mb="4">Frequently asked questions</Heading>
      <Accordion defaultIndex={[0]} allowMultiple>
        {map(
          (item) => (
            <AccordionItem key={item.question}>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    {item.question}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>{item.answer}</AccordionPanel>
            </AccordionItem>
          ),
          FAQ
        )}
      </Accordion>
    </Box>
  );
}

export default Faq;
