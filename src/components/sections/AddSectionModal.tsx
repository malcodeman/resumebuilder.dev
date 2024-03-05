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
import { useTranslations } from "next-intl";
import { Section } from "types";

type Sections = {
  label: string;
  labelTransKey: string;
  value: Section;
  isDisabled: boolean;
}[];

const COMMON_SECTIONS: Sections = [
  {
    label: "Employment",
    labelTransKey: "employment",
    value: "employment",
    isDisabled: false,
  },
  {
    label: "Education",
    labelTransKey: "education",
    value: "education",
    isDisabled: false,
  },
  {
    label: "Skills",
    labelTransKey: "skills",
    value: "skills",
    isDisabled: false,
  },
  {
    label: "Hobbies",
    labelTransKey: "hobbies",
    value: "hobbies",
    isDisabled: false,
  },
  {
    label: "Languages",
    labelTransKey: "languages",
    value: "languages",
    isDisabled: false,
  },
  {
    label: "Projects",
    labelTransKey: "projects",
    value: "projects",
    isDisabled: false,
  },
  {
    label: "Internships",
    labelTransKey: "internships",
    value: "internships",
    isDisabled: false,
  },
];

const CUSTOM_SECTIONS: Sections = [
  {
    label: "Standard",
    labelTransKey: "standard",
    value: "standard",
    isDisabled: false,
  },
  {
    label: "Tag list",
    labelTransKey: "tag_list",
    value: "tagList",
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
  const t = useTranslations();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent data-cy="add-section-modal-content">
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
                  data-cy="custom-section-button"
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
