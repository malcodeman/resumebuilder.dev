import {
  Box,
  Grid,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Input,
  GridItem,
  Textarea,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { Mail, Phone } from "react-feather";

function PersonalDetailsSection() {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            Personal details
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <Grid templateColumns="1fr 1fr" gap="20px">
          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input size="sm" />
            </FormControl>
          </GridItem>
          <FormControl>
            <FormLabel>First name</FormLabel>
            <Input size="sm" />
          </FormControl>
          <FormControl>
            <FormLabel>Last name</FormLabel>
            <Input size="sm" />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <InputGroup size="sm">
              <InputLeftElement
                pointerEvents="none"
                children={<Mail size={20} />}
              />
              <Input />
            </InputGroup>
          </FormControl>
          <FormControl>
            <FormLabel>Phone</FormLabel>
            <InputGroup size="sm">
              <InputLeftElement
                pointerEvents="none"
                children={<Phone size={20} />}
              />
              <Input />
            </InputGroup>
          </FormControl>
          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>Summary</FormLabel>
              <Textarea size="sm" />
            </FormControl>
          </GridItem>
        </Grid>
      </AccordionPanel>
    </AccordionItem>
  );
}

export default PersonalDetailsSection;
