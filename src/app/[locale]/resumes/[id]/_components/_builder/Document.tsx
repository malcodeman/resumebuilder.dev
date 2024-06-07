import React from "react";
import { Box } from "@chakra-ui/react";
import { useWatch, UseFormReturn } from "react-hook-form";
import { motion } from "framer-motion";
import { PDFViewer } from "@react-pdf/renderer";
import getTemplate from "lib/getTemplate";
import utils from "lib/utils";
import useAutoSave from "hooks/useAutoSave";
import useLocalStorage from "hooks/useLocalStorage";
import useProfilePicture from "hooks/useProfilePicture";
import { Resume } from "types";

type Props = {
  form: UseFormReturn<Resume, object>;
};

const PAGE_SIZE = {
  WIDTH: 595.28,
  HEIGHT: 841.89,
};

function Document(props: Props) {
  const { form } = props;
  const isFullWidth = useLocalStorage("is-full-width");
  const isPdf = useLocalStorage("is-pdf-viewer");
  const hideSensitiveData = useLocalStorage("hide-sensitive-data");
  const profilePicture = useProfilePicture();
  const watch = useWatch({
    control: form.control,
    name: ["id", "design", "about", "section"],
  });
  const id = watch[0];
  const fields = {
    about: watch[2],
    section: watch[3],
  };
  const document = id
    ? getTemplate({
        isPdf: isPdf.value,
        hideSensitiveData: hideSensitiveData.value,
        design: watch[1],
        fields,
        profilePicture: profilePicture.value,
      })
    : null;

  useAutoSave({ form });

  const boxProps = {
    as: motion.div,
    layout: true,
    width: "100%",
    margin: "0 auto",
    overflow: "hidden",
    height: utils.pt2px(PAGE_SIZE.HEIGHT),
    maxWidth: isFullWidth.value ? "100%" : utils.pt2px(PAGE_SIZE.WIDTH),
  };

  if (id) {
    if (isPdf.value) {
      return (
        <Box {...boxProps}>
          <PDFViewer height="100%" width="100%">
            {document}
          </PDFViewer>
        </Box>
      );
    }
    return <Box {...boxProps}>{document}</Box>;
  }
  return <></>;
}

export default Document;
