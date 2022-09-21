import Berlin from "../templates/Berlin";
import Tokyo from "../templates/Tokyo";
import London from "../templates/London";
import Rio from "../templates/Rio";
import Nairobi from "../templates/Nairobi";

import { Design, Fields, Template } from "../types";

function getTemplate(design: Design, fields: Fields, pdf?: boolean) {
  switch (design.template) {
    default:
    case Template.berlin:
      return <Berlin isPdf={pdf} design={design} fields={fields} />;
    case Template.tokyo:
      return <Tokyo isPdf={pdf} design={design} fields={fields} />;
    case Template.london:
      return <London isPdf={pdf} design={design} fields={fields} />;
    case Template.rio:
      return <Rio isPdf={pdf} design={design} fields={fields} />;
    case Template.nairobi:
      return <Nairobi isPdf={pdf} design={design} fields={fields} />;
  }
}

export default getTemplate;
