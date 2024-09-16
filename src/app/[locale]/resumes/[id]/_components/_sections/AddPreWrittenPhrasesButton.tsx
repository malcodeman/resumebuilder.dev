import { Button, useDisclosure } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { PlusIcon } from "lucide-react";
import { PreWrittenPhrasesModal } from "app/[locale]/resumes/[id]/_components/_sections/PreWrittenPhrasesModal";
import { Phrase } from "types";

type Props = {
  phrases: Phrase[];
  currentPhrases: string;
  onChange: (_phrase: string, _isChecked: boolean) => void;
};

function AddPreWrittenPhrasesButton(props: Props) {
  const { currentPhrases, phrases, onChange } = props;
  const t = useTranslations();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        size="sm"
        variant="ghost"
        onClick={onOpen}
        data-testid="add-pre-written-phrases-button"
        leftIcon={<PlusIcon size={16} />}
      >
        {t("add_pre_written_phrases")}
      </Button>
      <PreWrittenPhrasesModal
        isOpen={isOpen}
        value={currentPhrases}
        phrases={phrases}
        onClose={onClose}
        onChange={onChange}
      />
    </>
  );
}

export { AddPreWrittenPhrasesButton };
