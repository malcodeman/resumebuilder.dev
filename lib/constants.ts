import { equals } from "ramda";

import { Template, Resume, TemplateTags } from "../types";

const IS_PROD = equals(process.env.NEXT_PUBLIC_VERCEL_ENV, "production");
const TEMPLATES: Template[] = ["berlin", "london", "nairobi", "rio", "tokyo"];
const TEMPLATES_FILTERS: { value: TemplateTags; labelTransKey: string }[] = [
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
const DEFAULT_VALUES: Resume = {
  id: "",
  version: "1.0.0",
  title: "",
  icon: "",
  createdAt: Date.now(),
  updatedAt: Date.now(),
  design: {
    template: "berlin",
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
      name: "employment",
      label: "Employment History",
      nested: [STANDARD_SECTION_DEFAULT_VALUES],
    },
    {
      name: "education",
      label: "Education",
      nested: [STANDARD_SECTION_DEFAULT_VALUES],
    },
    {
      name: "skills",
      label: "Skills",
      tags: "",
    },
    {
      name: "hobbies",
      label: "Hobbies",
      tags: "",
    },
  ],
};
const TEMPLATES_LIST: {
  title: string;
  template: Template;
  descriptionTransKey: string;
  src: string;
  tags: TemplateTags[];
}[] = [
  {
    title: "Berlin",
    template: "berlin",
    descriptionTransKey: "berlin_description",
    src: "/templates/berlin.png",
    tags: ["all", "creative"],
  },
  {
    title: "Tokyo",
    template: "tokyo",
    descriptionTransKey: "tokyo_description",
    src: "/templates/tokyo.png",
    tags: ["all", "simple", "professional"],
  },
  {
    title: "London",
    template: "london",
    descriptionTransKey: "london_description",
    src: "/templates/london.png",
    tags: ["all", "simple", "creative"],
  },
  {
    title: "Rio",
    template: "rio",
    descriptionTransKey: "rio_description",
    src: "/templates/rio.png",
    tags: ["all", "simple", "professional"],
  },
  {
    title: "Nairobi",
    template: "nairobi",
    descriptionTransKey: "nairobi_description",
    src: "/templates/nairobi.png",
    tags: ["all", "simple", "professional"],
  },
];
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
  FATHOM_SITE_ID,
  FATHOM_EVENTS,
};
