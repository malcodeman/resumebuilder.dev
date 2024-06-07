import React from "react";
import { useDebouncedEffect } from "@react-hookz/web";
import { useWatch, UseFormReturn } from "react-hook-form";
import { isEmpty } from "ramda";
import useResume from "hooks/useResume";
import useLocalStorage from "hooks/useLocalStorage";
import { Resume } from "types";

type Props = {
  form: UseFormReturn<Resume, object>;
};

function useAutoSave(props: Props) {
  const { form } = props;
  const isPdfViewer = useLocalStorage("is-pdf-viewer");
  const { setResume } = useResume();
  const watch = useWatch({
    control: form.control,
    name: ["design", "about", "section"],
  });
  const design = watch[0];
  const about = watch[1];
  const section = watch[2];
  const delay = isPdfViewer.value ? 2000 : 200;
  const maxWait = isPdfViewer.value ? 5000 : 500;

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
      JSON.stringify(section),
    ],
    delay,
    maxWait
  );
}

export default useAutoSave;
