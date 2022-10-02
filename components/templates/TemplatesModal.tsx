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
import { useTranslation } from "next-i18next";

import { TEMPLATES_LIST, TEMPLATES_FILTERS } from "../../lib/constants";

import { Template as TemplateType } from "../../types";

import SearchInput from "../misc/SearchInput";
import Template from "./Template";

type props = {
  isOpen: boolean;
  onClose: () => void;
  onChange: (nextTemplate: TemplateType) => void;
};

function TemplatesModal(props: props) {
  const { isOpen, onClose, onChange } = props;
  const { t } = useTranslation();
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
        <ModalHeader>{t("template_gallery")}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SearchInput
            mb="4"
            value={template}
            placeholder={t("search_n_templates", {
              n: length(filteredTemplatesByTags),
            })}
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
                  {t(item.labelTransKey)}
                </Button>
              ),
              TEMPLATES_FILTERS
            )}
          </ButtonGroup>
          {isEmpty(filteredTemplatesBySearch) ? (
            <Text>{t("no_templates_found")}</Text>
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
                  renderDescription={false}
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
