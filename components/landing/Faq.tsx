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
import * as R from "ramda";

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
    question: "Which imports are support?",
    answer: (
      <>
        <Text>Currently we support</Text>
        <List>
          <ListItem>
            <ListIcon as={CheckCircle} color="green.500" />
            <ChakraLink href="https://jsonresume.org/">JSON Resume</ChakraLink>
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
    question: "Which exports are support?",
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
            <ChakraLink href="https://jsonresume.org/">JSON Resume</ChakraLink>
          </ListItem>
        </List>
      </>
    ),
  },
];

function Faq() {
  return (
    <Box as="section" marginY="16">
      <Heading mb="4">Frequently asked questions</Heading>
      <Accordion defaultIndex={[0]}>
        {R.map(
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
