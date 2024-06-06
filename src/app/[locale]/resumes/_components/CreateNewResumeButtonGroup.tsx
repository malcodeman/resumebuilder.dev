import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Text,
  Kbd,
  ButtonGroup,
  IconButton,
  useDisclosure,
  useBoolean,
} from "@chakra-ui/react";
import { useKeyboardEvent, useMediaQuery } from "@react-hookz/web";
import { PlusIcon, UploadIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { equals } from "ramda";
import { Fields } from "types";
import useResumes from "hooks/useResumes";
import ImportDataModal from "app/[locale]/resumes/_components/ImportDataModal";
import { useRouter } from "navigation";

function NewButton() {
  const t = useTranslations();
  const router = useRouter();
  const { createNew } = useResumes();
  const isMediumDevice = useMediaQuery("(min-width: 30em)", {
    initializeWithValue: false,
  });
  const [isLoading, setIsLoading] = useBoolean();

  useKeyboardEvent(
    "n",
    (e) => {
      const isBody = equals(e.target["tagName"], "BODY");
      if (isBody) {
        handleOnCreateNew();
      }
    },
    [],
    { event: "keyup" }
  );

  function handleOnCreateNew() {
    setIsLoading.on();
    const resume = createNew();
    router.push(`/resumes/${resume.id}`);
    setIsLoading.off();
  }

  return (
    <Popover trigger="hover">
      <PopoverTrigger>
        {isMediumDevice ? (
          <Button
            mr="-px"
            data-testid="create-resume-button"
            isLoading={isLoading}
            onClick={handleOnCreateNew}
          >
            {t("new")}
          </Button>
        ) : (
          <IconButton
            mr="-px"
            aria-label="Create new"
            onClick={handleOnCreateNew}
            icon={<PlusIcon size={16} />}
          />
        )}
      </PopoverTrigger>
      <PopoverContent width="unset">
        <PopoverBody display="flex" alignItems="center">
          <Text mr="2" fontSize="sm">
            {t("create_resume")}
          </Text>
          <Kbd>N</Kbd>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

function ImportButton() {
  const router = useRouter();
  const { createNew } = useResumes();
  const { isOpen, onOpen, onClose } = useDisclosure();

  function onImport(fields: Fields) {
    const resume = createNew({ fields });
    onClose();
    router.push(`/resumes/${resume.id}`);
  }

  return (
    <>
      <IconButton
        aria-label="Import"
        data-testid="import-icon-button"
        onClick={onOpen}
        icon={<UploadIcon size={16} />}
      />
      <ImportDataModal isOpen={isOpen} onClose={onClose} onImport={onImport} />
    </>
  );
}

function CreateNewResumeButtonGroup() {
  return (
    <ButtonGroup size="sm" isAttached>
      <NewButton />
      <ImportButton />
    </ButtonGroup>
  );
}

export default CreateNewResumeButtonGroup;
