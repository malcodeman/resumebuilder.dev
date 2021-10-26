import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import ReactDOMServer from "react-dom/server";
import CSSReset from "@chakra-ui/css-reset";
import * as htmlToImage from "html-to-image";
import { createStandaloneToast } from "@chakra-ui/react";
import faker from "faker";
import * as R from "ramda";

import getTemplate from "./getTemplate";

import { Resume, Section, Fields } from "../types";

const toast = createStandaloneToast();
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
      description: error.message,
      status: "error",
      isClosable: true,
    });
  }
}

function isStandardSection(name: Section) {
  return (
    name === "standardSection" ||
    name === "employmentSection" ||
    name === "educationSection" ||
    name === "projectsSection" ||
    name === "internshipsSection"
  );
}

function isTagListSection(name: Section) {
  return (
    name === "tagListSection" ||
    name === "skillsSection" ||
    name === "hobbiesSection" ||
    name === "languagesSection"
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
    const host = new URL(url).host;
    const pathname = new URL(url).pathname;
    return `${host}${pathname}`;
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
        name: "employmentSection" as const,
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
        name: "skillsSection" as const,
        label: "Skills",
        tags: R.join(
          "\n",
          R.split(" ", faker.lorem.words(getRandomInt(1, 10)))
        ),
      },
      {
        name: "hobbiesSection" as const,
        label: "Hobbies",
        tags: R.join(
          "\n",
          R.split(" ", faker.lorem.words(getRandomInt(1, 10)))
        ),
      },
    ],
  };
  return fields;
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
  generateFakeResume,
};

export default EXPORTS;
