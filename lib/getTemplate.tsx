import BerlinTemplate from "../components/BerlinTemplate";
import TokyoTemplate from "../components/TokyoTemplate";

import { Fields, Template } from "../types";

function getTemplate(name: Template, fields: Fields) {
  switch (name) {
    default:
    case Template.berlin:
      return <BerlinTemplate {...fields} />;
    case Template.tokyo:
      return <TokyoTemplate {...fields} />;
  }
}

export default getTemplate;
