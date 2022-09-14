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
});
