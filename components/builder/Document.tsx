import { Box } from "@chakra-ui/react";
import { useWatch, UseFormReturn } from "react-hook-form";
import { useDebouncedEffect, useLocalStorageValue } from "@react-hookz/web";
import { motion } from "framer-motion";

import getTemplate from "../../lib/getTemplate";
import useResume from "../../hooks/useResume";

import { Resume } from "../../types";

type props = {
  form: UseFormReturn<Resume, object>;
};

function Document(props: props) {
  const { form } = props;
  const [isFullWidth] = useLocalStorageValue("isFullWidth", false, {
    initializeWithStorageValue: false,
  });
  const [_resume, setResume] = useResume({ isolated: true });
  const watch = useWatch({
    control: form.control,
    name: ["id", "meta.template", "about", "section"],
  });
  const id = watch[0];
  const fields = {
    about: watch[2],
    section: watch[3],
  };
  const document = getTemplate(watch[1], fields);

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
    200,
    500
  );

  if (id) {
    return (
      <Box
        as={motion.div}
        layout
        width="100%"
        maxWidth={isFullWidth ? "100%" : "900px"}
        margin="0 auto"
        backgroundColor="#fff"
        display={{ base: "none", lg: "block" }}
      >
        {document}
      </Box>
    );
  }
  return <></>;
}

export default Document;
