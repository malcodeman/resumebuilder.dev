import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Stack,
  Checkbox,
  Text,
} from "@chakra-ui/react";
import { equals, filter, includes, length, map, toLower } from "ramda";
import { useTranslation } from "next-i18next";

import { Phrase } from "../../types";

import SearchInput from "../misc/SearchInput";

type Props = {
  isOpen: boolean;
  value: string;
  phrases: Phrase[];
  onClose: () => void;
  onChange: (phrase: string, isChecked: boolean) => void;
};

function PreWrittenPhrasesModal(props: Props) {
  const { isOpen, value, phrases, onClose, onChange } = props;
  const { t } = useTranslation();
  const [name, setName] = React.useState("");
  const filteredPhrases = filter(
    (item) => includes(toLower(name), toLower(item.phrase)),
    phrases
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="md">{t("pre_written_phrases")}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SearchInput
            mb="2"
            value={name}
            placeholder={t("search_n_phrases", { n: length(phrases) })}
            onChangeValue={(nextValue) => setName(nextValue)}
            onClear={() => setName("")}
          />
          <Stack spacing="2">
            {equals(length(filteredPhrases), 0) ? (
              <Text>{t("no_phrases_found")}</Text>
            ) : null}
            {map((item) => {
              const isChecked = includes(item.phrase, value);
              return (
                <Checkbox
                  key={item.id}
                  isChecked={isChecked}
                  onChange={() => onChange(item.phrase, isChecked)}
                >
                  <Text fontSize="sm">{item.phrase}</Text>
                </Checkbox>
              );
            }, filteredPhrases)}
          </Stack>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
}

export default PreWrittenPhrasesModal;
