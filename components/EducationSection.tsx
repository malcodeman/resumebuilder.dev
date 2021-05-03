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
  Textarea,
  Button,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { Plus } from "react-feather";
import { FieldArrayWithId } from "react-hook-form";

import SectionFooter from "./SectionFooter";

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
    "education",
    "id"
  >[];
  register: Register;
  onAppend: () => void;
  onDuplicate: (index: number) => void;
  onRemove: (index: number) => void;
};

function EducationSection(props: props) {
  const { fields, register, onAppend, onDuplicate, onRemove } = props;

  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            Education
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        {fields.map((item, index) => {
          return (
            <React.Fragment key={item.id}>
              <Grid templateColumns="1fr 1fr" gap="4" mb="4">
                <GridItem colSpan={2}>
                  <FormControl>
                    <FormLabel>School</FormLabel>
                    <Input
                      size="sm"
                      {...register(`education.${index}.school` as const)}
                    />
                  </FormControl>
                </GridItem>
                <GridItem colSpan={2}>
                  <FormControl>
                    <FormLabel>Degree</FormLabel>
                    <Input
                      size="sm"
                      {...register(`education.${index}.degree` as const)}
                    />
                  </FormControl>
                </GridItem>
                <FormControl>
                  <FormLabel>Start date</FormLabel>
                  <Input
                    size="sm"
                    {...register(`education.${index}.startDate` as const)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>End date</FormLabel>
                  <Input
                    size="sm"
                    {...register(`education.${index}.endDate` as const)}
                  />
                </FormControl>
                <GridItem colSpan={2}>
                  <FormControl>
                    <FormLabel>City</FormLabel>
                    <Input
                      size="sm"
                      {...register(`education.${index}.city` as const)}
                    />
                  </FormControl>
                </GridItem>
                <GridItem colSpan={2}>
                  <FormControl>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                      size="sm"
                      {...register(`education.${index}.description` as const)}
                    />
                  </FormControl>
                </GridItem>
              </Grid>
              <SectionFooter
                onDuplicate={() => onDuplicate(index)}
                onRemove={() => onRemove(index)}
              />
            </React.Fragment>
          );
        })}
        <Button
          size="sm"
          leftIcon={<Plus size={20} />}
          width="100%"
          onClick={onAppend}
          variant="ghost"
        >
          Add education
        </Button>
      </AccordionPanel>
    </AccordionItem>
  );
}

export default EducationSection;
