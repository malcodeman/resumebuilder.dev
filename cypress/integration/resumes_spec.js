beforeEach(() => {
  cy.visit("/resumes");
});

describe("Resumes page", () => {
  it("Start from scratch button", () => {
    expect(JSON.parse(localStorage.getItem("showDashboard"))).to.be.true;
    expect(localStorage.getItem("resumes")).to.be.null;
    cy.get("[data-cy=start-from-scratch]")
      .click()
      .should(() => {
        expect(JSON.parse(localStorage.getItem("resumes"))).to.be.a("array");
      });
    cy.get("[data-cy=resumes-grid]").children().should("have.length", 1);
  });
  it("Start with templates button", () => {
    cy.get("[data-cy=start-with-templates]").click();
    cy.url().should("eq", `${Cypress.config().baseUrl}/templates`);
  });
  it("Import from GitHub", () => {
    cy.get("[data-cy=import-button]").click();
    cy.get("[data-cy=import-github]").click();
    cy.get("[data-cy=import-github-username]").type("malcodeman");
    cy.get("[data-cy=import-github-submit]")
      .click()
      .should(() => {
        expect(JSON.parse(localStorage.getItem("resumes"))).to.be.a("array");
      });
    cy.get("[data-cy=resumes-grid]").children().should("have.length", 1);
    cy.url().should("include", "/resumes/");
  });
});
