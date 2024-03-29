beforeEach(() => {
  cy.visit("/");
});

describe("Landing page", () => {
  it("Templates page", () => {
    cy.get("[data-testid=templates-text]").click();
    cy.url().should("eq", `${Cypress.config().baseUrl}/en/templates`);
  });
  it("Bosnian language", () => {
    cy.get("[data-testid=language-select]").select("bs");
    cy.url().should("eq", `${Cypress.config().baseUrl}/bs`);
  });
  it("German language", () => {
    cy.get("[data-testid=language-select]").select("de");
    cy.url().should("eq", `${Cypress.config().baseUrl}/de`);
  });
  it("Header dashboard button", () => {
    cy.get("[data-testid=dashboard-button]")
      .click()
      .should(() => {
        expect(JSON.parse(localStorage.getItem("view-dashboard"))).to.be.true;
      });
    cy.url().should("eq", `${Cypress.config().baseUrl}/en/resumes`);
  });
  it("Build for free top button", () => {
    cy.intercept({
      method: "GET",
      url: "**/resumes/**",
    }).as("getResume");
    cy.get("[data-testid=build-for-free-top-button]")
      .click()
      .should(() => {
        expect(JSON.parse(localStorage.getItem("resumes"))).to.be.a("array");
      });
    cy.wait("@getResume");
    cy.url().should("include", "/resumes/");
  });
  it("See all templates button", () => {
    cy.wait(100);
    cy.get("[data-testid=see-all-templates-button]").click();
    cy.url().should("eq", `${Cypress.config().baseUrl}/en/templates`);
  });
  it("Use berlin template", () => {
    cy.intercept({
      method: "GET",
      url: "**/resumes/**",
    }).as("getResume");
    cy.get("[data-testid=use-template-button]")
      .first()
      .click()
      .should(() => {
        expect(JSON.parse(localStorage.getItem("resumes"))).to.be.a("array");
      });
    cy.wait("@getResume");
    cy.url().should("include", "/resumes/");
  });
  it("FAQ", () => {
    cy.get("[data-testid=accordion-button]").click({ multiple: true });
    cy.get("[data-testid=accordion-panel]").should("have.length", 6);
  });
  it("Build for free bottom button", () => {
    cy.intercept({
      method: "GET",
      url: "**/resumes/**",
    }).as("getResume");
    cy.get("[data-testid=build-for-free-bottom-button]")
      .click()
      .should(() => {
        expect(JSON.parse(localStorage.getItem("resumes"))).to.be.a("array");
      });
    cy.wait("@getResume");
    cy.url().should("include", "/resumes/");
  });
});

export {};
