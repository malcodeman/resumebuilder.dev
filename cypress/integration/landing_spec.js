beforeEach(() => {
  cy.visit("/");
});

describe("Landing page", () => {
  it("Build resume button", () => {
    cy.get("[data-cy=build-resume-button]")
      .click()
      .should(() => {
        expect(JSON.parse(localStorage.getItem("resumes"))).to.be.a("array");
        expect(JSON.parse(localStorage.getItem("showDashboard"))).to.be.true;
      });
    cy.url().should("include", "/resumes/");
  });
  it("See all templates button", () => {
    cy.get("[data-cy=see-all-templates]").click();
    cy.url().should("eq", `${Cypress.config().baseUrl}/templates`);
  });
  it("Build for free button", () => {
    cy.get("[data-cy=build-for-free]")
      .click()
      .should(() => {
        expect(JSON.parse(localStorage.getItem("resumes"))).to.be.a("array");
        expect(JSON.parse(localStorage.getItem("showDashboard"))).to.be.true;
      });
    cy.url().should("include", "/resumes/");
  });
});
