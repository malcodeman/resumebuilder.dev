import { filter, includes, length } from "ramda";

import { TEMPLATES_LIST } from "../../src/lib/constants";

beforeEach(() => {
  cy.visit("/templates");
});

describe("Templates page", () => {
  it("Search | Not found", () => {
    cy.get("[data-cy=search-input]").type("malcodeman");
    cy.contains("No templates found");
  });
  it("Search | Found", () => {
    cy.get("[data-cy=search-input]").type("London");
    cy.get("[data-cy=templates-grid]").children().should("have.length", 1);
  });
  it("All templates", () => {
    cy.get(`[data-cy=template-filters-all]`).click();
    const count = length(
      filter((item) => includes("all", item.tags), TEMPLATES_LIST)
    );
    cy.get("[data-cy=templates-grid]").children().should("have.length", count);
  });
  it("Simple templates", () => {
    cy.get(`[data-cy=template-filters-simple]`).click();
    const count = length(
      filter((item) => includes("simple", item.tags), TEMPLATES_LIST)
    );
    cy.get("[data-cy=templates-grid]").children().should("have.length", count);
  });
  it("Creative templates", () => {
    cy.get(`[data-cy=template-filters-creative]`).click();
    const count = length(
      filter((item) => includes("creative", item.tags), TEMPLATES_LIST)
    );
    cy.get("[data-cy=templates-grid]").children().should("have.length", count);
  });
  it("Professional templates", () => {
    cy.get(`[data-cy=template-filters-professional]`).click();
    const count = length(
      filter((item) => includes("professional", item.tags), TEMPLATES_LIST)
    );
    cy.get("[data-cy=templates-grid]").children().should("have.length", count);
  });
  it("Use first template", () => {
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
  it("Use last template", () => {
    cy.intercept({
      method: "GET",
      url: "**/resumes/**",
    }).as("getResume");
    cy.get("[data-cy=use-template-button]")
      .last()
      .click()
      .should(() => {
        expect(JSON.parse(localStorage.getItem("resumes"))).to.be.a("array");
      });
    cy.wait("@getResume");
    cy.url().should("include", "/resumes/");
  });
});
