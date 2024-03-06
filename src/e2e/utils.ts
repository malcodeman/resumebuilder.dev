import { BrowserContext, Page } from "@playwright/test";
import { find, equals } from "ramda";
import { Resume } from "types";
import utils from "lib/utils";

async function getLocalStorageItem({
  context,
  name,
}: {
  context: BrowserContext;
  name: string;
}) {
  const storageState = await context.storageState();

  return find(
    (item) => equals(item.name, name),
    storageState.origins[0].localStorage
  ).value;
}

async function getResume({
  context,
}: {
  context: BrowserContext;
}): Promise<Resume> {
  const resumes = await getLocalStorageItem({
    context,
    name: "resumes",
  });

  return JSON.parse(resumes)[0];
}

async function setResume({ page }: { page: Page }): Promise<Resume> {
  const fields = utils.generateFakeResume();
  const resume: Resume = {
    id: "1",
    version: "1.0.0",
    title: "Untitled resume",
    icon: "",
    createdAt: Date.now(),
    updatedAt: Date.now(),
    design: {
      template: "berlin",
      spacing: 1,
    },
    about: fields.about,
    section: fields.section,
  };

  await page.evaluate(
    (value) => localStorage.setItem("resumes", value),
    JSON.stringify([resume])
  );

  return resume;
}

const EXPORTS = {
  getLocalStorageItem,
  getResume,
  setResume,
};

export default EXPORTS;
