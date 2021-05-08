beforeEach(() => {
  cy.visit("/");
});

describe("Resumes", () => {
  it("create new resume", () => {
    cy.get("[data-cy=new_resume_btn]").click();

    cy.get("[data-cy=resume_name_input]")
      .type("Cypress resume")
      .should("have.value", "Cypress resume");

    cy.get("[data-cy=create_resume_btn]").click();

    cy.get("[data-cy=resumes_grid]").contains("Cypress resume");
  });
});
