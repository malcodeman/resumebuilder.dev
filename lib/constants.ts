import { equals, values } from "ramda";

import { Template } from "../types";

const IS_PROD = equals(process.env.NEXT_PUBLIC_VERCEL_ENV, "production");
const TEMPLATES: Template[] = values(Template);
const TEMPLATES_FILTERS = [
  {
    value: "all",
    labelTransKey: "all",
  },
  {
    value: "simple",
    labelTransKey: "simple",
  },
  {
    value: "creative",
    labelTransKey: "creative",
  },
  {
    value: "professional",
    labelTransKey: "professional",
  },
];
const STANDARD_SECTION_DEFAULT_VALUES = {
  title: "",
  subtitle: "",
  website: "",
  city: "",
  startDate: "",
  endDate: "",
  description: "",
};
const DEFAULT_VALUES = {
  id: "",
  version: "1.0.0",
  title: "",
  icon: "",
  createdAt: Date.now(),
  updatedAt: Date.now(),
  design: {
    template: Template.berlin,
    spacing: 1,
  },
  about: {
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    website: "",
    city: "",
    country: "",
    summary: "",
  },
  section: [
    {
      name: "employment" as const,
      label: "Employment History",
      nested: [STANDARD_SECTION_DEFAULT_VALUES],
    },
    {
      name: "education" as const,
      label: "Education",
      nested: [STANDARD_SECTION_DEFAULT_VALUES],
    },
    {
      name: "skills" as const,
      label: "Skills",
      tags: "",
    },
    {
      name: "hobbies" as const,
      label: "Hobbies",
      tags: "",
    },
  ],
};
const TEMPLATES_LIST = [
  {
    title: "Berlin",
    template: Template.berlin,
    descriptionTransKey: "berlin_description",
    src: "/templates/berlin.png",
    tags: ["all", "creative"],
  },
  {
    title: "Tokyo",
    template: Template.tokyo,
    descriptionTransKey: "tokyo_description",
    src: "/templates/tokyo.png",
    tags: ["all", "simple", "professional"],
  },
  {
    title: "London",
    template: Template.london,
    descriptionTransKey: "london_description",
    src: "/templates/london.png",
    tags: ["all", "simple", "creative"],
  },
  {
    title: "Rio",
    template: Template.rio,
    descriptionTransKey: "rio_description",
    src: "/templates/rio.png",
    tags: ["all", "simple", "professional"],
  },
  {
    title: "Nairobi",
    template: Template.nairobi,
    descriptionTransKey: "nairobi_description",
    src: "/templates/nairobi.png",
    tags: ["all", "simple", "professional"],
  },
];
const VIEWS = {
  GRID: "grid",
  LIST: "list",
};
const FATHOM_SITE_ID = "ZMOHRXZI";
const FATHOM_EVENTS = {
  EXPORT_AS_PDF: "0UNUBD1E",
};

export {
  IS_PROD,
  TEMPLATES,
  TEMPLATES_FILTERS,
  STANDARD_SECTION_DEFAULT_VALUES,
  DEFAULT_VALUES,
  TEMPLATES_LIST,
  VIEWS,
  FATHOM_SITE_ID,
  FATHOM_EVENTS,
};
