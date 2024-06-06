import { Button, useDisclosure } from "@chakra-ui/react";
import PreWrittenPhrasesModal from "app/[locale]/resumes/[id]/_components/_sections/PreWrittenPhrasesModal";
import { useTranslations } from "next-intl";
import { PlusIcon } from "lucide-react";
import phrases from "lib/phrases";

type Props = {
  value: string;
  onChange: (phrase: string, isChecked: boolean) => void;
};

function AddPreWrittenPhrasesButton(props: Props) {
  const { value, onChange } = props;
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
        value={value}
        phrases={phrases.SUMMARY}
        onClose={onClose}
        onChange={onChange}
      />
    </>
  );
}

export default AddPreWrittenPhrasesButton;
