import React from "react";
import { useDebouncedEffect, useLocalStorageValue } from "@react-hookz/web";
import { useWatch, UseFormReturn } from "react-hook-form";
import { isEmpty } from "ramda";

import useResume from "./useResume";

import { Resume } from "../types";

type props = {
  form: UseFormReturn<Resume, object>;
};

function useAutoSave(props: props) {
  const { form } = props;
  const [isPdfViewer] = useLocalStorageValue("is-pdf-viewer", false, {
    initializeWithStorageValue: false,
  });
  const { setResume } = useResume();
  const watch = useWatch({
    control: form.control,
    name: ["design", "about", "section"],
  });
  const design = watch[0];
  const about = watch[1];
  const section = watch[2];
  const delay = isPdfViewer ? 2000 : 200;
  const maxWait = isPdfViewer ? 5000 : 500;

  React.useEffect(() => {
    if (form.formState.isDirty) {
      form.setValue("updatedAt", Date.now());
    }
  }, [form, watch]);

  useDebouncedEffect(
    () => {
      const values = form.getValues();
      if (!isEmpty(values)) {
        setResume(values);
      }
    },
    [
      design?.spacing,
      design?.template,
      about?.city,
      about?.country,
      about?.email,
      about?.firstName,
      about?.lastName,
      about?.phone,
      about?.summary,
      about?.title,
      about?.website,
      section,
    ],
    delay,
    maxWait
  );
}

export default useAutoSave;
