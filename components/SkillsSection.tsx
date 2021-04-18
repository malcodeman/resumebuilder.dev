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

function SkillsSection() {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            Skills
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <Grid templateColumns="1fr 1fr" gap="20px" mb="20px">
          <GridItem colSpan={2}>
            <Input placeholder="Name" />
          </GridItem>
        </Grid>
        <Button size="sm" leftIcon={<Plus size={20} />} width="100%">
          Add skill
        </Button>
      </AccordionPanel>
    </AccordionItem>
  );
}

export default SkillsSection;
