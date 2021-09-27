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
  meta: {
    template: Template.berlin,
  },
  about: {
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
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
];

export {
  IS_PROD,
  TEMPLATES,
  STANDARD_SECTION_DEFAULT_VALUES,
  DEFAULT_VALUES,
  TEMPLATES_LIST,
};
