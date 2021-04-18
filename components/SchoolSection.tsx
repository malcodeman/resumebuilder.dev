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
  Button,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { Plus } from "react-feather";

function SchoolSection() {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            School
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <Grid templateColumns="1fr 1fr" gap="20px" mb="20px">
          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>Degree</FormLabel>
              <Input size="sm" />
            </FormControl>
          </GridItem>
          <FormControl>
            <FormLabel>Start date</FormLabel>
            <Input size="sm" />
          </FormControl>
          <FormControl>
            <FormLabel>End date</FormLabel>
            <Input size="sm" />
          </FormControl>
          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>City</FormLabel>
              <Input size="sm" />
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea size="sm" />
            </FormControl>
          </GridItem>
        </Grid>
        <Button size="sm" leftIcon={<Plus size={20} />} width="100%">
          Add school
        </Button>
      </AccordionPanel>
    </AccordionItem>
  );
}

export default SchoolSection;
