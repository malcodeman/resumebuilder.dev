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
});
