import { test, expect } from "@playwright/test";
import { filter, includes, length } from "ramda";
import utils from "e2e/utils";
import { TEMPLATES_LIST } from "lib/constants";

test.describe("Templates page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/en/templates");
  });
  test("Search | Not found", async ({ page }) => {
    await page
      .getByTestId("search-input")
      .getByRole("textbox")
      .fill("malcodeman");

    expect(await page.getByTestId("template").count()).toBe(0);
    expect(await page.getByRole("main").textContent()).toContain(
      "No templates found"
    );
  });
  test("Search | Found", async ({ page }) => {
    const input = page.getByTestId("search-input").getByRole("textbox");
    const name = "London";

    await input.fill(name);
    await expect(input).toHaveValue(name);

    expect(await page.getByTestId("template").count()).toBe(1);
    expect(await page.getByRole("main").textContent()).not.toContain(
      "No templates found"
    );
  });
  test("All templates", async ({ page }) => {
    await page.getByTestId("template-filters-all").click();

    const count = length(
      filter((item) => includes("all", item.tags), TEMPLATES_LIST)
    );

    expect(await page.getByTestId("template").count()).toBe(count);
  });
  test("Simple templates", async ({ page }) => {
    await page.getByTestId("template-filters-simple").click();

    const count = length(
      filter((item) => includes("simple", item.tags), TEMPLATES_LIST)
    );

    expect(await page.getByTestId("template").count()).toBe(count);
  });
  test("Creative templates", async ({ page }) => {
    await page.getByTestId("template-filters-creative").click();

    const count = length(
      filter((item) => includes("creative", item.tags), TEMPLATES_LIST)
    );

    expect(await page.getByTestId("template").count()).toBe(count);
  });
  test("Professional templates", async ({ page }) => {
    await page.getByTestId("template-filters-professional").click();

    const count = length(
      filter((item) => includes("professional", item.tags), TEMPLATES_LIST)
    );

    expect(await page.getByTestId("template").count()).toBe(count);
  });
  test("Use first template", async ({ page, context, baseURL }) => {
    await page.getByTestId("use-template-button").first().click();

    const resume = await utils.getResume({ context });

    await expect(page).toHaveURL(`${baseURL}/en/resumes/${resume.id}`);
  });
  test("Use last template", async ({ page, context, baseURL }) => {
    await page.getByTestId("use-template-button").last().click();

    const resume = await utils.getResume({ context });

    await expect(page).toHaveURL(`${baseURL}/en/resumes/${resume.id}`);
  });
});
