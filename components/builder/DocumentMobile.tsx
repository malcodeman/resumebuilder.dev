import { UseFormReturn } from "react-hook-form";

import getTemplate from "../../lib/getTemplate";

import { Resume } from "../../types";

type props = {
  form: UseFormReturn<Resume, object>;
};

function DocumentMobile(props: props) {
  const { form } = props;
  const values = form.getValues();
  const template = values.meta.template;
  const fields = {
    about: values.about,
    section: values.section,
  };
  const document = getTemplate(template, fields);
  return document;
}

export default DocumentMobile;
