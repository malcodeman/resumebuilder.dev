import { Template } from "../types";

const IS_PROD = process.env.NODE_ENV === "production";
const TEMPLATES: Template[] = Object.values(Template);
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
      nested: [
        {
          title: "",
          subtitle: "",
          website: "",
          city: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    },
    {
      name: "standardSection" as const,
      label: "Education",
      nested: [
        {
          title: "",
          subtitle: "",
          website: "",
          city: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
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

export { IS_PROD, TEMPLATES, DEFAULT_VALUES };
