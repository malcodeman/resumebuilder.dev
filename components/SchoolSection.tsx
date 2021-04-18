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
            <Input placeholder="Degree" />
          </GridItem>
          <Input placeholder="Start date" />
          <Input placeholder="End date" />
          <GridItem colSpan={2}>
            <Input placeholder="City" />
          </GridItem>
          <GridItem colSpan={2}>
            <Textarea placeholder="Description" />
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
