import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  IconButton,
  Flex,
  Tooltip,
  FormControl,
  FormLabel,
  Switch,
  Button,
  Divider,
  Text,
  Box,
  useDisclosure,
  useClipboard,
  useToast,
  useColorMode,
} from "@chakra-ui/react";
import {
  FiDownload,
  FiLink,
  FiMoreHorizontal,
  FiUpload,
  FiTrash2,
  FiLayers,
  FiDatabase,
  FiEdit,
} from "react-icons/fi";
import { useRouter } from "next/router";
import { useLocalStorageValue } from "@react-hookz/web";
import { equals } from "ramda";
import { formatDistanceToNow } from "date-fns";
import { useFormContext, useWatch } from "react-hook-form";

import ImportDataModal from "../resumes/ImportDataModal";
import ExportResumeModal from "./ExportResumeModal";
import DeleteResumeModal from "../resumes/DeleteResumeModal";
import TemplatesModal from "../templates/TemplatesModal";
import ChangeSlugModal from "./ChangeSlugModal";

import utils from "../../lib/utils";
import useResume from "../../hooks/useResume";

import { Fields, Resume, Template } from "../../types";

const TOOLTIP_MORE_LABEL = "Style, export, and more...";

type props = {
  devTools: boolean;
  onImport: (fields: Fields) => void;
  onChangeTemplate: (nextTemplate: Template) => void;
  onPdfExport: () => void;
  onJsonExport: () => void;
  onHtmlExport: () => void;
  onPngExport: () => void;
};

function FullWidth() {
  const [isFullWidth, setIsFullWidth] = useLocalStorageValue(
    "isFullWidth",
    false,
    { initializeWithStorageValue: false }
  );
  return (
    <FormControl
      mb="2"
      display={{ base: "none", lg: "flex" }}
      alignItems="center"
      justifyContent="space-between"
    >
      <FormLabel
        htmlFor="is-full-width"
        mb="0"
        width="100%"
        cursor="pointer"
        marginInlineEnd="0"
        paddingInlineEnd="3"
      >
        Full width
      </FormLabel>
      <Switch
        isChecked={isFullWidth}
        onChange={() => setIsFullWidth(!isFullWidth)}
        id="is-full-width"
      />
    </FormControl>
  );
}

function DarkModeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <FormControl
      mb="2"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <FormLabel
        htmlFor="is-dark-mode"
        mb="0"
        width="100%"
        cursor="pointer"
        marginInlineEnd="0"
        paddingInlineEnd="3"
      >
        Dark mode
      </FormLabel>
      <Switch
        isChecked={equals(colorMode, "dark")}
        onChange={toggleColorMode}
        id="is-dark-mode"
      />
    </FormControl>
  );
}

function PdfViewer() {
  const [isPdfViewer, setIsPdfViewer] = useLocalStorageValue(
    "isPdfViewer",
    false,
    {
      initializeWithStorageValue: false,
    }
  );
  return (
    <FormControl
      mb="2"
      display={{ base: "none", lg: "flex" }}
      alignItems="center"
      justifyContent="space-between"
    >
      <FormLabel
        htmlFor="is-pdf-viewer"
        mb="0"
        width="100%"
        cursor="pointer"
        marginInlineEnd="0"
        paddingInlineEnd="3"
      >
        PDF Viwer
      </FormLabel>
      <Switch
        isChecked={isPdfViewer}
        onChange={() => setIsPdfViewer(!isPdfViewer)}
        id="is-pdf-viewer"
      />
    </FormControl>
  );
}

function DevToolsToggle() {
  const [devTools, setDevTools] = useLocalStorageValue("devTools", false, {
    initializeWithStorageValue: false,
  });
  return (
    <FormControl
      mb="2"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <FormLabel
        htmlFor="dev-tools"
        mb="0"
        width="100%"
        cursor="pointer"
        marginInlineEnd="0"
        paddingInlineEnd="3"
      >
        Dev Tools
      </FormLabel>
      <Switch
        isChecked={devTools}
        onChange={() => setDevTools(!devTools)}
        id="dev-tools"
      />
    </FormControl>
  );
}

function ShowTemplates(props: {
  onChangeTemplate: (nextTemplate: Template) => void;
}) {
  const { onChangeTemplate } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        size="sm"
        mb="2"
        justifyContent="flex-start"
        leftIcon={<FiLayers />}
        onClick={onOpen}
      >
        Templates
      </Button>
      <TemplatesModal
        isOpen={isOpen}
        onClose={onClose}
        onChange={onChangeTemplate}
      />
    </>
  );
}

function CopyLink() {
  const { hasCopied, onCopy } = useClipboard(
    utils.isBrowser ? window.location.href : ""
  );
  return (
    <Button
      size="sm"
      mb="2"
      justifyContent="flex-start"
      leftIcon={<FiLink />}
      onClick={onCopy}
    >
      {hasCopied ? "Copied" : "Copy link"}
    </Button>
  );
}

function ChangeSlug() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        size="sm"
        mb="2"
        justifyContent="flex-start"
        data-cy="change-slug-button"
        leftIcon={<FiEdit />}
        onClick={onOpen}
      >
        Change slug
      </Button>
      <ChangeSlugModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}

function GenerateFakeData(props: { onImport: (fields: Fields) => void }) {
  const { onImport } = props;
  return (
    <>
      <Button
        size="sm"
        mb="2"
        justifyContent="flex-start"
        leftIcon={<FiDatabase />}
        onClick={() => onImport(utils.generateFakeResume())}
      >
        Generate fake data
      </Button>
    </>
  );
}

function DeleteResume() {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { remove } = useResume();
  const toast = useToast();

  function handleOnDelete() {
    remove();
    router.push("/resumes");
    toast({
      description: "Resume deleted.",
      isClosable: true,
    });
  }

  return (
    <>
      <Button
        size="sm"
        justifyContent="flex-start"
        leftIcon={<FiTrash2 />}
        onClick={onOpen}
      >
        Delete
      </Button>
      <DeleteResumeModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleOnDelete}
      />
    </>
  );
}

function ImportData(props: { onImport: (fields: Fields) => void }) {
  const { onImport } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        size="sm"
        mb="2"
        justifyContent="flex-start"
        leftIcon={<FiUpload />}
        onClick={onOpen}
      >
        Import
      </Button>
      <ImportDataModal isOpen={isOpen} onClose={onClose} onImport={onImport} />
    </>
  );
}

function ExportResume(props: {
  onPdfExport: () => void;
  onJsonExport: () => void;
  onHtmlExport: () => void;
  onPngExport: () => void;
}) {
  const { onPdfExport, onJsonExport, onHtmlExport, onPngExport } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        size="sm"
        justifyContent="flex-start"
        leftIcon={<FiDownload />}
        onClick={onOpen}
      >
        Export
      </Button>
      <ExportResumeModal
        isOpen={isOpen}
        onClose={onClose}
        onPdfExport={onPdfExport}
        onJsonExport={onJsonExport}
        onHtmlExport={onHtmlExport}
        onPngExport={onPngExport}
      />
    </>
  );
}

function Info() {
  const { control } = useFormContext<Resume>();
  const watch = useWatch({
    control,
    name: ["updatedAt", "about.summary", "section"],
  });
  const updatedAt = watch[0];
  const wordCount = utils.countWords(watch[1], watch[2]);
  return (
    <Box>
      <Text fontSize="xs" opacity="0.5" mb="2">
        Word count: {wordCount}
      </Text>
      <Text fontSize="xs" opacity="0.5">
        Edited{" "}
        {formatDistanceToNow(updatedAt, {
          addSuffix: true,
        })}
      </Text>
    </Box>
  );
}

function HeaderPopover(props: props) {
  const {
    devTools,
    onImport,
    onPdfExport,
    onJsonExport,
    onHtmlExport,
    onPngExport,
    onChangeTemplate,
  } = props;
  return (
    <Popover placement="bottom-start">
      {({ isOpen }) => (
        <>
          <Tooltip
            label={TOOLTIP_MORE_LABEL}
            aria-label={TOOLTIP_MORE_LABEL}
            isDisabled={isOpen}
            placement="bottom-start"
          >
            <Flex>
              <PopoverTrigger>
                <IconButton
                  size="sm"
                  data-cy="more-button"
                  aria-label={TOOLTIP_MORE_LABEL}
                  icon={<FiMoreHorizontal />}
                />
              </PopoverTrigger>
            </Flex>
          </Tooltip>
          <PopoverContent width="222px">
            <PopoverBody>
              <Flex flexDirection="column">
                <FullWidth />
                <DarkModeToggle />
                <PdfViewer />
                <DevToolsToggle />
                <Divider
                  marginY="2"
                  display={{ base: "none", lg: "initial" }}
                />
                <ShowTemplates onChangeTemplate={onChangeTemplate} />
                <CopyLink />
                <ChangeSlug />
                {devTools ? <GenerateFakeData onImport={onImport} /> : null}
                <DeleteResume />
                <Divider marginY="2" />
                <ImportData onImport={onImport} />
                <ExportResume
                  onPdfExport={onPdfExport}
                  onJsonExport={onJsonExport}
                  onHtmlExport={onHtmlExport}
                  onPngExport={onPngExport}
                />
                <Divider marginY="2" />
                <Info />
              </Flex>
            </PopoverBody>
          </PopoverContent>
        </>
      )}
    </Popover>
  );
}

export default HeaderPopover;
