import * as R from "ramda";

import { Fields } from "../types";

function parseJsonResume(text: string): Fields {
  const json = JSON.parse(text);
  const basics = json.basics;
  const fields = {
    about: {
      title: basics.label,
      firstName: R.split(" ", basics.name)[0],
      lastName: R.split(" ", basics.name)[1],
      email: basics.email,
      phone: basics.phone,
      website: basics.url,
      city: basics.location.city,
      country: basics.location.countryCode,
      summary: basics.summary,
    },
    section: [
      {
        name: "standardSection" as const,
        label: "Work",
        nested: R.map(
          (item) => ({
            title: item.name,
            subtitle: item.position,
            website: item.url,
            city: "",
            startDate: item.startDate,
            endDate: item.endDate,
            description: item.summary,
          }),
          json.work
        ),
      },
      {
        name: "standardSection" as const,
        label: "Volunteer",
        nested: R.map(
          (item) => ({
            title: item.organization,
            subtitle: item.position,
            website: item.url,
            city: "",
            startDate: item.startDate,
            endDate: item.endDate,
            description: item.summary,
          }),
          json.volunteer
        ),
      },
      {
        name: "standardSection" as const,
        label: "Education",
        nested: R.map(
          (item) => ({
            title: item.institution,
            subtitle: item.studyType,
            website: item.url,
            city: "",
            startDate: item.startDate,
            endDate: item.endDate,
            description: "",
          }),
          json.education
        ),
      },
      {
        name: "tagListSection" as const,
        label: "Awards",
        tags: R.join(
          "\n",
          R.map((item) => item.title, json.awards)
        ),
      },
      {
        name: "standardSection" as const,
        label: "Publications",
        nested: R.map(
          (item) => ({
            title: item.name,
            subtitle: item.publisher,
            website: item.url,
            city: "",
            startDate: item.releaseDate,
            endDate: item.endDate,
            description: item.summary,
          }),
          json.publications
        ),
      },
      {
        name: "tagListSection" as const,
        label: "Skills",
        tags: R.join(
          "\n",
          R.map((item) => item.name, json.skills)
        ),
      },
      {
        name: "tagListSection" as const,
        label: "Languages",
        tags: R.join(
          "\n",
          R.map((item) => item.language, json.languages)
        ),
      },
      {
        name: "tagListSection" as const,
        label: "Interests",
        tags: R.join(
          "\n",
          R.map((item) => item.name, json.interests)
        ),
      },
      {
        name: "standardSection" as const,
        label: "Projects",
        nested: R.map(
          (item) => ({
            title: item.name,
            subtitle: item.description,
            website: item.url,
            city: "",
            startDate: item.startDate,
            endDate: item.endDate,
            description: "",
          }),
          json.projects
        ),
      },
    ],
  };
  return fields;
}

function parseGithub(data: {
  user: {
    name: string | null;
    company: string | null;
    blog: string | null;
    location: string | null;
    email: string | null;
    hireable: boolean | null;
    bio: string | null;
    twitter_username: string | null;
  };
  repos: { language: string | null }[];
}): Fields {
  const skills = R.uniq(
    R.filter(
      (item) => !R.isNil(item),
      R.map((item) => item.language, data.repos)
    )
  );
  const fields = {
    about: {
      title: "Developer",
      firstName: data.user.name || "",
      lastName: "",
      email: data.user.email || "",
      phone: "",
      website: data.user.blog || "",
      city: data.user.location || "",
      country: "",
      summary: data.user.bio || "",
    },
    section: [
      {
        name: "tagListSection" as const,
        label: "Skills",
        tags: R.join("\n", skills),
      },
    ],
  };
  return fields;
}

const EXPORTS = {
  parseJsonResume,
  parseGithub,
};

export default EXPORTS;
