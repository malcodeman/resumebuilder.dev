import Berlin from "../templates/Berlin";
import TokyoReact from "../templates/tokyo/TokyoReact";
import TokyoPdf from "../templates/tokyo/TokyoPdf";
import LondonReact from "../templates/london/LondonReact";
import LondonPdf from "../templates/london/LondonPdf";
import RioReact from "../templates/rio/RioReact";
import RioPdf from "../templates/rio/RioPdf";
import NairobiReact from "../templates/nairobi/NairobiReact";
import NairobiPdf from "../templates/nairobi/NairobiPdf";

import { Design, Fields, Template } from "../types";

function getTemplate(design: Design, fields: Fields, pdf?: boolean) {
  switch (design.template) {
    default:
    case Template.berlin:
      return <Berlin isPdf={pdf} design={design} fields={fields} />;
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
    case Template.nairobi:
      return pdf ? (
        <NairobiPdf design={design} fields={fields} />
      ) : (
        <NairobiReact design={design} fields={fields} />
      );
  }
}

export default getTemplate;
