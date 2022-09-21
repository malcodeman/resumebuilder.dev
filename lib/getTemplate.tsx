import Berlin from "../templates/Berlin";
import TokyoReact from "../templates/tokyo/TokyoReact";
import TokyoPdf from "../templates/tokyo/TokyoPdf";
import LondonReact from "../templates/london/LondonReact";
import LondonPdf from "../templates/london/LondonPdf";
import Rio from "../templates/Rio";
import Nairobi from "../templates/Nairobi";

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
      return <Rio isPdf={pdf} design={design} fields={fields} />;
    case Template.nairobi:
      return <Nairobi isPdf={pdf} design={design} fields={fields} />;
  }
}

export default getTemplate;
