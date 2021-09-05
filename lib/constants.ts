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
      name: "standardSection" as const,
      label: "Employment History",
      nested: [STANDARD_SECTION_DEFAULT_VALUES],
    },
    {
      name: "standardSection" as const,
      label: "Education",
      nested: [STANDARD_SECTION_DEFAULT_VALUES],
    },
    {
      name: "tagListSection" as const,
      label: "Skills",
      tags: "",
    },
    {
      name: "tagListSection" as const,
      label: "Hobbies",
      tags: "",
    },
  ],
};

export { IS_PROD, TEMPLATES, STANDARD_SECTION_DEFAULT_VALUES, DEFAULT_VALUES };
