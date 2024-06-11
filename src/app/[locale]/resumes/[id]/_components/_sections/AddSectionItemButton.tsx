import { Button } from "@chakra-ui/react";
import { PlusIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Section } from "types";

type Props = {
  name: Section;
  onAppend: () => void;
};

function AddSectionItemButton(props: Props) {
  const { name, onAppend } = props;
  const t = useTranslations();

  function getButtonTranslation() {
    switch (name) {
      case "education":
        return t("add_education");
      case "employment":
        return t("add_job");
      case "internships":
        return t("add_internship");
      case "projects":
        return t("add_project");
      default:
        return t("add_item");
    }
  }

  return (
    <Button
      size="sm"
      variant="ghost"
      data-testid="add-section-item-button"
      leftIcon={<PlusIcon size={16} />}
      width="100%"
      justifyContent="flex-start"
      onClick={onAppend}
    >
      {getButtonTranslation()}
    </Button>
  );
}

export { AddSectionItemButton };
