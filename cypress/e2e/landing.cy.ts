beforeEach(() => {
  cy.visit("/");
});

describe("Landing page", () => {
  it("Header dashboard button", () => {
    cy.get("[data-cy=dashboard-button]")
      .click()
      .should(() => {
        expect(JSON.parse(localStorage.getItem("view-dashboard"))).to.be.true;
      });
    cy.url().should("eq", `${Cypress.config().baseUrl}/resumes`);
  });
  it("Build resume button", () => {
    cy.get("[data-cy=build-resume-button]")
      .click()
      .should(() => {
        expect(JSON.parse(localStorage.getItem("resumes"))).to.be.a("array");
        expect(JSON.parse(localStorage.getItem("view-dashboard"))).to.be.true;
      });
    cy.url().should("include", "/resumes/");
  });
  it("See all templates button", () => {
    cy.get("[data-cy=see-all-templates-button]").click();
    cy.url().should("eq", `${Cypress.config().baseUrl}/templates`);
  });
  it("Use berlin template", () => {
    cy.get("[data-cy=use-template-button]")
      .first()
      .click()
      .should(() => {
        expect(JSON.parse(localStorage.getItem("resumes"))).to.be.a("array");
      });
  });
  it("Build for free button", () => {
    cy.get("[data-cy=build-for-free-button]")
      .click()
      .should(() => {
        expect(JSON.parse(localStorage.getItem("resumes"))).to.be.a("array");
        expect(JSON.parse(localStorage.getItem("view-dashboard"))).to.be.true;
      });
    cy.url().should("include", "/resumes/");
  });
});

export {};
