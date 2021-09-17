import BerlinReact from "../templates/berlin/BerlinReact";
import BerlinPdf from "../templates/berlin/BerlinPdf";

import { Fields, Template } from "../types";

function getTemplate(name: Template, fields: Fields, pdf?: boolean) {
  switch (name) {
    default:
    case Template.berlin:
      return pdf ? <BerlinPdf {...fields} /> : <BerlinReact {...fields} />;
  }
}

export default getTemplate;
