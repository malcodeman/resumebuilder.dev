beforeEach(() => {
  cy.visit("/");
});

describe("Landing page", () => {
  it("German language", () => {
    cy.get("[data-cy=language-select]").select("de");
    cy.url().should("eq", `${Cypress.config().baseUrl}/de`);
  });
  it("Header dashboard button", () => {
    cy.get("[data-cy=dashboard-button]")
      .click()
      .should(() => {
        expect(JSON.parse(localStorage.getItem("view-dashboard"))).to.be.true;
      });
    cy.url().should("eq", `${Cypress.config().baseUrl}/resumes`);
  });
  it("Build resume button", () => {
    cy.intercept({
      method: "GET",
      url: "**/resumes/**",
    }).as("getResume");
    cy.get("[data-cy=build-resume-button]")
      .click()
      .should(() => {
        expect(JSON.parse(localStorage.getItem("resumes"))).to.be.a("array");
      });
    cy.wait("@getResume");
    cy.url().should("include", "/resumes/");
  });
  it("See all templates button", () => {
    cy.get("[data-cy=see-all-templates-button]").click();
    cy.url().should("eq", `${Cypress.config().baseUrl}/templates`);
  });
  it("Use berlin template", () => {
    cy.intercept({
      method: "GET",
      url: "**/resumes/**",
    }).as("getResume");
    cy.get("[data-cy=use-template-button]")
      .first()
      .click()
      .should(() => {
        expect(JSON.parse(localStorage.getItem("resumes"))).to.be.a("array");
      });
    cy.wait("@getResume");
    cy.url().should("include", "/resumes/");
  });
  it("Build for free button", () => {
    cy.intercept({
      method: "GET",
      url: "**/resumes/**",
    }).as("getResume");
    cy.get("[data-cy=build-for-free-button]")
      .click()
      .should(() => {
        expect(JSON.parse(localStorage.getItem("resumes"))).to.be.a("array");
      });
    cy.wait("@getResume");
    cy.url().should("include", "/resumes/");
  });
});

export {};
