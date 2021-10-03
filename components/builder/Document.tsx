import { Box } from "@chakra-ui/react";
import { useWatch, UseFormReturn } from "react-hook-form";
import { useDebouncedEffect, useLocalStorageValue } from "@react-hookz/web";
import { motion } from "framer-motion";
import { PDFViewer } from "@react-pdf/renderer";

import getTemplate from "../../lib/getTemplate";
import utils from "../../lib/utils";
import useResume from "../../hooks/useResume";

import { Resume } from "../../types";

type props = {
  form: UseFormReturn<Resume, object>;
};

const PAGE_SIZE = {
  WIDTH: 595.28,
  HEIGHT: 841.89,
};

function Document(props: props) {
  const { form } = props;
  const [isFullWidth] = useLocalStorageValue("isFullWidth", false, {
    initializeWithStorageValue: false,
  });
  const [isPdfViewer] = useLocalStorageValue("isPdfViewer", false, {
    initializeWithStorageValue: false,
  });
  const [_resume, _isLoading, setResume] = useResume({ isolated: true });
  const watch = useWatch({
    control: form.control,
    name: ["id", "design", "about", "section"],
  });
  const id = watch[0];
  const fields = {
    about: watch[2],
    section: watch[3],
  };
  const document = getTemplate(watch[1], fields, isPdfViewer);
  const delay = isPdfViewer ? 2000 : 200;
  const maxWait = isPdfViewer ? 5000 : 500;

  useDebouncedEffect(
    () => {
      if (id) {
        setResume({
          ...form.getValues(),
          updatedAt: Date.now(),
        });
      }
    },
    [watch],
    delay,
    maxWait
  );

  const boxProps = {
    as: motion.div,
    layout: true,
    width: "100%",
    margin: "0 auto",
    height: utils.pt2px(PAGE_SIZE.HEIGHT),
    maxWidth: isFullWidth ? "100%" : utils.pt2px(PAGE_SIZE.WIDTH),
  };

  if (id) {
    if (isPdfViewer) {
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
