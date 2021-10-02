import {
  Grid,
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

import SectionHeader from "./SectionHeader";

function PersonalDetailsSection() {
  const { register } = useFormContext();

  return (
    <AccordionItem
      borderTopWidth="0"
      cursor="pointer"
      _last={{ borderBottomWidth: 0 }}
    >
      <SectionHeader label="Personal details" />
      <AccordionPanel>
        <Grid templateColumns="1fr 1fr" gap="4">
          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input variant="filled" size="sm" {...register("about.title")} />
            </FormControl>
          </GridItem>
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input
                variant="filled"
                size="sm"
                {...register("about.firstName")}
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <FormControl>
              <FormLabel>Last name</FormLabel>
              <Input
                variant="filled"
                size="sm"
                {...register("about.lastName")}
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <InputGroup size="sm">
                <InputLeftElement>
                  <Mail size={20} />
                </InputLeftElement>
                <Input variant="filled" {...register("about.email")} />
              </InputGroup>
            </FormControl>
          </GridItem>
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <FormControl>
              <FormLabel>Phone</FormLabel>
              <InputGroup size="sm">
                <InputLeftElement>
                  <Phone size={20} />
                </InputLeftElement>
                <Input variant="filled" {...register("about.phone")} />
              </InputGroup>
            </FormControl>
          </GridItem>
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <FormControl>
              <FormLabel>City</FormLabel>
              <Input variant="filled" size="sm" {...register("about.city")} />
            </FormControl>
          </GridItem>
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <FormControl>
              <FormLabel>Country</FormLabel>
              <Input
                variant="filled"
                size="sm"
                {...register("about.country")}
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>Summary</FormLabel>
              <Textarea
                variant="filled"
                size="sm"
                {...register("about.summary")}
              />
            </FormControl>
          </GridItem>
        </Grid>
      </AccordionPanel>
    </AccordionItem>
  );
}

export default PersonalDetailsSection;
