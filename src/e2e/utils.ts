import { BrowserContext } from "@playwright/test";
import { Resume } from "types";
import { find, equals } from "ramda";

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

const EXPORTS = {
  getLocalStorageItem,
  getResume,
};

export default EXPORTS;
