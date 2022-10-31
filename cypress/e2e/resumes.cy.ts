import resumes from "../fixtures/resumes.json";

beforeEach(() => {
  cy.visit("/resumes");
});

describe("Resumes page", () => {
  it("German language", () => {
    cy.get("[data-cy=language-select]").select("de");
    cy.url().should("eq", `${Cypress.config().baseUrl}/de/resumes`);
  });
  it("Dark mode", () => {
    cy.get("[data-cy=header-more-options-menu-button]").click();
    cy.get("[data-cy=dark-mode-menu-item]")
      .click()
      .should(() => {
        expect(localStorage.getItem("chakra-ui-color-mode")).to.eq("dark");
      });
  });
  it("Start from scratch button", () => {
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
  it("Import from GitHub | Quicky upload", () => {
    cy.get("[data-cy=quickly-upload]").click();
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
  it("Search | Not found", () => {
    localStorage.setItem("resumes", JSON.stringify(resumes));
    cy.get("[data-cy=search-input]").type("malcodeman");
    cy.contains("No resumes found");
  });
  it("Search | Found", () => {
    localStorage.setItem("resumes", JSON.stringify(resumes));
    cy.get("[data-cy=search-input]").type("Cypress");
    cy.get("[data-cy=resumes-grid]").children().should("have.length", 1);
  });
  it("Create resume button", () => {
    localStorage.setItem("resumes", JSON.stringify(resumes));
    cy.get("[data-cy=create-resume-btn]")
      .click()
      .should(() => {
        expect(JSON.parse(localStorage.getItem("resumes"))).to.be.a("array");
      });
    cy.get("[data-cy=resumes-grid]").children().should("have.length", 2);
    cy.url().should("include", "/resumes/");
  });
  it("Rename resume | Grid view", () => {
    localStorage.setItem("resumes", JSON.stringify(resumes));
    cy.get("[data-cy=title-editable]").click();
    cy.get("[data-cy=title-input]")
      .type("malcodeman")
      .should("have.value", "malcodeman")
      .type("{enter}");
    cy.get("[data-cy=title-preview]").should("have.text", "malcodeman");
  });
  it("Rename resume from menu | Grid view", () => {
    localStorage.setItem("resumes", JSON.stringify(resumes));
    cy.get("[data-cy=resume-more-options-menu-button]").click({ force: true });
    cy.get("[data-cy=rename-menu-item]").click();
    cy.get("[data-cy=title-input]")
      .type("malcodeman")
      .should("have.value", "malcodeman")
      .type("{enter}");
    cy.get("[data-cy=title-preview]").should("have.text", "malcodeman");
  });
  it("Rename resume | List view", () => {
    localStorage.setItem("resumes", JSON.stringify(resumes));
    cy.get("[data-cy=list-view-icon-button]").click();
    cy.get("[data-cy=title-editable]").click();
    cy.get("[data-cy=title-input]")
      .type("malcodeman")
      .should("have.value", "malcodeman")
      .type("{enter}");
    cy.get("[data-cy=title-preview]").should("have.text", "malcodeman");
  });
  it("Duplicate resume | Grid view", () => {
    localStorage.setItem("resumes", JSON.stringify(resumes));
    cy.get("[data-cy=resume-more-options-menu-button]").click({ force: true });
    cy.get("[data-cy=duplicate-menu-item]").click();
    cy.get("[data-cy=resumes-grid]").children().should("have.length", 2);
  });
  it("Delete resume | Grid view", () => {
    localStorage.setItem("resumes", JSON.stringify(resumes));
    cy.get("[data-cy=resume-more-options-menu-button]").click({ force: true });
    cy.get("[data-cy=delete-menu-item]").click();
    cy.get("[data-cy=delete-this-resume-button]").click();
    cy.contains("Resume deleted");
  });
});

export {};
