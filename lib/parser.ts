import { map, join, split, uniq, filter, isNil } from "ramda";
import papa from "papaparse";

import { Fields } from "../types";

function parseJsonResume(text: string) {
  const json = JSON.parse(text);
  const basics = json.basics || {
    label: "",
    name: "",
    email: "",
    phone: "",
    url: "",
    location: {
      city: "",
      countryCode: "",
    },
    summary: "",
  };
  const fields: Fields = {
    about: {
      title: basics.label,
      firstName: split(" ", basics.name)[0],
      lastName: split(" ", basics.name)[1] || "",
      email: basics.email,
      phone: basics.phone,
      website: basics.url,
      city: basics.location.city,
      country: basics.location.countryCode,
      summary: basics.summary,
    },
    section: [
      {
        name: "employment",
        label: "Employment History",
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
          json.work ? json.work : []
        ),
      },
      {
        name: "education",
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
          json.education ? json.education : []
        ),
      },
      {
        name: "skills",
        label: "Skills",
        tags: join(
          "\n",
          map((item) => item.name, json.skills || [])
        ),
      },
      {
        name: "hobbies",
        label: "Hobbies",
        tags: join(
          "\n",
          map((item) => item.name, json.interests || [])
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

function parseLinkedin(data: {
  emailAddresses: string;
  phoneNumbers: string;
  positions: string;
  profile: string;
  skills: string;
}) {
  const parsedEmailAddresses = papa.parse(data.emailAddresses, {
    header: true,
    skipEmptyLines: true,
  }).data[0] as {
    Confirmed: string;
    "Email Address": string;
    Primary: string;
    "Updated On": string;
  };
  const parsedPhoneNumbers = papa.parse(data.phoneNumbers, {
    header: true,
    skipEmptyLines: true,
  }).data[0] as {
    Extension: string;
    Number: string;
    Type: string;
  };
  const parsedPositions = papa.parse(data.positions, {
    header: true,
    skipEmptyLines: true,
  }).data as {
    "Company Name": string;
    Description: string;
    "Finished On": string;
    Location: string;
    "Started On": string;
    Title: string;
  }[];
  const parsedProfile = papa.parse(data.profile, {
    header: true,
    skipEmptyLines: true,
  }).data[0] as {
    Address: string;
    "Birth Date": string;
    "First Name": string;
    "Geo Location": string;
    Headline: string;
    Industry: string;
    "Instant Messengers": string;
    "Last Name": string;
    "Maiden Name": string;
    Summary: string;
    "Twitter Handles": string;
    Websites: string;
    "Zip Code": string;
  };
  const parsedSkills = papa.parse(data.skills, {
    header: true,
    skipEmptyLines: true,
  }).data as { Name: string }[];
  const fields: Fields = {
    about: {
      title: parsedProfile ? parsedProfile.Headline : "",
      firstName: parsedProfile ? parsedProfile["First Name"] : "",
      lastName: parsedProfile ? parsedProfile["Last Name"] : "",
      email: parsedEmailAddresses ? parsedEmailAddresses["Email Address"] : "",
      phone: parsedPhoneNumbers ? parsedPhoneNumbers.Number : "",
      website: "",
      city: "",
      country: parsedProfile ? parsedProfile["Geo Location"] : "",
      summary: parsedProfile ? parsedProfile.Summary : "",
    },
    section: [
      {
        name: "employment",
        label: "Employment History",
        nested: map(
          (item) => ({
            title: item["Company Name"],
            subtitle: item.Title,
            website: "",
            city: item.Location,
            startDate: item["Started On"],
            endDate: item["Finished On"],
            description: item.Description,
          }),
          parsedPositions
        ),
      },
      {
        name: "skills",
        label: "Skills",
        tags: join(
          "\n",
          map((item) => item.Name, parsedSkills)
        ),
      },
    ],
  };
  return fields;
}

const EXPORTS = {
  parseJsonResume,
  parseGithub,
  parseLinkedin,
};

export default EXPORTS;
