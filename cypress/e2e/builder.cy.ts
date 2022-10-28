import { nanoid } from "nanoid";

import { DEFAULT_VALUES } from "../../lib/constants";

const TITLE = "Test resume";

beforeEach(() => {
  const resume = {
    ...DEFAULT_VALUES,
    id: nanoid(),
    title: TITLE,
  };
  const value = JSON.stringify([resume]);
  window.localStorage.setItem("resumes", value);
  cy.visit(`/resumes/${resume.id}`);
});

describe("Builder page", () => {
  it("Resume title", () => {
    cy.get("[data-cy=resume-title]").should("have.value", TITLE);
  });
  it("Page title", () => {
    cy.title().should("eq", `${TITLE} | resumebuilder.dev`);
  });
  it("Change slug", () => {
    cy.get("[data-cy=more-button]").click();
    cy.get("[data-cy=change-slug-button]").click();
    cy.get("[data-cy=slug-input]").clear().type("malcodeman");
    cy.get("[data-cy=change-button]").click();
    cy.contains("Slug changed");
    cy.url().should("eq", `${Cypress.config().baseUrl}/resumes/malcodeman`);
  });
  it("Full width", () => {
    cy.get("[data-cy=more-button]").click();
    cy.get("[data-cy=full-width-switch]")
      .click()
      .should(() => {
        expect(localStorage.getItem("is-full-width")).to.eq("true");
      });
  });
  it("Dark mode", () => {
    cy.get("[data-cy=more-button]").click();
    cy.get("[data-cy=dark-mode-switch]")
      .click()
      .should(() => {
        expect(localStorage.getItem("chakra-ui-color-mode")).to.eq("dark");
      });
  });
  it("PDF viewer", () => {
    cy.get("[data-cy=more-button]").click();
    cy.get("[data-cy=pdf-viewer-switch]")
      .click()
      .should(() => {
        expect(localStorage.getItem("is-pdf-viewer")).to.eq("true");
      });
  });
  it("Dev tools", () => {
    cy.get("[data-cy=more-button]").click();
    cy.get("[data-cy=dev-tools-switch]")
      .click()
      .should(() => {
        expect(localStorage.getItem("dev-tools")).to.eq("true");
      });
  });
});
