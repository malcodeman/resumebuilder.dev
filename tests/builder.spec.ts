import { test, expect } from "@playwright/test";
import utils from "e2e/utils";

test.describe("Builder page", () => {
  test.beforeEach(async ({ page, context, baseURL }) => {
    await page.goto("/en/resumes/new");

    const resume = await utils.getResume({ context });

    await expect(page).toHaveURL(`${baseURL}/en/resumes/${resume.id}`);
  });
  test("Page title", async ({ context, page }) => {
    const resume = await utils.getResume({ context });

    expect(await page.title()).toBe(`${resume.title} | resumebuilder.dev`);
  });
  test("Go home", async ({ page, context, baseURL }) => {
    await page.getByTestId("resumebuilder-text").click();

    const resume = await utils.getResume({ context });

    await expect(page).toHaveURL(`${baseURL}/en/resumes/${resume.id}`);
  });
  test("Change icon", async ({ page, context }) => {
    await page.getByTestId("emoji-picker-icon-button").click();
    await page.getByTestId("emoji").first().click();

    const resume = await utils.getResume({ context });

    expect(resume.icon).toBe(":100:");
  });
  test("Rename resume", async ({ page, context }) => {
    await page.getByTestId("title-editable").click();

    const input = page.getByTestId("title-input");
    const name = "malcodeman";

    await input.fill(name);
    await expect(input).toHaveValue(name);
    await page.keyboard.press("Enter");

    const resume = await utils.getResume({ context });

    expect(resume.title).toBe(name);
    expect(page.getByTestId("title-preview")).toHaveText(name);
  });
  test("Export PDF", async ({ page }) => {
    const downloadEvent = page.waitForEvent("download");

    await page.getByTestId("header-export-pdf-button").click();

    expect((await downloadEvent).suggestedFilename()).toBe(
      "Untitled resume.pdf"
    );
  });
  test("Full width", async ({ page, context }) => {
    await page.getByTestId("more-button").click();
    await page.getByTestId("full-width-switch").click();

    expect(
      await utils.getLocalStorageItem({ context, name: "is-full-width" })
    ).toBe("true");
  });
  test("Dark mode", async ({ page, context }) => {
    await page.getByTestId("more-button").click();
    await page.getByTestId("dark-mode-switch").click();

    expect(
      await utils.getLocalStorageItem({ context, name: "chakra-ui-color-mode" })
    ).toBe("dark");
  });
  test("PDF viewer", async ({ page, context }) => {
    await page.getByTestId("more-button").click();
    await page.getByTestId("pdf-viewer-switch").click();

    expect(
      await utils.getLocalStorageItem({ context, name: "is-pdf-viewer" })
    ).toBe("true");
  });
  test("Hide sensitive data", async ({ page, context }) => {
    await page.getByTestId("more-button").click();
    await page.getByTestId("hide-sensitive-data-switch").click();

    expect(
      await utils.getLocalStorageItem({ context, name: "hide-sensitive-data" })
    ).toBe("true");
    expect(
      await page.getByTestId("about-email-input").getAttribute("type")
    ).toBe("password");
    expect(
      await page.getByTestId("about-phone-input").getAttribute("type")
    ).toBe("password");
  });
  test("Dev tools", async ({ page, context }) => {
    await page.getByTestId("more-button").click();
    await page.getByTestId("dev-tools-switch").click();

    expect(
      await utils.getLocalStorageItem({ context, name: "dev-tools" })
    ).toBe("true");
    expect(page.getByTestId("generate-fake-data-button")).toBeVisible();
  });
});
