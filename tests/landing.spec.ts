import { test, expect } from "@playwright/test";
import utils from "e2e/utils";

test.describe("Landing page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });
  test("Templates page", async ({ page, baseURL }) => {
    await page.getByTestId("templates-text").click();
    await expect(page).toHaveURL(`${baseURL}/en/templates`);
  });
  test("Bosnian language", async ({ page, baseURL }) => {
    await page.getByTestId("language-select").selectOption("bs");
    await expect(page).toHaveURL(`${baseURL}/bs`);
  });
  test("German language", async ({ page, baseURL }) => {
    await page.getByTestId("language-select").selectOption("de");
    await expect(page).toHaveURL(`${baseURL}/de`);
  });
  test("Header dashboard button", async ({ page, baseURL, context }) => {
    await page.getByTestId("dashboard-button").click();
    await expect(page).toHaveURL(`${baseURL}/en/resumes`);

    expect(
      await utils.getLocalStorageItem({ context, name: "view-dashboard" })
    ).toBe("true");
  });
  test("Build for free top button", async ({ page, baseURL, context }) => {
    await page.getByTestId("build-for-free-top-button").click();

    const resume = await utils.getResume({ context });

    await expect(page).toHaveURL(`${baseURL}/en/resumes/${resume.id}/about`);
  });
  test("See all templates button", async ({ page, baseURL, context }) => {
    await page.getByTestId("see-all-templates-button").click();
    await expect(page).toHaveURL(`${baseURL}/en/templates`);
  });
  test("Use berlin template", async ({ page, baseURL, context }) => {
    await page.getByTestId("use-template-button").first().click();

    const resume = await utils.getResume({ context });

    await expect(page).toHaveURL(`${baseURL}/en/resumes/${resume.id}`);
  });
  test("FAQ", async ({ page }) => {
    for (const button in await page.getByTestId("accordion-button").all()) {
      await page.getByTestId("accordion-button").nth(Number(button)).click();
    }

    expect(await page.getByTestId("accordion-panel").all()).toHaveLength(6);
  });
  test("Build for free bottom button", async ({ page, baseURL, context }) => {
    await page.getByTestId("build-for-free-bottom-button").click();

    const resume = await utils.getResume({ context });

    await expect(page).toHaveURL(`${baseURL}/en/resumes/${resume.id}/about`);
  });
});
