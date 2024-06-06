import React from "react";
import { Flex, Text, Button, useColorModeValue } from "@chakra-ui/react";
import { useDropzone, DropzoneOptions, FileRejection } from "react-dropzone";
import { useTranslations } from "next-intl";

type Props = {
  onDrop: (acceptedFiles: File[], rejectedFiles: FileRejection[]) => void;
  isLoading?: boolean;
  accept?: string | string[];
};

function FileUploader(props: Props) {
  const { onDrop, isLoading, accept } = props;
  const t = useTranslations();
  const bg = useColorModeValue("gray.100", "gray.900");
  const bgIsDragActive = useColorModeValue("blue.100", "blue.900");
  const options: DropzoneOptions = {
    noClick: true,
    noKeyboard: true,
    disabled: isLoading,
    accept,
    onDrop,
  };
  const { getRootProps, getInputProps, open, isDragActive } =
    useDropzone(options);

  return (
    <Flex
      bg={isDragActive ? bgIsDragActive : bg}
      direction="column"
      padding="4"
      border="2px dashed rgba(0,0,0,0.1)"
      alignItems="center"
      borderRadius="md"
      {...getRootProps()}
    >
      <Text mb="2">{t("drop_files_here_to_upload")}</Text>
      <Button size="sm" onClick={open} isLoading={isLoading}>
        {t("browse_files")}
      </Button>
      <input {...getInputProps()} />
    </Flex>
  );
}

export default FileUploader;
