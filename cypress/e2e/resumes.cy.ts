import resumes from "../fixtures/resumes.json";

import { Resume } from "../../types";

function getResume(index = 0): Resume {
  return JSON.parse(localStorage.getItem("resumes"))[index];
}

beforeEach(() => {
  cy.visit("/resumes");
});

describe("Resumes page", () => {
  it("Dark mode", () => {
    cy.get("[data-cy=header-more-options-menu-button]").click();
    cy.get("[data-cy=dark-mode-menu-item]")
      .click()
      .should(() => {
        expect(localStorage.getItem("chakra-ui-color-mode")).to.eq("dark");
      });
  });
  it("Start from scratch button", () => {
    cy.intercept({
      method: "GET",
      url: "**/resumes/**",
    }).as("getResume");
    cy.get("[data-cy=start-from-scratch]")
      .click()
      .should(() => {
        expect(JSON.parse(localStorage.getItem("resumes"))).to.be.a("array");
      });
    cy.get("[data-cy=resume]").should("have.length", 1);
    cy.wait("@getResume");
    cy.url().should("include", "/resumes/");
  });
  it("Quicky upload button", () => {
    cy.get("[data-cy=quickly-upload]").click();
    cy.get("[data-cy=import-data-modal-content]").should("exist");
  });
  it("Start with templates button", () => {
    cy.get("[data-cy=start-with-templates]").click();
    cy.url().should("eq", `${Cypress.config().baseUrl}/templates`);
  });
  it("Search | Not found", () => {
    localStorage.setItem("resumes", JSON.stringify(resumes));
    cy.get("[data-cy=search-input]").type("malcodeman");
    cy.contains("No resumes found");
  });
  it("Search | Found", () => {
    localStorage.setItem("resumes", JSON.stringify(resumes));
    cy.get("[data-cy=search-input]").type("Cypress");
    cy.get("[data-cy=resume]").should("have.length", 1);
  });
  it("List view", () => {
    localStorage.setItem("resumes", JSON.stringify(resumes));
    cy.get("[data-cy=list-view-icon-button]").click();
    cy.get("[data-cy=table-row]").should("have.length", 1);
  });
  it("Create resume button", () => {
    localStorage.setItem("resumes", JSON.stringify(resumes));
    cy.intercept({
      method: "GET",
      url: "**/resumes/**",
    }).as("getResume");
    cy.get("[data-cy=create-resume-button]")
      .click()
      .should(() =>
        expect(JSON.parse(localStorage.getItem("resumes"))).to.be.a("array")
      );
    cy.get("[data-cy=resume]").should("have.length", 2);
    cy.wait("@getResume");
    cy.url().should("include", "/resumes/");
  });
  it("Create resume button | Halloween", () => {
    localStorage.setItem("resumes", JSON.stringify(resumes));
    cy.clock(Date.UTC(2022, 9, 31), ["Date"]);
    cy.get("[data-cy=create-resume-button]")
      .click()
      .should(() => expect(getResume(1).icon).to.eq(":ghost:"));
  });
  it("Create resume button | New Year's Eve", () => {
    localStorage.setItem("resumes", JSON.stringify(resumes));
    cy.clock(Date.UTC(2022, 11, 31), ["Date"]);
    cy.get("[data-cy=create-resume-button]")
      .click()
      .should(() => expect(getResume(1).icon).to.eq(":fireworks:"));
  });
  it("Create resume button | New Year's Day", () => {
    localStorage.setItem("resumes", JSON.stringify(resumes));
    cy.clock(Date.UTC(2022, 0, 1), ["Date"]);
    cy.get("[data-cy=create-resume-button]")
      .click()
      .should(() => expect(getResume(1).icon).to.eq(":fireworks:"));
  });
  it("GitHub | Import", () => {
    localStorage.setItem("resumes", JSON.stringify(resumes));
    const username = "malcodeman";
    cy.intercept({
      method: "GET",
      url: `https://api.github.com/users/${username}`,
    }).as("getUser");
    cy.intercept({
      method: "GET",
      url: `https://api.github.com/users/${username}/repos`,
    }).as("getRepos");
    cy.intercept({
      method: "GET",
      url: "**/resumes/**",
    }).as("getResume");
    cy.get("[data-cy=import-icon-button]").click();
    cy.get("[data-cy=import-github]").click();
    cy.get("[data-cy=import-github-username]").type(username);
    cy.get("[data-cy=import-github-submit]")
      .click()
      .should(() => {
        expect(JSON.parse(localStorage.getItem("resumes"))).to.be.a("array");
      });
    cy.wait("@getUser");
    cy.wait("@getRepos");
    cy.get("[data-cy=resume]").should("have.length", 2);
    cy.wait("@getResume");
    cy.url().should("include", "/resumes/");
  });
  it("Paste data | Import", () => {
    localStorage.setItem("resumes", JSON.stringify(resumes));
    cy.intercept({
      method: "GET",
      url: "**/resumes/**",
    }).as("getResume");
    cy.get("[data-cy=import-icon-button]").click();
    cy.get("[data-cy=import-pasteData]").click();
    cy.get("[data-cy=data-textarea]").type(JSON.stringify(resumes[0]), {
      parseSpecialCharSequences: false,
    });
    cy.get("[data-cy=import-button]")
      .click()
      .should(() =>
        expect(JSON.parse(localStorage.getItem("resumes"))).to.be.a("array")
      );
    cy.get("[data-cy=resume]").should("have.length", 2);
    cy.wait("@getResume");
    cy.url().should("include", "/resumes/");
  });
  it("Change icon | Grid view", () => {
    localStorage.setItem("resumes", JSON.stringify(resumes));
    cy.get("[data-cy=emoji-picker-icon-button]").click();
    cy.get(".emoji-mart-emoji")
      .first()
      .click()
      .should(() => expect(getResume(0).icon).to.eq(":+1:"));
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
    cy.get("[data-cy=resume]").should("have.length", 2);
  });
  it("Duplicate resume | List view", () => {
    localStorage.setItem("resumes", JSON.stringify(resumes));
    cy.get("[data-cy=list-view-icon-button]").click();
    cy.get("[data-cy=resume-more-options-menu-button]").click();
    cy.get("[data-cy=duplicate-menu-item]").click();
    cy.get("[data-cy=table-row]").should("have.length", 2);
  });
  it("Copy resume link | Grid view", () => {
    localStorage.setItem("resumes", JSON.stringify(resumes));
    cy.get("[data-cy=resume-more-options-menu-button]").click({ force: true });
    cy.get("[data-cy=copy-link-menu-item]").should("exist");
  });
  it("Copy resume link | List view", () => {
    localStorage.setItem("resumes", JSON.stringify(resumes));
    cy.get("[data-cy=list-view-icon-button]").click();
    cy.get("[data-cy=resume-more-options-menu-button]").click();
    cy.get("[data-cy=copy-link-menu-item]").should("exist");
  });
  it("Delete resume | Grid view", () => {
    localStorage.setItem("resumes", JSON.stringify(resumes));
    cy.get("[data-cy=resume-more-options-menu-button]").click({ force: true });
    cy.get("[data-cy=delete-menu-item]").click();
    cy.get("[data-cy=delete-this-resume-button]").click();
    cy.contains("Resume deleted");
  });
  it("Delete resume | List view", () => {
    localStorage.setItem("resumes", JSON.stringify(resumes));
    cy.get("[data-cy=list-view-icon-button]").click();
    cy.get("[data-cy=resume-more-options-menu-button]").click();
    cy.get("[data-cy=delete-menu-item]").click({ force: true });
    cy.get("[data-cy=delete-this-resume-button]").click();
    cy.contains("Resume deleted");
  });
});

export {};
