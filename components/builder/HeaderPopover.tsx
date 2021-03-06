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
  useDisclosure,
  useClipboard,
  useToast,
} from "@chakra-ui/react";
import {
  Download,
  Link,
  MoreHorizontal,
  Upload,
  Trash2,
  Layers as IconLayers,
  Database,
} from "react-feather";
import { useRouter } from "next/router";
import { useLocalStorageValue } from "@react-hookz/web";

import ImportDataModal from "../resumes/ImportDataModal";
import ExportResumeModal from "./ExportResumeModal";
import DeleteResumeModal from "../resumes/DeleteResumeModal";
import TemplatesModal from "./TemplatesModal";

import utils from "../../lib/utils";
import useResume from "../../hooks/useResume";

import { Fields, Resume, Template } from "../../types";

const TOOLTIP_MORE_LABEL = "Style, export, and more...";

type props = {
  values: Resume;
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

function ShowTemplates(props: {
  values: Resume;
  onChangeTemplate: (nextTemplate: Template) => void;
}) {
  const { values, onChangeTemplate } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        size="sm"
        mb="2"
        justifyContent="flex-start"
        leftIcon={<IconLayers size={20} />}
        onClick={onOpen}
      >
        Templates
      </Button>
      <TemplatesModal
        isOpen={isOpen}
        values={values}
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
      leftIcon={<Link size={20} />}
      onClick={onCopy}
    >
      {hasCopied ? "Copied" : "Copy link"}
    </Button>
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
        leftIcon={<Database size={20} />}
        onClick={() => onImport(utils.generateFakeResume())}
      >
        Generate Fake Data
      </Button>
    </>
  );
}

function DeleteResume() {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [_resume, _isLoading, _setResume, removeResume] = useResume();
  const toast = useToast();

  function handleOnDelete() {
    removeResume();
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
        mb="2"
        justifyContent="flex-start"
        color="pink"
        leftIcon={<Trash2 size={20} />}
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
        leftIcon={<Upload size={20} />}
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
        leftIcon={<Download size={20} />}
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

function HeaderPopover(props: props) {
  const {
    values,
    onImport,
    onPdfExport,
    onJsonExport,
    onHtmlExport,
    onPngExport,
    onChangeTemplate,
  } = props;
  return (
    <Popover>
      {({ isOpen }) => (
        <>
          <Tooltip
            label={TOOLTIP_MORE_LABEL}
            aria-label={TOOLTIP_MORE_LABEL}
            isDisabled={isOpen}
          >
            <Flex>
              <PopoverTrigger>
                <IconButton
                  size="sm"
                  aria-label={TOOLTIP_MORE_LABEL}
                  icon={<MoreHorizontal size={20} />}
                />
              </PopoverTrigger>
            </Flex>
          </Tooltip>
          <PopoverContent width="222px">
            <PopoverBody>
              <Flex flexDirection="column">
                <FormControl
                  mb="2"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  isDisabled={true}
                >
                  <FormLabel
                    htmlFor="is-small-text"
                    mb="0"
                    width="100%"
                    marginInlineEnd="0"
                    paddingInlineEnd="3"
                  >
                    Small text
                  </FormLabel>
                  <Switch isDisabled={true} id="is-small-text" />
                </FormControl>
                <FullWidth />
                <Divider marginY="2" />
                <PdfViewer />
                <Divider
                  marginY="2"
                  display={{ base: "none", lg: "initial" }}
                />
                <ShowTemplates
                  values={values}
                  onChangeTemplate={onChangeTemplate}
                />
                <CopyLink />
                <GenerateFakeData onImport={onImport} />
                <DeleteResume />
                <Divider marginY="2" />
                <ImportData onImport={onImport} />
                <ExportResume
                  onPdfExport={onPdfExport}
                  onJsonExport={onJsonExport}
                  onHtmlExport={onHtmlExport}
                  onPngExport={onPngExport}
                />
              </Flex>
            </PopoverBody>
          </PopoverContent>
        </>
      )}
    </Popover>
  );
}

export default HeaderPopover;
