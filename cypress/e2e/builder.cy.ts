import resumes from "../fixtures/resumes.json";

import { Resume } from "../../types";

function getResume(): Resume {
  return JSON.parse(localStorage.getItem("resumes"))[0];
}

beforeEach(() => {
  localStorage.setItem("resumes", JSON.stringify(resumes));
  cy.visit(`/resumes/${resumes[0].id}`);
});

describe("Builder page", () => {
  it("Page title", () => {
    cy.title().should("eq", `${resumes[0].title} | resumebuilder.dev`);
  });
  it("Go home", () => {
    cy.get("[data-cy=resumebuilder-text]").click();
    cy.url().should("eq", `${Cypress.config().baseUrl}/resumes`);
  });
  it("Rename resume", () => {
    cy.get("[data-cy=title-editable]").click();
    cy.get("[data-cy=title-input]")
      .type("malcodeman")
      .should("have.value", "malcodeman")
      .type("{enter}")
      .should(() => expect(getResume().title).to.eq("malcodeman"));
    cy.get("[data-cy=title-preview]").should("have.text", "malcodeman");
  });
  it("Change template", () => {
    // TODO: Improve
    cy.get("[data-cy=header-templates-button]").click();
  });
  it("Export PDF", () => {
    cy.get("[data-cy=header-export-pdf-button]").should("exist");
  });
  it("Full width", () => {
    cy.get("[data-cy=more-button]").click();
    cy.get("[data-cy=full-width-switch]")
      .click()
      .should(() =>
        expect(localStorage.getItem("is-full-width")).to.eq("true")
      );
  });
  it("Dark mode", () => {
    cy.get("[data-cy=more-button]").click();
    cy.get("[data-cy=dark-mode-switch]")
      .click()
      .should(() =>
        expect(localStorage.getItem("chakra-ui-color-mode")).to.eq("dark")
      );
  });
  it("PDF viewer", () => {
    cy.get("[data-cy=more-button]").click();
    cy.get("[data-cy=pdf-viewer-switch]")
      .click()
      .should(() =>
        expect(localStorage.getItem("is-pdf-viewer")).to.eq("true")
      );
  });
  it("Dev tools", () => {
    cy.get("[data-cy=more-button]").click();
    cy.get("[data-cy=dev-tools-switch]")
      .click()
      .should(() => expect(localStorage.getItem("dev-tools")).to.eq("true"));
  });
  it("German language", () => {
    cy.intercept({
      method: "GET",
      url: "**/de/resumes/**",
    }).as("getGermanLanguage");
    cy.get("[data-cy=more-button]").click();
    cy.get("[data-cy=language-select]").select("de");
    cy.wait("@getGermanLanguage");
    cy.url().should(
      "eq",
      `${Cypress.config().baseUrl}/de/resumes/${resumes[0].id}`
    );
  });
  it("Template gallery", () => {
    cy.get("[data-cy=more-button]").click();
    cy.get("[data-cy=templates-button]").click();
    cy.get("[data-cy=templates-modal-content]").should("exist");
  });
  it("Duplicate resume", () => {
    // TODO: Improve
    cy.get("[data-cy=more-button]").click();
    cy.get("[data-cy=duplicate-button]").click();
    cy.contains("Resume duplicated");
  });
  it("Copy link", () => {
    cy.get("[data-cy=more-button]").click();
    cy.get("[data-cy=copy-link-button]").should("exist");
  });
  it("Change slug", () => {
    // TODO: Improve
    cy.get("[data-cy=more-button]").click();
    cy.get("[data-cy=change-slug-button]").click();
    cy.get("[data-cy=slug-input]").clear().type("malcodeman");
    cy.get("[data-cy=change-button]").click();
    cy.contains("Slug changed");
    cy.url().should("eq", `${Cypress.config().baseUrl}/resumes/malcodeman`);
  });
  it("Generate fake data | Hidden", () => {
    cy.get("[data-cy=more-button]").click();
    cy.get("[data-cy=generate-fake-data-button]").should("not.exist");
  });
  it("Generate fake data | Visible", () => {
    localStorage.setItem("dev-tools", "true");
    cy.get("[data-cy=more-button]").click();
    cy.get("[data-cy=generate-fake-data-button]").should("exist");
  });
  it("Delete", () => {
    cy.get("[data-cy=more-button]").click();
    cy.get("[data-cy=delete-button]").click();
    cy.get("[data-cy=delete-this-resume-button]")
      .click()
      .should(() =>
        expect(JSON.parse(localStorage.getItem("resumes"))).to.have.length(0)
      );
    cy.contains("Resume deleted");
    cy.url().should("eq", `${Cypress.config().baseUrl}/resumes`);
  });
  it("Import data", () => {
    cy.get("[data-cy=more-button]").click();
    cy.get("[data-cy=import-button]").click();
    cy.get("[data-cy=import-data-modal-content]").should("exist");
  });
  it("Export", () => {
    cy.get("[data-cy=more-button]").click();
    cy.get("[data-cy=export-button]").click();
    cy.get("[data-cy=export-modal-content]").should("exist");
  });
});
