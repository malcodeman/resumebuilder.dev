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
import { useRouter } from "next/router";
import { useKeyboardEvent, useMediaQuery } from "@react-hookz/web";
import { FiPlus, FiUpload } from "react-icons/fi";
import { useTranslation } from "next-i18next";
import { equals } from "ramda";

import { Fields } from "../../types";

import useResumes from "../../hooks/useResumes";

import ImportDataModal from "./ImportDataModal";

function NewButton() {
  const { t } = useTranslation();
  const router = useRouter();
  const { createNew } = useResumes();
  const isMediumDevice = useMediaQuery("(min-width: 30em)");
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

  async function handleOnCreateNew() {
    setIsLoading.on();
    const resume = createNew();
    await router.push(`/resumes/${resume.id}`);
    setIsLoading.off();
  }

  return (
    <Popover trigger="hover">
      <PopoverTrigger>
        {isMediumDevice ? (
          <Button
            mr="-px"
            data-cy="create-resume-button"
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
            icon={<FiPlus />}
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
        data-cy="import-icon-button"
        onClick={onOpen}
        icon={<FiUpload />}
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
