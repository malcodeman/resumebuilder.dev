import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";

import getTemplate from "./getTemplate";

import { Resume, Section } from "../types";

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
  const document = getTemplate(resume.meta.template, fields);
  const blob = await pdf(document).toBlob();
  saveAs(blob, resume.title);
}

function exportAsJson(resume: Resume) {
  const blob = new Blob([JSON.stringify(resume)], {
    type: "application/json",
  });
  saveAs(blob, `${resume.title}.json`);
}

function isStandardSection(name: Section) {
  return (
    name === "standardSection" ||
    name === "employmentSection" ||
    name === "educationSection" ||
    name === "projectsSection"
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

const EXPORTS = {
  isBrowser,
  readAsTextAsync,
  exportAsPdf,
  exportAsJson,
  isStandardSection,
  isTagListSection,
};

export default EXPORTS;
