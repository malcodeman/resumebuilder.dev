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
import { useFormContext } from "react-hook-form";

function PersonalDetailsSection() {
  const { register } = useFormContext();

  return (
    <AccordionItem borderTopWidth="0" _last={{ borderBottomWidth: 0 }}>
      <h2>
        <AccordionButton>
          <AccordionIcon mr="2" />
          <Box flex="1" textAlign="left">
            Personal details
          </Box>
        </AccordionButton>
      </h2>
      <AccordionPanel>
        <Grid templateColumns="1fr 1fr" gap="4">
          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input size="sm" {...register("about.title")} />
            </FormControl>
          </GridItem>
          <FormControl>
            <FormLabel>First name</FormLabel>
            <Input size="sm" {...register("about.firstName")} />
          </FormControl>
          <FormControl>
            <FormLabel>Last name</FormLabel>
            <Input size="sm" {...register("about.lastName")} />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <InputGroup size="sm">
              <InputLeftElement pointerEvents="none">
                <Mail size={20} />
              </InputLeftElement>
              <Input {...register("about.email")} />
            </InputGroup>
          </FormControl>
          <FormControl>
            <FormLabel>Phone</FormLabel>
            <InputGroup size="sm">
              <InputLeftElement pointerEvents="none">
                <Phone size={20} />
              </InputLeftElement>
              <Input {...register("about.phone")} />
            </InputGroup>
          </FormControl>
          <FormControl>
            <FormLabel>City</FormLabel>
            <Input size="sm" {...register("about.city")} />
          </FormControl>
          <FormControl>
            <FormLabel>Country</FormLabel>
            <Input size="sm" {...register("about.country")} />
          </FormControl>
          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>Summary</FormLabel>
              <Textarea size="sm" {...register("about.summary")} />
            </FormControl>
          </GridItem>
        </Grid>
      </AccordionPanel>
    </AccordionItem>
  );
}

export default PersonalDetailsSection;
