import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import ReactDOMServer from "react-dom/server";
import { CSSReset } from "@chakra-ui/react";
import * as htmlToImage from "html-to-image";
import { SystemStyleObject } from "@chakra-ui/react";
import { faker } from "@faker-js/faker";
import {
  join,
  split,
  length,
  map,
  filter,
  isNil,
  flatten,
  sum,
  isEmpty,
  equals,
  has,
  startsWith,
  or,
  drop,
} from "ramda";
import { format } from "date-fns";
import { getTemplate } from "lib/getTemplate";
import { Resume, Section, Fields, SectionField } from "types";

const isBrowser =
  typeof window !== "undefined" &&
  typeof navigator !== "undefined" &&
  typeof document !== "undefined";

function file2Text(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => resolve(reader.result?.toString() || "");
    reader.onerror = (error) => reject(error);
  });
}

function file2Base64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result?.toString() || "");
    reader.onerror = (error) => reject(error);
  });
}

async function exportAsPdf(data: {
  resume: Resume;
  profilePicture: string;
  hideSensitiveData: boolean;
}) {
  const { resume, profilePicture = "", hideSensitiveData = false } = data;
  const fields = {
    about: resume.about,
    section: resume.section,
  };
  const element = getTemplate({
    isPdf: true,
    hideSensitiveData,
    design: resume.design,
    fields,
    profilePicture,
  });
  const blob = await pdf(element).toBlob();
  saveAs(blob, resume.title);
}

function exportAsJson(resume: Resume) {
  const blob = new Blob([JSON.stringify(resume)], {
    type: "application/json",
  });
  saveAs(blob, `${resume.title}.json`);
}

function exportAsHtml(data: {
  resume: Resume;
  profilePicture: string;
  hideSensitiveData: boolean;
}) {
  const { resume, profilePicture = "", hideSensitiveData = false } = data;
  const fields = {
    about: resume.about,
    section: resume.section,
  };
  const element = getTemplate({
    hideSensitiveData,
    design: resume.design,
    fields,
    profilePicture,
  });
  const markup = ReactDOMServer.renderToStaticMarkup(element);
  const cssReset = CSSReset({}).props.styles;
  const blobParts = `<style>${cssReset}</style>${markup}`;
  const blob = new Blob([blobParts], {
    type: "text/plain;charset=utf-8",
  });
  saveAs(blob, `${resume.title}.html`);
}

async function exportAsPng(resume: Resume) {
  const blob = await htmlToImage.toBlob(
    document.getElementById(resume.design.template)
  );
  saveAs(blob, `${resume.title}.png`);
}

function isStandardSection(name: Section) {
  return (
    equals(name, "standard") ||
    equals(name, "employment") ||
    equals(name, "education") ||
    equals(name, "projects") ||
    equals(name, "internships")
  );
}

function isTagListSection(name: Section) {
  return (
    equals(name, "tagList") ||
    equals(name, "skills") ||
    equals(name, "hobbies") ||
    equals(name, "languages")
  );
}

function pt2px(pt: number, suffix = true) {
  if (suffix) {
    return `${(pt * 96) / 72}px`;
  }
  return (pt * 96) / 72;
}

function parseWebsite(url: string) {
  try {
    const hasProtocol = or(
      startsWith("http://", url),
      startsWith("https://", url)
    );
    const parsedUrl = new URL(hasProtocol ? url : `https://${url}`);
    const host = startsWith("www.", parsedUrl.host)
      ? drop(4, parsedUrl.host)
      : parsedUrl.host;
    const pathname = parsedUrl.pathname;
    if (equals(pathname, "/")) {
      return host;
    }
    return `${host}${pathname}`;
  } catch {
    return url;
  }
}

function getRandomInt(min: number, max: number) {
  const minNumber = Math.ceil(min);
  const maxNumber = Math.floor(max);
  return Math.floor(Math.random() * (maxNumber - minNumber) + minNumber);
}

function generateFakeResume() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const fields: Fields = {
    about: {
      title: faker.person.jobTitle(),
      firstName,
      lastName,
      email: faker.internet.email({ firstName, lastName }),
      phone: faker.phone.number(),
      website: faker.internet.url(),
      city: faker.location.city(),
      country: faker.location.country(),
      summary: faker.lorem.paragraphs(1),
    },
    section: [
      {
        name: "employment",
        label: "Employment History",
        nested: [
          {
            title: faker.company.name(),
            subtitle: faker.person.jobTitle(),
            website: faker.internet.url(),
            city: faker.location.city(),
            startDate: format(
              faker.date.past({ years: 2 }),
              "MMM yyyy"
            ).toString(),
            endDate: "Current",
            description: faker.lorem.paragraphs(2),
          },
          {
            title: faker.company.name(),
            subtitle: faker.person.jobTitle(),
            website: faker.internet.url(),
            city: faker.location.city(),
            startDate: format(
              faker.date.past({ years: 6 }),
              "MMM yyyy"
            ).toString(),
            endDate: format(
              faker.date.past({ years: 4 }),
              "MMM yyyy"
            ).toString(),
            description: faker.lorem.paragraphs(2),
          },
        ],
      },
      {
        name: "skills",
        label: "Skills",
        tags: join("\n", split(" ", faker.lorem.words(getRandomInt(1, 10)))),
      },
      {
        name: "hobbies",
        label: "Hobbies",
        tags: join("\n", split(" ", faker.lorem.words(getRandomInt(1, 10)))),
      },
    ],
  };
  return fields;
}

function countWords(summary: string, section: SectionField[]) {
  const summaryCount = isEmpty(summary) ? 0 : length(split(" ", summary));
  const standardSections = filter((item) => !isNil(item.nested), section);
  const nested = flatten(map((item) => item.nested, standardSections));
  const descriptionCount = map(
    (item) =>
      isEmpty(item.description) ? 0 : length(split(" ", item.description)),
    nested
  );
  return sum([summaryCount, ...descriptionCount]);
}

function checkResumeProperties(resume: Resume) {
  if (
    has("id", resume) &&
    has("version", resume) &&
    has("title", resume) &&
    has("icon", resume) &&
    has("createdAt", resume) &&
    has("updatedAt", resume) &&
    has("design", resume) &&
    has("about", resume) &&
    has("section", resume)
  ) {
    return true;
  }
  return false;
}

function getScrollbarStyle(): SystemStyleObject {
  const sx = {
    scrollbarWidth: "thin",
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#72757b",
    },
  };
  return sx;
}

export const utils = {
  isBrowser,
  file2Text,
  file2Base64,
  exportAsPdf,
  exportAsJson,
  exportAsHtml,
  exportAsPng,
  isStandardSection,
  isTagListSection,
  pt2px,
  parseWebsite,
  getRandomInt,
  generateFakeResume,
  countWords,
  checkResumeProperties,
  getScrollbarStyle,
};
