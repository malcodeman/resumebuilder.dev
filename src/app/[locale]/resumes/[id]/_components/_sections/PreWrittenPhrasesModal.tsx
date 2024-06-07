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
import { useTranslations } from "next-intl";
import { Phrase } from "types";
import SearchInput from "components/misc/SearchInput";

type Props = {
  isOpen: boolean;
  value: string;
  phrases: Phrase[];
  onClose: () => void;
  onChange: (_phrase: string, _isChecked: boolean) => void;
};

function PreWrittenPhrasesModal(props: Props) {
  const { isOpen, value = "", phrases, onClose, onChange } = props;
  const t = useTranslations();
  const [name, setName] = React.useState("");
  const filteredPhrases = filter(
    (item) => includes(toLower(name), toLower(item.phrase)),
    phrases
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent data-testid="pre-written-phrases-modal-content">
        <ModalHeader fontSize="md">{t("pre_written_phrases")}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SearchInput
            mb="2"
            data-testid="search-input"
            value={name}
            placeholder={t("search_n_phrases", { n: length(phrases) })}
            onChangeValue={(nextValue) => setName(nextValue)}
            onClear={() => setName("")}
          />
          <Stack spacing="2" data-testid="phrases-stack">
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
                  data-testid="phrase-checkbox"
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
