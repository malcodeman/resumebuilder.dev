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
  it("delete a resume", () => {
    cy.get("[data-cy=new_resume_btn]").click();

    cy.get("[data-cy=resume_name_input]")
      .type("Cypress resume")
      .should("have.value", "Cypress resume");

    cy.get("[data-cy=create_resume_btn]").click();

    cy.get("[data-cy=resumes_grid]").contains("Cypress resume");

    cy.get("[data-cy=resume_more_options_btn]").click();

    cy.get("[data-cy=delete_resume_btn]").click();

    cy.get("Cypress resume").should("not.exist");
  });
});
