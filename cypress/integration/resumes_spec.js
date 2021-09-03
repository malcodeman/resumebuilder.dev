beforeEach(() => {
  cy.visit("/");
});

describe("Resumes", () => {
  it("create new resume", () => {
    cy.get("[data-cy=new_resume_btn]").click();

    cy.get("[data-cy=resume_title_input]")
      .type("Cypress resume")
      .should("have.value", "Cypress resume");

    cy.get("[data-cy=create_resume_btn]").click();

    cy.get("[data-cy=resumes_grid]").contains("Cypress resume");
  });
  it("delete a resume", () => {
    cy.get("[data-cy=new_resume_btn]").click();

    cy.get("[data-cy=resume_title_input]")
      .type("Cypress resume")
      .should("have.value", "Cypress resume");

    cy.get("[data-cy=create_resume_btn]").click();

    cy.get("[data-cy=resumes_grid]").contains("Cypress resume");

    cy.get("[data-cy=resume_more_options_btn]").click();

    cy.get("[data-cy=delete_resume_btn]").click();

    cy.get("Cypress resume").should("not.exist");
  });
  it("duplicate a resume", () => {
    cy.get("[data-cy=new_resume_btn]").click();

    cy.get("[data-cy=resume_title_input]")
      .type("Cypress resume")
      .should("have.value", "Cypress resume");

    cy.get("[data-cy=create_resume_btn]").click();

    cy.get("[data-cy=resumes_grid]").contains("Cypress resume");

    cy.get("[data-cy=resume_more_options_btn]").click();

    cy.get("[data-cy=duplicate_resume_btn]").click();

    cy.get("[data-cy=resumes_grid]").children().should("have.length", 2);
  });
});
