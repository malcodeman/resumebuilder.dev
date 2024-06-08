import { test, expect } from "@playwright/test";
import { playwrightUtils } from "lib/playwrightUtils";

test.describe("Resumes page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/en/resumes");
  });
  test("Dark mode", async ({ page, context }) => {
    await page.getByTestId("header-more-options-menu-button").click();
    await page.getByTestId("dark-mode-menu-item").click();

    expect(
      await playwrightUtils.getLocalStorageItem({
        context,
        name: "chakra-ui-color-mode",
      })
    ).toBe("dark");
  });
  test("Start from scratch button", async ({ page, context, baseURL }) => {
    await page.getByTestId("start-from-scratch").click();

    const resume = await playwrightUtils.getResume({ context });

    expect(await page.getByTestId("resume").count()).toBe(1);

    await expect(page).toHaveURL(`${baseURL}/en/resumes/${resume.id}`);
  });
  test("Quicky upload button", async ({ page }) => {
    await page.getByTestId("quickly-upload").click();
    await expect(page.getByTestId("import-data-modal-content")).toBeVisible();
  });
  test("Start with templates button", async ({ page, baseURL }) => {
    await page.getByTestId("start-with-templates").click();

    await expect(page).toHaveURL(`${baseURL}/en/templates`);
  });
  test("Search | Not found", async ({ page }) => {
    await playwrightUtils.setResume({ page });

    const input = page.getByTestId("search-input").getByRole("textbox");
    const name = "malcodeman";

    await input.fill(name);
    await expect(input).toHaveValue(name);

    expect(await page.getByRole("main").textContent()).toContain(
      "No resumes found"
    );
  });
  test("Search | Found", async ({ page }) => {
    await playwrightUtils.setResume({ page, title: "Playwright" });

    const input = page.getByTestId("search-input").getByRole("textbox");
    const name = "Playwright";

    await input.fill(name);
    await expect(input).toHaveValue(name);

    expect(await page.getByTestId("resume").count()).toBe(1);
  });
  test("List view", async ({ page }) => {
    await playwrightUtils.setResume({ page });

    await page.getByTestId("list-view-icon-button").click();

    expect(await page.getByTestId("table-row").count()).toBe(1);
  });
  test("Create resume button", async ({ page, context, baseURL }) => {
    await playwrightUtils.setResume({ page });
    await page.getByTestId("create-resume-button").click();

    expect(await page.getByTestId("resume").count()).toBe(2);

    const resume = await playwrightUtils.getResume({ context });

    await expect(page).toHaveURL(`${baseURL}/en/resumes/${resume.id}`);
  });
  test("Create resume button | Halloween", async ({ page }) => {
    await playwrightUtils.setResume({ page });
    await page.getByTestId("create-resume-button").click();

    // const resume = await playwrightUtils.getResume({ context });

    // expect(resume.icon).toBe(":ghost:");
  });
  test("Create resume button | New Year's Eve", async ({ page }) => {
    await playwrightUtils.setResume({ page });
    await page.getByTestId("create-resume-button").click();

    // const resume = await playwrightUtils.getResume({ context });

    // expect(resume.icon).toBe(":fireworks:");
  });
  test("Create resume button | New Year's Day", async ({ page }) => {
    await playwrightUtils.setResume({ page });
    await page.getByTestId("create-resume-button").click();

    // const resume = await playwrightUtils.getResume({ context });

    // expect(resume.icon).toBe(":fireworks:");
  });
  test("GitHub | Import", async ({ page, context, baseURL }) => {
    await playwrightUtils.setResume({ page });
    await page.getByTestId("import-icon-button").click();
    await page.getByTestId("import-github").click();

    const input = page.getByTestId("import-github-username");
    const username = "malcodeman";

    await input.fill(username);
    await expect(input).toHaveValue(username);
    await page.getByTestId("import-github-submit").click();

    const response1 = await page.waitForResponse(
      `https://api.github.com/users/${username}`
    );
    const body1 = await response1.json();

    expect(body1.login).toBe(username);

    const response2 = await page.waitForResponse(
      `https://api.github.com/users/${username}/repos`
    );
    await response2.json();

    expect(await page.getByTestId("resume").count()).toBe(2);

    const resume = await playwrightUtils.getResume({ context });

    await expect(page).toHaveURL(`${baseURL}/en/resumes/${resume.id}`);
  });
  test("Paste data | Import", async ({ page, baseURL, context }) => {
    await playwrightUtils.setResume({ page });
    await page.getByTestId("import-icon-button").click();
    await page.getByTestId("import-pasteData").click();

    const input = page.getByTestId("data-textarea");
    const value = JSON.stringify(await playwrightUtils.generateFakeResume({}));

    await input.fill(value);
    await expect(input).toHaveValue(value);
    await page.getByTestId("import-button").click();

    expect(await page.getByTestId("resume").count()).toBe(2);

    const resume = await playwrightUtils.getResume({ context });

    await expect(page).toHaveURL(`${baseURL}/en/resumes/${resume.id}`);
  });
  test("Change icon | Grid view", async ({ page, context }) => {
    await playwrightUtils.setResume({ page });
    await page.getByTestId("emoji-picker-icon-button").click();
    await page.getByTestId("emoji").first().click();

    const resume = await playwrightUtils.getResume({ context });

    expect(resume.icon).toBe(":100:");
  });
  test("Change icon | List view", async ({ page, context }) => {
    await playwrightUtils.setResume({ page });
    await page.getByTestId("list-view-icon-button").click();
    await page.getByTestId("emoji-picker-icon-button").click();
    await page.getByTestId("emoji").first().click();

    const resume = await playwrightUtils.getResume({ context });

    expect(resume.icon).toBe(":100:");
  });
  test("Rename resume | Grid view", async ({ page }) => {
    await playwrightUtils.setResume({ page });
    await page.getByTestId("title-editable").click();

    const input = page.getByTestId("title-input");
    const name = "malcodeman";

    await input.fill(name);
    await expect(input).toHaveValue(name);
    await expect(page.getByTestId("title-preview")).toHaveText(name);
  });
  test("Rename resume from menu | Grid view", async ({ page }) => {
    await playwrightUtils.setResume({ page });
    await page.getByTestId("resume").hover();
    await page.getByTestId("resume-more-options-menu-button").click();
    await page.getByTestId("rename-menu-item").click();
    await page.getByTestId("title-editable").click();

    const input = page.getByTestId("title-input");
    const name = "malcodeman";

    await input.fill(name);
    await expect(input).toHaveValue(name);
    await expect(page.getByTestId("title-preview")).toHaveText(name);
  });
  test("Rename resume | List view", async ({ page }) => {
    await playwrightUtils.setResume({ page });
    await page.getByTestId("list-view-icon-button").click();
    await page.getByTestId("title-editable").click();

    const input = page.getByTestId("title-input");
    const name = "malcodeman";

    await input.fill(name);
    await expect(input).toHaveValue(name);
    await expect(page.getByTestId("title-preview")).toHaveText(name);
  });
  test("Duplicate resume | Grid view", async ({ page }) => {
    await playwrightUtils.setResume({ page });
    await page.getByTestId("resume").hover();
    await page.getByTestId("resume-more-options-menu-button").click();
    await page.getByTestId("duplicate-menu-item").click();

    expect(await page.getByTestId("resume").count()).toBe(2);
  });
  test("Duplicate resume | List view", async ({ page }) => {
    await playwrightUtils.setResume({ page });
    await page.getByTestId("list-view-icon-button").click();
    await page.getByTestId("resume-more-options-menu-button").click();
    await page.getByTestId("duplicate-menu-item").click();

    expect(await page.getByTestId("table-row").count()).toBe(2);
  });
  test("Copy resume link | Grid view", async ({ page }) => {
    await playwrightUtils.setResume({ page });
    await page.getByTestId("resume").hover();
    await page.getByTestId("resume-more-options-menu-button").click();
    await page.getByTestId("copy-link-menu-item").click();

    expect(await page.content()).toContain("Link copied");
  });
  test("Copy resume link | List view", async ({ page }) => {
    await playwrightUtils.setResume({ page });
    await page.getByTestId("list-view-icon-button").click();
    await page.getByTestId("resume-more-options-menu-button").click();
    await page.getByTestId("copy-link-menu-item").click();

    expect(await page.content()).toContain("Link copied");
  });
  test("Delete resume | Grid view", async ({ page }) => {
    await playwrightUtils.setResume({ page });
    await page.getByTestId("resume").hover();
    await page.getByTestId("resume-more-options-menu-button").click();
    await page.getByTestId("delete-menu-item").click();
    await page.getByTestId("delete-this-resume-button").click();

    expect(await page.content()).toContain("Resume delete");
  });
  test("Delete resume | List view", async ({ page }) => {
    await playwrightUtils.setResume({ page });
    await page.getByTestId("list-view-icon-button").click();
    await page.getByTestId("resume-more-options-menu-button").click();
    await page.getByTestId("delete-menu-item").click();
    await page.getByTestId("delete-this-resume-button").click();

    expect(await page.content()).toContain("Resume delete");
  });
});
