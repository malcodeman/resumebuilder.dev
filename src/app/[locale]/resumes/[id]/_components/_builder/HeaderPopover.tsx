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
  DownloadIcon,
  LinkIcon,
  MoreHorizontalIcon,
  UploadIcon,
  Trash2Icon,
  DatabaseIcon,
  EditIcon,
  CopyIcon,
  CheckIcon,
} from "lucide-react";
import { equals, isNil, or } from "ramda";
import { formatDistanceToNow } from "date-fns";
import { useFormContext, useWatch } from "react-hook-form";
import { useLocale, useTranslations } from "next-intl";
import ImportDataModal from "app/[locale]/resumes/_components/ImportDataModal";
import ExportResumeModal from "app/[locale]/resumes/[id]/_components/_builder/ExportResumeModal";
import DeleteResumeModal from "app/[locale]/resumes/_components/DeleteResumeModal";
import ChangeSlugModal from "app/[locale]/resumes/[id]/_components/_builder/ChangeSlugModal";
import LanguageSelect from "components/misc/LanguageSelect";
import utils from "lib/utils";
import useResume from "hooks/useResume";
import useDateFnsLocale from "hooks/useDateFnsLocale";
import useLocalStorage from "hooks/useLocalStorage";
import { useRouter } from "navigation";
import { Fields, Resume } from "types";

const TOOLTIP_MORE_LABEL = "Style, export, and more...";

type Props = {
  devTools: boolean;
  onImport: (_fields: Fields) => void;
  onPdfExport: () => void;
  onJsonExport: () => void;
  onHtmlExport: () => void;
  onPngExport: () => void;
};

function FullWidth() {
  const t = useTranslations();
  const isFullWidth = useLocalStorage("is-full-width");
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
        cursor="pointer"
        marginInlineEnd="0"
        paddingInlineEnd="3"
        width="full"
      >
        {t("full_width")}
      </FormLabel>
      <Switch
        isChecked={isFullWidth.value}
        onChange={() => isFullWidth.set(!isFullWidth)}
        id="is-full-width"
        data-testid="full-width-switch"
      />
    </FormControl>
  );
}

function DarkMode() {
  const t = useTranslations();
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
        cursor="pointer"
        marginInlineEnd="0"
        paddingInlineEnd="3"
        width="full"
      >
        {t("dark_mode")}
      </FormLabel>
      <Switch
        isChecked={equals(colorMode, "dark")}
        onChange={toggleColorMode}
        id="is-dark-mode"
        data-testid="dark-mode-switch"
      />
    </FormControl>
  );
}

function PdfViewer() {
  const t = useTranslations();
  const isPdfViewer = useLocalStorage("is-pdf-viewer");
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
        cursor="pointer"
        marginInlineEnd="0"
        paddingInlineEnd="3"
        width="full"
      >
        {t("pdf_viewer")}
      </FormLabel>
      <Switch
        isChecked={isPdfViewer.value}
        onChange={() => isPdfViewer.set(!isPdfViewer)}
        id="is-pdf-viewer"
        data-testid="pdf-viewer-switch"
      />
    </FormControl>
  );
}

function HideSensitiveData() {
  const t = useTranslations();
  const hideSensitiveData = useLocalStorage("hide-sensitive-data");
  return (
    <FormControl
      mb="2"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <FormLabel
        htmlFor="hide-sensitive-data"
        mb="0"
        cursor="pointer"
        marginInlineEnd="0"
        paddingInlineEnd="3"
        width="full"
      >
        {t("hide_sensitive_data")}
      </FormLabel>
      <Switch
        isChecked={hideSensitiveData.value}
        onChange={() => hideSensitiveData.set(!hideSensitiveData)}
        id="hide-sensitive-data"
        data-testid="hide-sensitive-data-switch"
      />
    </FormControl>
  );
}

function DevTools() {
  const t = useTranslations();
  const devTools = useLocalStorage("dev-tools");
  return (
    <FormControl
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <FormLabel
        htmlFor="dev-tools"
        mb="0"
        cursor="pointer"
        marginInlineEnd="0"
        paddingInlineEnd="3"
        width="full"
      >
        {t("dev_tools")}
      </FormLabel>
      <Switch
        isChecked={devTools.value}
        onChange={() => devTools.set(!devTools)}
        id="dev-tools"
        data-testid="dev-tools-switch"
      />
    </FormControl>
  );
}

function Duplicate() {
  const t = useTranslations();
  const toast = useToast();
  const { duplicate } = useResume();

  function handleOnDuplicate() {
    duplicate();
    toast({
      description: t("resume_duplicated"),
      isClosable: true,
    });
  }

  return (
    <Button
      size="sm"
      mb="2"
      justifyContent="flex-start"
      data-testid="duplicate-button"
      leftIcon={<CopyIcon size={16} />}
      onClick={handleOnDuplicate}
    >
      {t("duplicate")}
    </Button>
  );
}

function CopyLink() {
  const t = useTranslations();
  const { hasCopied, onCopy } = useClipboard(
    utils.isBrowser ? window.location.href : ""
  );
  return (
    <Button
      size="sm"
      mb="2"
      justifyContent="flex-start"
      data-testid="copy-link-button"
      leftIcon={hasCopied ? <CheckIcon size={16} /> : <LinkIcon size={16} />}
      onClick={onCopy}
    >
      {hasCopied ? t("copied") : t("copy_link")}
    </Button>
  );
}

function ChangeSlug() {
  const t = useTranslations();
  const language = useLocale();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getValues } = useFormContext<Resume>();
  const { setResume } = useResume();

  function handleOnChangeSlug(nextSlug: string) {
    const nextResume = {
      ...getValues(),
      id: nextSlug,
    };
    setResume(nextResume);
    onClose();
    toast({
      description: t("slug_changed"),
      isClosable: true,
    });
    window.location.replace(`/${language}/resumes/${nextResume.id}`);
  }

  return (
    <>
      <Button
        size="sm"
        mb="2"
        justifyContent="flex-start"
        data-testid="change-slug-button"
        leftIcon={<EditIcon size={16} />}
        onClick={onOpen}
      >
        {t("change_slug")}
      </Button>
      <ChangeSlugModal
        isOpen={isOpen}
        onClose={onClose}
        onChangeSlug={handleOnChangeSlug}
      />
    </>
  );
}

function GenerateFakeData(props: { onImport: (_fields: Fields) => void }) {
  const { onImport } = props;
  const t = useTranslations();
  return (
    <>
      <Button
        size="sm"
        mb="2"
        justifyContent="flex-start"
        data-testid="generate-fake-data-button"
        leftIcon={<DatabaseIcon size={16} />}
        onClick={() => onImport(utils.generateFakeResume())}
      >
        <Text noOfLines={1}>{t("generate_fake_data")}</Text>
      </Button>
    </>
  );
}

function DeleteResume() {
  const t = useTranslations();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { remove } = useResume();
  const toast = useToast();

  function handleOnDelete() {
    remove();
    router.push("/resumes");
    toast({
      description: t("resume_deleted"),
      isClosable: true,
    });
  }

  return (
    <>
      <Button
        size="sm"
        justifyContent="flex-start"
        data-testid="delete-button"
        leftIcon={<Trash2Icon size={16} />}
        onClick={onOpen}
      >
        {t("delete")}
      </Button>
      <DeleteResumeModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleOnDelete}
      />
    </>
  );
}

function ImportData(props: { onImport: (_fields: Fields) => void }) {
  const { onImport } = props;
  const t = useTranslations();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        size="sm"
        mb="2"
        justifyContent="flex-start"
        data-testid="import-button"
        leftIcon={<UploadIcon size={16} />}
        onClick={onOpen}
      >
        {t("import")}
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
  const t = useTranslations();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        size="sm"
        justifyContent="flex-start"
        data-testid="export-button"
        leftIcon={<DownloadIcon size={16} />}
        onClick={onOpen}
      >
        {t("export")}
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
  const t = useTranslations();
  const { control } = useFormContext<Resume>();
  const watch = useWatch({
    control,
    name: ["updatedAt", "about.summary", "section"],
  });
  const updatedAt = isNil(watch[0]) ? Date.now() : watch[0];
  const wordCount = isNil(or(watch[1], watch[2]))
    ? 0
    : utils.countWords(watch[1], watch[2]);
  const { locale } = useDateFnsLocale();
  return (
    <Box>
      <Text fontSize="xs" opacity="0.5" mb="2">
        {t("word_count_n", { n: wordCount })}
      </Text>
      <Text fontSize="xs" opacity="0.5">
        {t("edited_time", {
          time: formatDistanceToNow(updatedAt, {
            addSuffix: true,
            locale,
          }),
        })}
      </Text>
    </Box>
  );
}

function HeaderPopover(props: Props) {
  const {
    devTools,
    onImport,
    onPdfExport,
    onJsonExport,
    onHtmlExport,
    onPngExport,
  } = props;
  const t = useTranslations();
  return (
    <Popover placement="bottom-start">
      {({ isOpen }) => (
        <>
          <Tooltip
            label={t("style_export_and_more")}
            aria-label={TOOLTIP_MORE_LABEL}
            isDisabled={isOpen}
            placement="bottom-start"
          >
            <Flex>
              <PopoverTrigger>
                <IconButton
                  size="sm"
                  data-testid="more-button"
                  aria-label={TOOLTIP_MORE_LABEL}
                  icon={<MoreHorizontalIcon size={16} />}
                />
              </PopoverTrigger>
            </Flex>
          </Tooltip>
          <PopoverContent width="222px">
            <PopoverBody>
              <Flex flexDirection="column">
                <FullWidth />
                <DarkMode />
                <PdfViewer />
                <HideSensitiveData />
                <DevTools />
                <Divider marginY="2" />
                <LanguageSelect mb="2" />
                <Duplicate />
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
