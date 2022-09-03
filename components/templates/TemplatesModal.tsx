import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Grid,
  Button,
  Text,
  ButtonGroup,
} from "@chakra-ui/react";
import { equals, filter, includes, isEmpty, length, map, toLower } from "ramda";

import { TEMPLATES_LIST, TEMPLATES_FILTERS } from "../../lib/constants";

import { Resume, Template as TemplateType } from "../../types";

import SearchInput from "../misc/SearchInput";
import Template from "./Template";

type props = {
  isOpen: boolean;
  values: Resume;
  onClose: () => void;
  onChange: (nextTemplate: TemplateType) => void;
};

function TemplatesModal(props: props) {
  const { isOpen, onClose, onChange } = props;
  const [activeFilter, setActiveFilter] = React.useState(
    TEMPLATES_FILTERS[0].value
  );
  const [template, setTemplate] = React.useState("");
  const filteredTemplatesByTags = filter(
    (item) => includes(activeFilter, item.tags),
    TEMPLATES_LIST
  );
  const filteredTemplatesBySearch = filter(
    (item) => includes(toLower(template), toLower(item.title)),
    filteredTemplatesByTags
  );

  React.useEffect(() => {
    if (!isOpen) {
      setActiveFilter(TEMPLATES_FILTERS[0].value);
    }
  }, [isOpen]);

  function handleOnUseTemplate(template: TemplateType) {
    onChange(template);
    onClose();
  }

  return (
    <Modal size="6xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Template gallery</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SearchInput
            mb="4"
            value={template}
            placeholder={`Search ${length(
              filteredTemplatesByTags
            )} templates...`}
            onChangeValue={(nextValue) => setTemplate(nextValue)}
            onClear={() => setTemplate("")}
          />
          <ButtonGroup size="sm" mb="4" variant="ghost">
            {map(
              (item) => (
                <Button
                  key={item.value}
                  isActive={equals(activeFilter, item.value)}
                  data-cy={`template-filters-${item.value}`}
                  onClick={() => setActiveFilter(item.value)}
                >
                  {item.label}
                </Button>
              ),
              TEMPLATES_FILTERS
            )}
          </ButtonGroup>
          {isEmpty(filteredTemplatesBySearch) ? (
            <Text>No templates found</Text>
          ) : (
            <></>
          )}
          <Grid
            gap="8"
            gridTemplateColumns={["1fr", "repeat(2, 1fr)", "repeat(3, 1fr)"]}
          >
            {map(
              (item) => (
                <Template
                  key={item.template}
                  id={item.template}
                  onUseTemplate={(template) => handleOnUseTemplate(template)}
                />
              ),
              filteredTemplatesBySearch
            )}
          </Grid>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
}
export default TemplatesModal;
