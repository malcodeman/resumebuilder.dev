import { faker } from "@faker-js/faker";
import { test, expect } from "@playwright/test";
import utils from "e2e/utils";
import libUtils from "lib/utils";

test.describe("Builder page", () => {
  test.beforeEach(async ({ page, context, baseURL }) => {
    await page.goto("/en/resumes/new");
    await expect(page.getByTestId("spinner")).toBeVisible();

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

    await expect(page.getByTestId("title-preview")).toHaveText(name);
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
    await expect(page.getByTestId("generate-fake-data-button")).toBeVisible();
  });
  test("German language", async ({ page, context, baseURL }) => {
    await page.getByTestId("more-button").click();
    await page.getByTestId("language-select").selectOption("de");

    const resume = await utils.getResume({ context });

    await expect(page).toHaveURL(`${baseURL}/de/resumes/${resume.id}`);
  });
  test("Duplicate resume", async ({ page }) => {
    await page.getByTestId("more-button").click();
    await page.getByTestId("duplicate-button").click();

    expect(await page.content()).toContain("Resume duplicated");
  });
  test("Copy link", async ({ page }) => {
    await page.getByTestId("more-button").click();

    const button = page.getByTestId("copy-link-button");

    expect(await button.textContent()).toBe("Copy link");

    await button.click();

    expect(await button.textContent()).toBe("Copied");
  });
  test("Change slug", async ({ page, baseURL }) => {
    await page.getByTestId("more-button").click();
    await page.getByTestId("change-slug-button").click();

    const input = page.getByTestId("slug-input");
    const name = "malcodeman";

    await input.fill(name);
    await expect(input).toHaveValue(name);
    await page.getByTestId("change-button").click();
    await expect(page).toHaveURL(`${baseURL}/en/resumes/${name}`);
  });
  test("Delete", async ({ page, baseURL }) => {
    await page.getByTestId("more-button").click();
    await page.getByTestId("delete-button").click();
    await page.getByTestId("delete-this-resume-button").click();

    expect(await page.content()).toContain("Resume deleted");

    await expect(page).toHaveURL(`${baseURL}/en/resumes`);
  });
  test("Import data", async ({ page }) => {
    await page.getByTestId("more-button").click();
    await page.getByTestId("import-button").click();
    await expect(page.getByTestId("import-data-modal-content")).toBeVisible();
  });
  test("Export", async ({ page }) => {
    await page.getByTestId("more-button").click();
    await page.getByTestId("export-button").click();
    await expect(page.getByTestId("export-resume-modal-content")).toBeVisible();
  });
  test("Profile picture | Add", async ({ page }) => {
    await page.getByTestId("add-profile-picture-button").click();
    await expect(
      page.getByTestId("add-profile-picture-modal-content")
    ).toBeVisible();
  });
  test("About", async ({ page }) => {
    const title = faker.name.jobTitle();
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email(firstName, lastName);
    const phone = faker.phone.number();
    const website = faker.internet.url();
    const city = faker.address.city();
    const country = faker.address.country();
    const summary = faker.random.words();

    await page.getByTestId("about-title-input").fill(title);

    expect(await page.getByTestId("document").textContent()).toContain(title);

    await page.getByTestId("about-first-name-input").fill(firstName);

    expect(await page.getByTestId("document").textContent()).toContain(
      firstName
    );

    await page.getByTestId("about-last-name-input").fill(lastName);

    expect(await page.getByTestId("document").textContent()).toContain(
      lastName
    );

    await page.getByTestId("about-email-input").fill(email);

    expect(await page.getByTestId("document").textContent()).toContain(email);

    await page.getByTestId("about-phone-input").fill(phone);

    expect(await page.getByTestId("document").textContent()).toContain(phone);

    await page.getByTestId("about-website-input").fill(website);

    expect(await page.getByTestId("document").textContent()).toContain(
      libUtils.parseWebsite(website)
    );

    await page.getByTestId("about-city-input").fill(city);

    expect(await page.getByTestId("document").textContent()).toContain(city);

    await page.getByTestId("about-country-input").fill(country);

    expect(await page.getByTestId("document").textContent()).toContain(country);

    await page.getByTestId("about-summary-textarea").fill(summary);

    expect(await page.getByTestId("document").textContent()).toContain(summary);
  });
  test("Summary pre-written phrases search | Not found", async ({ page }) => {
    await page.getByTestId("add-pre-written-phrases-form-helper-text").click();

    const input = page.getByTestId("search-input").getByRole("textbox");
    const phrase = "malcodeman";

    await input.fill(phrase);
    await expect(input).toHaveValue(phrase);

    expect(
      await page.getByTestId("pre-written-phrases-modal-content").textContent()
    ).toContain("No phrases found");
  });
  test("Summary pre-written phrases | React", async ({ page }) => {
    await page.getByTestId("add-pre-written-phrases-form-helper-text").click();

    const input = page.getByTestId("search-input").getByRole("textbox");
    const phrase = "React";

    await input.fill(phrase);
    await expect(input).toHaveValue(phrase);
    await page.getByTestId("phrases-stack").click();

    expect(await page.getByTestId("document").textContent()).toContain(
      "Proficient in an assortment of technologies, including React, React Native and Node."
    );
  });
  test("Employment history", async ({ page }) => {
    const title = faker.company.name();
    const subtitle = faker.name.jobTitle();
    const website = faker.internet.url();
    const city = faker.address.city();
    const startDate = faker.date.past().toDateString();
    const endDate = "Current";
    const description = faker.random.words();

    await page.getByTestId("section-label-accordion-button").nth(0).click();
    await page.getByTestId("section-label-accordion-button").nth(1).click();
    await page.getByTestId("section-label-accordion-button").nth(2).click();
    await page.getByTestId("section-nested-title-input").fill(title);

    expect(await page.getByTestId("document").textContent()).toContain(title);

    await page.getByTestId("section-nested-subtitle-input").fill(subtitle);

    expect(await page.getByTestId("document").textContent()).toContain(
      subtitle
    );

    await page.getByTestId("section-nested-website-input").fill(website);
    await page.getByTestId("section-nested-city-input").fill(city);

    expect(await page.getByTestId("document").textContent()).toContain(city);

    await page.getByTestId("section-nested-start-date-input").fill(startDate);

    expect(await page.getByTestId("document").textContent()).toContain(
      startDate
    );

    await page.getByTestId("section-nested-end-date-input").fill(endDate);

    expect(await page.getByTestId("document").textContent()).toContain(endDate);

    await page
      .getByTestId("section-nested-description-textarea")
      .fill(description);

    expect(await page.getByTestId("document").textContent()).toContain(
      description
    );
  });
  test("Suggested tags | Skills", async ({ page }) => {
    await page.getByTestId("section-label-accordion-button").nth(0).click();
    await page.getByTestId("section-label-accordion-button").nth(3).click();
    await page.getByTestId("suggested-tags-wrap-item").nth(0).click();

    expect(await page.getByTestId("document").textContent()).toContain("React");

    await page.getByTestId("suggested-tags-wrap-item").nth(0).click();

    expect(await page.getByTestId("document").textContent()).toContain(
      "Next.js"
    );
  });
});
