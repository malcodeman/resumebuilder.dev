import { BrowserContext } from "@playwright/test";
import { Resume } from "types";

async function getLocalStorageItem({
  context,
  name,
}: {
  context: BrowserContext;
  name: string;
}) {
  const storageState = await context.storageState();

  return storageState.origins[0].localStorage.find((item) => item.name === name)
    .value;
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

const EXPORTS = {
  getLocalStorageItem,
  getResume,
};

export default EXPORTS;
