import React from "react";
import { Box } from "@chakra-ui/react";
import { useWatch, UseFormReturn } from "react-hook-form";
import { motion } from "framer-motion";
import { PDFViewer } from "@react-pdf/renderer";
import { or } from "ramda";
import getTemplate from "lib/getTemplate";
import utils from "lib/utils";
import useAutoSave from "hooks/useAutoSave";
import useLocalStorage from "hooks/useLocalStorage";
import useProfilePicture from "hooks/useProfilePicture";
import { Resume } from "types";

type props = {
  form: UseFormReturn<Resume, object>;
  isPdf?: boolean;
};

const PAGE_SIZE = {
  WIDTH: 595.28,
  HEIGHT: 841.89,
};

function Document(props: props) {
  const { form } = props;
  const [isFullWidth] = useLocalStorage("is-full-width");
  const [isPdf] = useLocalStorage("is-pdf-viewer");
  const [hideSensitiveData] = useLocalStorage("hide-sensitive-data");
  const [profilePicture] = useProfilePicture();
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
        isPdf: or(props.isPdf, isPdf),
        hideSensitiveData,
        design: watch[1],
        fields,
        profilePicture,
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
    maxWidth: isFullWidth ? "100%" : utils.pt2px(PAGE_SIZE.WIDTH),
  };

  if (id) {
    if (or(props.isPdf, isPdf)) {
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
