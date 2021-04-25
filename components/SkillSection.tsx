import React from "react";
import {
  Box,
  Grid,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Input,
  GridItem,
  Button,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { Plus } from "react-feather";
import { FieldArrayWithId } from "react-hook-form";

import { Register } from "../types";

type props = {
  fields: FieldArrayWithId<
    {
      title: string;
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      summary: string;
      employment: {
        jobTitle: string;
        companyName: string;
        startDate: string;
        endDate: string;
        city: string;
        description: string;
      }[];
      education: {
        school: string;
        degree: string;
        startDate: string;
        endDate: string;
        city: string;
        description: string;
      }[];
      skill: {
        name: string;
      }[];
    },
    "skill",
    "id"
  >[];
  register: Register;
  onAppend: () => void;
};

function SkillSection(props: props) {
  const { fields, register, onAppend } = props;

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
          {fields.map((item, index) => {
            return (
              <React.Fragment key={item.id}>
                <GridItem colSpan={2}>
                  <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input
                      size="sm"
                      {...register(`skill.${index}.name` as const)}
                    />
                  </FormControl>
                </GridItem>
              </React.Fragment>
            );
          })}
        </Grid>
        <Button
          size="sm"
          leftIcon={<Plus size={20} />}
          width="100%"
          onClick={onAppend}
        >
          Add skill
        </Button>
      </AccordionPanel>
    </AccordionItem>
  );
}

export default SkillSection;
