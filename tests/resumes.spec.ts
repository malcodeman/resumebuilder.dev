import { test, expect } from "@playwright/test";
import utils from "e2e/utils";

test.describe("Resumes page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/en/resumes");
  });
  test("Dark mode", async ({ page, context }) => {
    await page.getByTestId("header-more-options-menu-button").click();
    await page.getByTestId("dark-mode-menu-item").click();

    expect(
      await utils.getLocalStorageItem({ context, name: "chakra-ui-color-mode" })
    ).toBe("dark");
  });
  test("Start from scratch button", async ({ page, context, baseURL }) => {
    await page.getByTestId("start-from-scratch").click();

    const resume = await utils.getResume({ context });

    expect(await page.getByTestId("resume").count()).toBe(1);

    await expect(page).toHaveURL(`${baseURL}/en/resumes/${resume.id}`);
  });
  test("Quicky upload button", async ({ page }) => {
    await page.getByTestId("quickly-upload").click();

    expect(page.getByTestId("import-data-modal-content")).toBeVisible();
  });
  test("Start with templates button", async ({ page, baseURL }) => {
    await page.getByTestId("start-with-templates").click();

    await expect(page).toHaveURL(`${baseURL}/en/templates`);
  });
  test("Search | Not found", async ({ page }) => {
    await utils.setResume({ page });

    const input = page.getByTestId("search-input").getByRole("textbox");
    const name = "malcodeman";

    await input.fill(name);
    await expect(input).toHaveValue(name);

    expect(await page.getByRole("main").textContent()).toContain(
      "No resumes found"
    );
  });
  test("Search | Found", async ({ page }) => {
    await utils.setResume({ page, title: "Playwright" });

    const input = page.getByTestId("search-input").getByRole("textbox");
    const name = "Playwright";

    await input.fill(name);
    await expect(input).toHaveValue(name);

    expect(await page.getByTestId("resume").count()).toBe(1);
  });
  test("List view", async ({ page }) => {
    await utils.setResume({ page });

    await page.getByTestId("list-view-icon-button").click();

    expect(await page.getByTestId("table-row").count()).toBe(1);
  });
  test("Create resume button", async ({ page, context, baseURL }) => {
    await utils.setResume({ page });
    await page.getByTestId("create-resume-button").click();

    expect(await page.getByTestId("resume").count()).toBe(2);

    const resume = await utils.getResume({ context });

    await expect(page).toHaveURL(`${baseURL}/en/resumes/${resume.id}`);
  });
  test("Create resume button | Halloween", async ({ page, context }) => {
    await utils.setResume({ page });
    await page.getByTestId("create-resume-button").click();

    const resume = await utils.getResume({ context });

    // expect(resume.icon).toBe(":ghost:");
  });
  test("Create resume button | New Year's Eve", async ({ page, context }) => {
    await utils.setResume({ page });
    await page.getByTestId("create-resume-button").click();

    const resume = await utils.getResume({ context });

    // expect(resume.icon).toBe(":fireworks:");
  });
  test("Create resume button | New Year's Day", async ({ page, context }) => {
    await utils.setResume({ page });
    await page.getByTestId("create-resume-button").click();

    const resume = await utils.getResume({ context });

    // expect(resume.icon).toBe(":fireworks:");
  });
  test("GitHub | Import", async ({ page, context, baseURL }) => {
    await utils.setResume({ page });
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

    const resume = await utils.getResume({ context });

    await expect(page).toHaveURL(`${baseURL}/en/resumes/${resume.id}`);
  });

  //   it("Paste data | Import", () => {
  //     localStorage.setItem("resumes", JSON.stringify(resumes));
  //     cy.intercept({
  //       method: "GET",
  //       url: "**/resumes/**",
  //     }).as("getResume");
  //     cy.get("[data-testid=import-icon-button]").click();
  //     cy.get("[data-testid=import-pasteData]").click();
  //     cy.get("[data-testid=data-textarea]").type(JSON.stringify(resumes[0]), {
  //       parseSpecialCharSequences: false,
  //     });
  //     cy.get("[data-testid=import-button]")
  //       .click()
  //       .should(() =>
  //         expect(JSON.parse(localStorage.getItem("resumes"))).to.be.a("array")
  //       );
  //     cy.get("[data-testid=resume]").should("have.length", 2);
  //     cy.wait("@getResume");
  //     cy.url().should("include", "/resumes/");
  //   });
  //   it("Change icon | Grid view", () => {
  //     localStorage.setItem("resumes", JSON.stringify(resumes));
  //     cy.get("[data-testid=emoji-picker-icon-button]").click();
  //     cy.get(".emoji-mart-emoji")
  //       .first()
  //       .click()
  //       .should(() => expect(getResume(0).icon).to.eq(":+1:"));
  //   });
  //   it("Change icon | List view", () => {
  //     localStorage.setItem("resumes", JSON.stringify(resumes));
  //     cy.get("[data-testid=list-view-icon-button]").click();
  //     cy.get("[data-testid=emoji-picker-icon-button]").click();
  //     cy.get(".emoji-mart-emoji")
  //       .first()
  //       .click({ force: true })
  //       .should(() => expect(getResume(0).icon).to.eq(":+1:"));
  //   });
  //   it("Rename resume | Grid view", () => {
  //     localStorage.setItem("resumes", JSON.stringify(resumes));
  //     cy.get("[data-testid=title-editable]").click();
  //     cy.get("[data-testid=title-input]")
  //       .type("malcodeman")
  //       .should("have.value", "malcodeman")
  //       .type("{enter}");
  //     cy.get("[data-testid=title-preview]").should("have.text", "malcodeman");
  //   });
  //   it("Rename resume from menu | Grid view", () => {
  //     localStorage.setItem("resumes", JSON.stringify(resumes));
  //     cy.get("[data-testid=resume-more-options-menu-button]").click({
  //       force: true,
  //     });
  //     cy.get("[data-testid=rename-menu-item]").click();
  //     cy.get("[data-testid=title-input]")
  //       .type("malcodeman")
  //       .should("have.value", "malcodeman")
  //       .type("{enter}");
  //     cy.get("[data-testid=title-preview]").should("have.text", "malcodeman");
  //   });
  //   it("Rename resume | List view", () => {
  //     localStorage.setItem("resumes", JSON.stringify(resumes));
  //     cy.get("[data-testid=list-view-icon-button]").click();
  //     cy.get("[data-testid=title-editable]").click();
  //     cy.get("[data-testid=title-input]")
  //       .type("malcodeman")
  //       .should("have.value", "malcodeman")
  //       .type("{enter}");
  //     cy.get("[data-testid=title-preview]").should("have.text", "malcodeman");
  //   });
  //   it("Duplicate resume | Grid view", () => {
  //     localStorage.setItem("resumes", JSON.stringify(resumes));
  //     cy.get("[data-testid=resume-more-options-menu-button]").click({
  //       force: true,
  //     });
  //     cy.get("[data-testid=duplicate-menu-item]").click();
  //     cy.get("[data-testid=resume]").should("have.length", 2);
  //   });
  //   it("Duplicate resume | List view", () => {
  //     localStorage.setItem("resumes", JSON.stringify(resumes));
  //     cy.get("[data-testid=list-view-icon-button]").click();
  //     cy.get("[data-testid=resume-more-options-menu-button]").click();
  //     cy.get("[data-testid=duplicate-menu-item]").click();
  //     cy.get("[data-testid=table-row]").should("have.length", 2);
  //   });
  //   it("Copy resume link | Grid view", () => {
  //     localStorage.setItem("resumes", JSON.stringify(resumes));
  //     cy.get("[data-testid=resume-more-options-menu-button]").click({
  //       force: true,
  //     });
  //     cy.get("[data-testid=copy-link-menu-item]").should("exist");
  //   });
  //   it("Copy resume link | List view", () => {
  //     localStorage.setItem("resumes", JSON.stringify(resumes));
  //     cy.get("[data-testid=list-view-icon-button]").click();
  //     cy.get("[data-testid=resume-more-options-menu-button]").click();
  //     cy.get("[data-testid=copy-link-menu-item]").should("exist");
  //   });
  //   it("Delete resume | Grid view", () => {
  //     localStorage.setItem("resumes", JSON.stringify(resumes));
  //     cy.get("[data-testid=resume-more-options-menu-button]").click({
  //       force: true,
  //     });
  //     cy.get("[data-testid=delete-menu-item]").click();
  //     cy.get("[data-testid=delete-this-resume-button]").click();
  //     cy.contains("Resume deleted");
  //   });
  //   it("Delete resume | List view", () => {
  //     localStorage.setItem("resumes", JSON.stringify(resumes));
  //     cy.get("[data-testid=list-view-icon-button]").click();
  //     cy.get("[data-testid=resume-more-options-menu-button]").click();
  //     cy.get("[data-testid=delete-menu-item]").click({ force: true });
  //     cy.get("[data-testid=delete-this-resume-button]").click();
  //     cy.contains("Resume deleted");
  //   });
});
