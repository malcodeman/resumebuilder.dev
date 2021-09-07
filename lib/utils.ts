import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";

import getTemplate from "./getTemplate";

import { Resume } from "../types";

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

const EXPORTS = {
  readAsTextAsync,
  exportAsPdf,
  exportAsJson,
};

export default EXPORTS;
