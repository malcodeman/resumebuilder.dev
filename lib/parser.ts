import { map, join, split, uniq, filter, isNil } from "ramda";

import { Fields } from "../types";

function parseJsonResume(text: string) {
  const json = JSON.parse(text);
  const basics = json.basics;
  const fields: Fields = {
    about: {
      title: basics.label,
      firstName: split(" ", basics.name)[0],
      lastName: split(" ", basics.name)[1],
      email: basics.email,
      phone: basics.phone,
      website: basics.url,
      city: basics.location.city,
      country: basics.location.countryCode,
      summary: basics.summary,
    },
    section: [
      {
        name: "standard",
        label: "Work",
        nested: map(
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
        name: "standard",
        label: "Volunteer",
        nested: map(
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
        name: "standard",
        label: "Education",
        nested: map(
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
        name: "tagList",
        label: "Awards",
        tags: join(
          "\n",
          map((item) => item.title, json.awards)
        ),
      },
      {
        name: "standard",
        label: "Publications",
        nested: map(
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
        name: "tagList",
        label: "Skills",
        tags: join(
          "\n",
          map((item) => item.name, json.skills)
        ),
      },
      {
        name: "tagList",
        label: "Languages",
        tags: join(
          "\n",
          map((item) => item.language, json.languages)
        ),
      },
      {
        name: "tagList",
        label: "Interests",
        tags: join(
          "\n",
          map((item) => item.name, json.interests)
        ),
      },
      {
        name: "standard",
        label: "Projects",
        nested: map(
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
}) {
  const skills = uniq(
    filter(
      (item) => !isNil(item),
      map((item) => item.language, data.repos)
    )
  );
  const fields: Fields = {
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
        name: "tagList",
        label: "Skills",
        tags: join("\n", skills),
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
