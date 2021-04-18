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

function EmploymentSection() {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            Employment
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <Grid templateColumns="1fr 1fr" gap="20px" mb="20px">
          <GridItem colSpan={2}>
            <Input placeholder="Job title" />
          </GridItem>
          <GridItem colSpan={2}>
            <Input placeholder="Company name" />
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
          Add employment
        </Button>
      </AccordionPanel>
    </AccordionItem>
  );
}

export default EmploymentSection;
