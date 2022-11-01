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
import { useTranslation } from "next-i18next";

import utils from "../../lib/utils";

import { Fields } from "../../types";

type props = {
  onImport: (fields: Fields) => void;
};

function ImportFromPasteData(props: props) {
  const { onImport } = props;
  const { t } = useTranslation();
  const form = useForm({
    defaultValues: { data: "" },
    resolver: yupResolver(
      yup.object({
        data: yup.string().required(t("data_is_required")),
      })
    ),
  });

  function onSubmit(values: { data: string }) {
    try {
      const parsed = JSON.parse(values.data);
      if (utils.checkResumeProperties(parsed)) {
        onImport({ about: parsed.about, section: parsed.section });
      } else {
        form.setError("data", { message: t("invalid_resume_format") });
      }
    } catch {
      form.setError("data", { message: t("invalid_json_format") });
    }
  }

  return (
    <>
      <Text mb="2">{t("paste_data_description")}</Text>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormControl mb="4" isInvalid={Boolean(form.formState.errors.data)}>
          <Textarea
            variant="filled"
            data-cy="data-textarea"
            {...form.register("data")}
          />
          <FormErrorMessage>
            {form.formState.errors.data?.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          size="sm"
          colorScheme="blue"
          type="submit"
          data-cy="import-button"
        >
          {t("import")}
        </Button>
      </form>
    </>
  );
}

export default ImportFromPasteData;
