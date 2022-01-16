import { nanoid } from "nanoid";

import { DEFAULT_VALUES } from "../../lib/constants";

const TITLE = "Test resume";

beforeEach(() => {
  const resume = {
    ...DEFAULT_VALUES,
    id: nanoid(),
    title: TITLE,
  };
  cy.setLocalStorage("resumes", [resume]);
  cy.visit(`/resumes/${resume.id}`);
});

describe("Builder page", () => {
  it("Title", () => {
    cy.get("[data-cy=resume-title]").should("have.value", TITLE);
  });
});
