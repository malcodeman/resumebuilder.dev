import React from "react";
import {
  FormControl,
  FormErrorMessage,
  Button,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import utils from "../../lib/utils";

import { Fields } from "../../types";

type props = {
  onImport: (fields: Fields) => void;
};

function ImportFromPasteData(props: props) {
  const { onImport } = props;
  const form = useForm({
    defaultValues: { data: "" },
    resolver: yupResolver(
      yup.object({
        data: yup.string().required("Data is required"),
      })
    ),
  });

  function onSubmit(values: { data: string }) {
    try {
      const parsed = JSON.parse(values.data);
      if (utils.checkResumeProperties(parsed)) {
        onImport({ about: parsed.about, section: parsed.section });
      } else {
        form.setError("data", { message: "Invalid resume format" });
      }
    } catch {
      form.setError("data", { message: "Invalid JSON format" });
    }
  }

  return (
    <>
      <Text mb="2">
        Copy existing resume data and paste it in the field below.
      </Text>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormControl mb="4" isInvalid={Boolean(form.formState.errors.data)}>
          <Textarea variant="filled" {...form.register("data")} />
          <FormErrorMessage>
            {form.formState.errors.data?.message}
          </FormErrorMessage>
        </FormControl>
        <Button size="sm" colorScheme="blue" type="submit">
          Import
        </Button>
      </form>
    </>
  );
}

export default ImportFromPasteData;
