import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import * as R from "ramda";

import getTemplate from "./getTemplate";
import renderer from "./renderer";

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

type Type = "div" | "p" | "a";

function parseDocument(document) {
  function getType(type: Type) {
    switch (type) {
      case "div":
        return "VIEW";
      case "p":
        return "TEXT";
      case "a":
        return "LINK";
    }
  }

  function isHtmlType(type: Type) {
    return type === "div" || type === "p" || type === "a";
  }

  function parseType(type: Type) {
    return isHtmlType(type) ? getType(type) : type;
  }

  function traverse(document) {
    if (R.is(Array, document)) {
      return R.map((item) => traverse(item), document);
    }
    if (R.isNil(document?.type)) {
      return document;
    }
    return {
      ...document,
      type: parseType(document.type),
      props: {
        ...document.props,
        children: traverse(document.props.children),
      },
    };
  }

  return traverse(document);
}

async function exportAsPdf(resume: Resume) {
  const fields = {
    about: resume.about,
    section: resume.section,
  };
  const element = getTemplate(resume.meta.template, fields);
  const document = element.type(element.props);
  const parsedDoc = parseDocument(document);
  const render = renderer(parsedDoc);
  const blob = await pdf(render).toBlob();
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
