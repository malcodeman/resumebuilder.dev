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
import { map } from "ramda";
import { useTranslation } from "next-i18next";

import { Section } from "../../types";

const COMMON_SECTIONS = [
  {
    label: "Employment",
    labelTransKey: "employment",
    value: "employment" as const,
    isDisabled: false,
  },
  {
    label: "education",
    labelTransKey: "Education",
    value: "education" as const,
    isDisabled: false,
  },
  {
    label: "Skills",
    labelTransKey: "skills",
    value: "skills" as const,
    isDisabled: false,
  },
  {
    label: "Hobbies",
    labelTransKey: "hobbies",
    value: "hobbies" as const,
    isDisabled: false,
  },
  {
    label: "Languages",
    labelTransKey: "languages",
    value: "languages" as const,
    isDisabled: false,
  },
  {
    label: "projects",
    labelTransKey: "projects",
    value: "projects" as const,
    isDisabled: false,
  },
  {
    label: "Internships",
    labelTransKey: "internships",
    value: "internships" as const,
    isDisabled: false,
  },
];

const CUSTOM_SECTIONS = [
  {
    label: "Standard",
    labelTransKey: "standard",
    value: "standard" as const,
    isDisabled: false,
  },
  {
    label: "Tag list",
    labelTransKey: "tag_list",
    value: "tagList" as const,
    isDisabled: false,
  },
];

type props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { label: string; name: Section }) => void;
};

function AddSectionModal(props: props) {
  const { isOpen, onClose, onSubmit } = props;
  const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t("add_section")}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb="2">{t("common_sections")}</Text>
          <Grid
            mb="4"
            gridTemplateColumns={["1fr", "1fr 1fr", "1fr 1fr 1fr"]}
            gap="4"
          >
            {map((item) => {
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
                  {t(item.labelTransKey)}
                </Button>
              );
            }, COMMON_SECTIONS)}
          </Grid>
          <Text mb="2">{t("custom_sections")}</Text>
          <Grid gridTemplateColumns={["1fr", "1fr 1fr", "1fr 1fr 1fr"]} gap="4">
            {map((item) => {
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
                  {t(item.labelTransKey)}
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
