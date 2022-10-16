import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import ReactDOMServer from "react-dom/server";
import CSSReset from "@chakra-ui/css-reset";
import * as htmlToImage from "html-to-image";
import { createStandaloneToast } from "@chakra-ui/react";
import faker from "faker";
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
} from "ramda";
import { i18n } from "next-i18next";

import getTemplate from "./getTemplate";

import { Resume, Section, Fields, SectionField } from "../types";

const { toast } = createStandaloneToast();
const isBrowser =
  typeof window !== "undefined" &&
  typeof navigator !== "undefined" &&
  typeof document !== "undefined";

function readAsTextAsync(file: File): Promise<string | ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

async function exportAsPdf(resume: Resume) {
  const fields = {
    about: resume.about,
    section: resume.section,
  };
  const element = getTemplate(resume.design, fields, true);
  const blob = await pdf(element).toBlob();
  saveAs(blob, resume.title);
}

function exportAsJson(resume: Resume) {
  const blob = new Blob([JSON.stringify(resume)], {
    type: "application/json",
  });
  saveAs(blob, `${resume.title}.json`);
}

function exportAsHtml(resume: Resume) {
  const fields = {
    about: resume.about,
    section: resume.section,
  };
  const element = getTemplate(resume.design, fields);
  const markup = ReactDOMServer.renderToStaticMarkup(element);
  const cssReset = CSSReset().props.styles;
  const data = `<style>${cssReset}</style>${markup}`;
  const blob = new Blob([data], {
    type: "text/plain;charset=utf-8",
  });
  saveAs(blob, `${resume.title}.html`);
}

async function exportAsPng(resume: Resume) {
  try {
    const blob = await htmlToImage.toBlob(
      document.getElementById(resume.design.template)
    );
    saveAs(blob, `${resume.title}.png`);
  } catch (error) {
    toast({
      description: i18n.t("something_went_wrong").toString(),
      status: "error",
      isClosable: true,
    });
  }
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

function getUrlHost(url: string) {
  try {
    return new URL(url).host;
  } catch {
    return "";
  }
}

function getRandomInt(min: number, max: number) {
  const minNumber = Math.ceil(min);
  const maxNumber = Math.floor(max);
  return Math.floor(Math.random() * (maxNumber - minNumber) + minNumber);
}

function generateFakeResume(): Fields {
  const fields = {
    about: {
      title: faker.name.jobTitle(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumberFormat(),
      website: faker.internet.url(),
      city: faker.address.city(),
      country: faker.address.country(),
      summary: faker.lorem.paragraphs(1),
    },
    section: [
      {
        name: "employment" as const,
        label: "Employment History",
        nested: [
          {
            title: faker.company.companyName(),
            subtitle: faker.name.jobTitle(),
            website: faker.internet.url(),
            city: faker.address.city(),
            startDate: faker.date.past().toDateString(),
            endDate: "Current",
            description: faker.lorem.paragraphs(2),
          },
          {
            title: faker.company.companyName(),
            subtitle: faker.name.jobTitle(),
            website: faker.internet.url(),
            city: faker.address.city(),
            startDate: faker.date.past().toDateString(),
            endDate: faker.date.past().toDateString(),
            description: faker.lorem.paragraphs(2),
          },
        ],
      },
      {
        name: "skills" as const,
        label: "Skills",
        tags: join("\n", split(" ", faker.lorem.words(getRandomInt(1, 10)))),
      },
      {
        name: "hobbies" as const,
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

const EXPORTS = {
  isBrowser,
  readAsTextAsync,
  exportAsPdf,
  exportAsJson,
  exportAsHtml,
  exportAsPng,
  isStandardSection,
  isTagListSection,
  pt2px,
  getUrlHost,
  getRandomInt,
  generateFakeResume,
  countWords,
  checkResumeProperties,
};

export default EXPORTS;
