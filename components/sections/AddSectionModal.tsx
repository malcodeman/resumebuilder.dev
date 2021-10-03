import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Button,
  Grid,
  Text,
} from "@chakra-ui/react";
import * as R from "ramda";

import { Section } from "../../types";

const COMMON_SECTIONS = [
  {
    label: "Employment",
    value: "employmentSection" as const,
    isDisabled: false,
  },
  { label: "Education", value: "educationSection" as const, isDisabled: false },
  { label: "Skills", value: "skillsSection" as const, isDisabled: false },
  { label: "Hobbies", value: "hobbiesSection" as const, isDisabled: false },
  { label: "Languages", value: "languagesSection" as const, isDisabled: false },
  { label: "Projects", value: "projectsSection" as const, isDisabled: true },
];

const CUSTOM_SECTIONS = [
  { label: "Standard", value: "standardSection" as const, isDisabled: false },
  { label: "Tag List", value: "tagListSection" as const, isDisabled: false },
];

type props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { label: string; name: Section }) => void;
};

function AddSectionModal(props: props) {
  const { isOpen, onClose, onSubmit } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add a section</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb="2">Common sections</Text>
          <Grid mb="4" gridTemplateColumns="1fr 1fr 1fr" gap="4">
            {R.map((item) => {
              return (
                <Button
                  key={item.label}
                  variant="outline"
                  size="sm"
                  isDisabled={item.isDisabled}
                  onClick={() =>
                    onSubmit({ label: item.label, name: item.value })
                  }
                >
                  {item.label}
                </Button>
              );
            }, COMMON_SECTIONS)}
          </Grid>
          <Text mb="2">Custom sections</Text>
          <Grid gridTemplateColumns="1fr 1fr 1fr" gap="4">
            {R.map((item) => {
              return (
                <Button
                  key={item.label}
                  variant="outline"
                  size="sm"
                  isDisabled={item.isDisabled}
                  onClick={() =>
                    onSubmit({ label: item.label, name: item.value })
                  }
                >
                  {item.label}
                </Button>
              );
            }, CUSTOM_SECTIONS)}
          </Grid>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
}

export default AddSectionModal;
