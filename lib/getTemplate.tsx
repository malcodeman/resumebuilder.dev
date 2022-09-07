import BerlinReact from "../templates/berlin/BerlinReact";
import BerlinPdf from "../templates/berlin/BerlinPdf";
import TokyoReact from "../templates/tokyo/TokyoReact";
import TokyoPdf from "../templates/tokyo/TokyoPdf";
import LondonReact from "../templates/london/LondonReact";
import LondonPdf from "../templates/london/LondonPdf";
import RioReact from "../templates/rio/RioReact";
import RioPdf from "../templates/rio/RioPdf";

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
    case Template.london:
      return pdf ? (
        <LondonPdf design={design} fields={fields} />
      ) : (
        <LondonReact design={design} fields={fields} />
      );
    case Template.rio:
      return pdf ? (
        <RioPdf design={design} fields={fields} />
      ) : (
        <RioReact design={design} fields={fields} />
      );
  }
}

export default getTemplate;
