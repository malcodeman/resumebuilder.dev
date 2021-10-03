import BerlinReact from "../templates/berlin/BerlinReact";
import BerlinPdf from "../templates/berlin/BerlinPdf";
import TokyoReact from "../templates/tokyo/TokyoReact";
import TokyoPdf from "../templates/tokyo/TokyoPdf";

import { Design, Fields, Template } from "../types";

function getTemplate(design: Design, fields: Fields, pdf?: boolean) {
  switch (design.template) {
    default:
    case Template.berlin:
      return pdf ? (
        <BerlinPdf design={design} fields={fields} />
      ) : (
        <BerlinReact design={design} fields={fields} />
      );
    case Template.tokyo:
      return pdf ? (
        <TokyoPdf design={design} fields={fields} />
      ) : (
        <TokyoReact design={design} fields={fields} />
      );
  }
}

export default getTemplate;
