import BerlinReact from "../templates/berlin/BerlinReact";
import BerlinPdf from "../templates/berlin/BerlinPdf";
import TokyoReact from "../templates/tokyo/TokyoReact";
import TokyoPdf from "../templates/tokyo/TokyoPdf";

import { Fields, Template } from "../types";

function getTemplate(name: Template, fields: Fields, pdf?: boolean) {
  switch (name) {
    default:
    case Template.berlin:
      return pdf ? <BerlinPdf {...fields} /> : <BerlinReact {...fields} />;
    case Template.tokyo:
      return pdf ? <TokyoPdf {...fields} /> : <TokyoReact {...fields} />;
  }
}

export default getTemplate;
