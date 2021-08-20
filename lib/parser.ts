import * as R from "ramda";

import { Fields } from "../types";

function parseJsonResume(text: string): Fields {
  const json = JSON.parse(text);
  const basics = json.basics;
  const fields = {
    title: basics.label,
    firstName: R.split(" ", basics.name)[0],
    lastName: R.split(" ", basics.name)[1],
    email: basics.email,
    phone: basics.phone,
    city: basics.location.city,
    country: basics.location.countryCode,
    summary: basics.summary,
    section: [],
  };
  return fields;
}

const EXPORTS = {
  parseJsonResume,
};

export default EXPORTS;
