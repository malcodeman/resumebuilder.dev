import { nanoid } from "nanoid";

import { Template } from "../types";

const IS_PROD = process.env.NODE_ENV === "production";
const TEMPLATES: Template[] = Object.values(Template);
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
const DEFAULT_VALUES_LANDING = {
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
    title: "Programmer",
    firstName: "John",
    lastName: "Doe",
    email: "john@gmail.com",
    phone: "(912) 555-4321",
    website: "https://johndoe.com",
    city: "San Francisco",
    country: "US",
    summary: "A summary of John Doe…",
  },
  section: [
    {
      name: "employmentSection" as const,
      label: "Employment History",
      nested: [
        {
          title: "Company",
          subtitle: "President",
          website: "https://company.com",
          city: "San Francisco",
          startDate: "2013-01-01",
          endDate: "2014-01-01",
          description: "Description…",
        },
      ],
    },
  ],
};
const LANDING_RESUMES_LIST = [
  {
    ...DEFAULT_VALUES_LANDING,
    id: nanoid(),
  },
  {
    ...DEFAULT_VALUES_LANDING,
    id: nanoid(),
    design: {
      ...DEFAULT_VALUES_LANDING.design,
      template: Template.tokyo,
    },
  },
  {
    ...DEFAULT_VALUES_LANDING,
    id: nanoid(),
    design: {
      ...DEFAULT_VALUES_LANDING.design,
      template: Template.london,
    },
  },
];
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
  STANDARD_SECTION_DEFAULT_VALUES,
  DEFAULT_VALUES,
  LANDING_RESUMES_LIST,
  TEMPLATES_LIST,
  VIEWS,
  FATHOM_SITE_ID,
  FATHOM_EVENTS,
};
