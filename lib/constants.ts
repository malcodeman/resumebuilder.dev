import { Template } from "../types";

const IS_PROD = process.env.NODE_ENV === "production";
const TEMPLATES: Template[] = Object.values(Template);
const TEMPLATES_FILTERS = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "simple",
    label: "Simple",
  },
  {
    value: "creative",
    label: "Creative",
  },
  {
    value: "professional",
    label: "Professional",
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
      name: "employmentSection" as const,
      label: "Employment History",
      nested: [STANDARD_SECTION_DEFAULT_VALUES],
    },
    {
      name: "educationSection" as const,
      label: "Education",
      nested: [STANDARD_SECTION_DEFAULT_VALUES],
    },
    {
      name: "skillsSection" as const,
      label: "Skills",
      tags: "",
    },
    {
      name: "hobbiesSection" as const,
      label: "Hobbies",
      tags: "",
    },
  ],
};
const TEMPLATES_LIST = [
  {
    title: "Berlin",
    template: Template.berlin,
    description: "A clean and flexible resume template.",
    src: "/templates/berlin.png",
    tags: ["all", "creative"],
  },
  {
    title: "Tokyo",
    template: Template.tokyo,
    description:
      "Present your skills and experience with this minimal resume template.",
    src: "/templates/tokyo.png",
    tags: ["all", "simple", "professional"],
  },
  {
    title: "London",
    template: Template.london,
    description: "Modern, contemporary, and a good mood all around.",
    src: "/templates/london.png",
    tags: ["all", "simple", "creative"],
  },
  {
    title: "Rio",
    template: Template.rio,
    description:
      "Rio is a perfect choice for the majority of job applications.",
    src: "/templates/rio.png",
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
