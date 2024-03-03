import { faker } from "@faker-js/faker";

import resumes from "../fixtures/resumes.json";

import phrases from "../../src/lib/phrases";
import tags from "../../src/lib/tags";

import { Resume } from "../../src/types";

function getResume(): Resume {
  return JSON.parse(localStorage.getItem("resumes"))[0];
}

beforeEach(() => {
  localStorage.setItem("resumes", JSON.stringify(resumes));
  cy.visit(`/en/resumes/${resumes[0].id}`);
});

describe("Builder page", () => {
  it("Page title", () => {
    cy.title().should("eq", `${resumes[0].title} | resumebuilder.dev`);
  });
  it("Go home", () => {
    cy.get("[data-cy=resumebuilder-text]").click();
    cy.url().should("eq", `${Cypress.config().baseUrl}/en/resumes`);
  });
  it("Change icon", () => {
    cy.get("[data-cy=emoji-picker-icon-button]").click();
    cy.get(".emoji-mart-emoji")
      .first()
      .click()
      .should(() => expect(getResume().icon).to.eq(":+1:"));
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
  it("Hide sensitive data", () => {
    cy.get("[data-cy=more-button]").click();
    cy.get("[data-cy=hide-sensitive-data-switch]")
      .click()
      .should(() =>
        expect(localStorage.getItem("hide-sensitive-data")).to.eq("true")
      );
    cy.get("[data-cy=about-email-input]").should(
      "have.attr",
      "type",
      "password"
    );
    cy.get("[data-cy=about-phone-input]").should(
      "have.attr",
      "type",
      "password"
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
    cy.url().should("eq", `${Cypress.config().baseUrl}/en/resumes/malcodeman`);
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
    cy.url().should("eq", `${Cypress.config().baseUrl}/en/resumes`);
  });
  it("Import data", () => {
    cy.get("[data-cy=more-button]").click();
    cy.get("[data-cy=import-button]").click();
    cy.get("[data-cy=import-data-modal-content]").should("exist");
  });
  it("Export", () => {
    cy.get("[data-cy=more-button]").click();
    cy.get("[data-cy=export-button]").click();
    cy.get("[data-cy=export-resume-modal-content]").should("exist");
  });
  it("Profile picture | Add", () => {
    cy.get("[data-cy=add-profile-picture-button]").click();
    cy.get("[data-cy=add-profile-picture-modal-content]").should("exist");
  });
  it("About", () => {
    const title = faker.name.jobTitle();
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email(firstName, lastName);
    const phone = faker.phone.number();
    const website = faker.internet.url();
    const city = faker.address.city();
    const country = faker.address.country();
    const summary = faker.random.words();

    cy.get("[data-cy=about-title-input]")
      .type(title)
      .should(() => expect(getResume().about.title).to.eq(title));
    cy.get("[data-cy=about-first-name-input]")
      .type(firstName)
      .should(() => expect(getResume().about.firstName).to.eq(firstName));
    cy.get("[data-cy=about-last-name-input]")
      .type(lastName)
      .should(() => expect(getResume().about.lastName).to.eq(lastName));
    cy.get("[data-cy=about-email-input]")
      .clear()
      .type(email)
      .should(() => expect(getResume().about.email).to.eq(email));
    cy.get("[data-cy=about-phone-input]")
      .type(phone)
      .should(() => expect(getResume().about.phone).to.eq(phone));
    cy.get("[data-cy=about-website-input]")
      .clear()
      .type(website)
      .should(() => expect(getResume().about.website).to.eq(website));
    cy.get("[data-cy=about-city-input]")
      .clear()
      .type(city)
      .should(() => expect(getResume().about.city).to.eq(city));
    cy.get("[data-cy=about-country-input]")
      .clear()
      .type(country)
      .should(() => expect(getResume().about.country).to.eq(country));
    cy.get("[data-cy=about-summary-textarea]")
      .type(summary)
      .should(() => expect(getResume().about.summary).to.eq(summary));
  });
  it("Summary pre-written phrases search | Not found", () => {
    cy.get("[data-cy=add-pre-written-phrases-form-helper-text]").click();
    cy.get("[data-cy=search-input]").type("malcodeman");
    cy.contains("No phrases found");
  });
  it("Summary pre-written phrases search | Found", () => {
    cy.get("[data-cy=add-pre-written-phrases-form-helper-text]").click();
    cy.get("[data-cy=search-input]").type("React");
    cy.get("[data-cy=phrases-stack]").children().should("have.length", 1);
  });
  it("Summary pre-written phrases | First", () => {
    // TODO: Improve
    cy.get("[data-cy=add-pre-written-phrases-form-helper-text]").click();
    cy.get("[data-cy=phrase-checkbox]")
      .first()
      .click()
      .find('[type="checkbox"]')
      .should("be.checked");
    // .should(() =>
    //   expect(getResume().about.summary).to.eq(`${phrases.SUMMARY[0].phrase} `)
    // );
  });
  it("Summary pre-written phrases | Last", () => {
    // TODO: Improve
    cy.get("[data-cy=add-pre-written-phrases-form-helper-text]").click();
    cy.get("[data-cy=phrase-checkbox]")
      .last()
      .click()
      .find('[type="checkbox"]')
      .should("be.checked");
    // .should(() =>
    //   expect(getResume().about.summary).to.eq(
    //     `${phrases.SUMMARY[length(phrases.SUMMARY) - 1].phrase} `
    //   )
    // );
  });
  it("Summary pre-written phrases | Multiple", () => {
    cy.get("[data-cy=add-pre-written-phrases-form-helper-text]").click();
    cy.get("[data-cy=phrase-checkbox]").eq(0).click();
    cy.get("[data-cy=phrase-checkbox]").eq(1).click();
    cy.get("[data-cy=phrase-checkbox]")
      .eq(2)
      .click()
      .should(() =>
        expect(getResume().about.summary).to.eq(
          `${phrases.SUMMARY[0].phrase} ${phrases.SUMMARY[1].phrase} ${phrases.SUMMARY[2].phrase} `
        )
      );
  });
  it("Employment history", () => {
    const title = faker.company.name();
    const subtitle = faker.name.jobTitle();
    const website = faker.internet.url();
    const city = faker.address.city();
    const startDate = faker.date.past().toDateString();
    const endDate = "Current";
    const description = faker.random.words();

    cy.get("[data-cy=section-label-accordion-button]").eq(0).click();
    cy.get("[data-cy=section-label-accordion-button]").eq(1).click();
    cy.get("[data-cy=section-label-accordion-button]").eq(2).click();
    cy.get("[data-cy=section-nested-title-input]")
      .type(title)
      .should(() =>
        expect(getResume().section[0].nested[0].title).to.eq(title)
      );
    cy.get("[data-cy=section-nested-subtitle-input]")
      .type(subtitle)
      .should(() =>
        expect(getResume().section[0].nested[0].subtitle).to.eq(subtitle)
      );
    cy.get("[data-cy=section-nested-website-input]")
      .type(website)
      .should(() =>
        expect(getResume().section[0].nested[0].website).to.eq(website)
      );
    cy.get("[data-cy=section-nested-city-input]")
      .type(city)
      .should(() => expect(getResume().section[0].nested[0].city).to.eq(city));
    cy.get("[data-cy=section-nested-start-date-input]")
      .type(startDate)
      .should(() =>
        expect(getResume().section[0].nested[0].startDate).to.eq(startDate)
      );
    cy.get("[data-cy=section-nested-end-date-input]")
      .type(endDate)
      .should(() =>
        expect(getResume().section[0].nested[0].endDate).to.eq(endDate)
      );
    cy.get("[data-cy=section-nested-description-textarea]")
      .type(description)
      .should(() =>
        expect(getResume().section[0].nested[0].description).to.eq(description)
      );
  });
  it("Suggested tags | Skills", () => {
    const skills = `${tags.SKILLS[0].value}\n${tags.SKILLS[1].value}\n${tags.SKILLS[2].value}`;
    cy.get("[data-cy=section-label-accordion-button]").eq(0).click();
    cy.get("[data-cy=section-label-accordion-button]").eq(3).click();
    cy.get("[data-cy=suggested-tags-wrap-item]").first().click();
    cy.get("[data-cy=suggested-tags-wrap-item]").first().click();
    cy.get("[data-cy=suggested-tags-wrap-item]")
      .first()
      .click()
      .should(() => expect(getResume().section[2].tags).to.eq(skills));
  });
  it("Suggested tags | Hobbies", () => {
    const hobbies = `${tags.HOBBIES[0].value}\n${tags.HOBBIES[1].value}\n${tags.HOBBIES[2].value}`;
    cy.get("[data-cy=section-label-accordion-button]").eq(0).click();
    cy.get("[data-cy=section-label-accordion-button]").eq(4).click();
    cy.get("[data-cy=suggested-tags-wrap-item]:visible").first().click();
    cy.get("[data-cy=suggested-tags-wrap-item]:visible").first().click();
    cy.get("[data-cy=suggested-tags-wrap-item]:visible")
      .first()
      .click()
      .should(() => expect(getResume().section[3].tags).to.eq(hobbies));
  });
  it("New section | Standard", () => {
    // TODO: Improve
    cy.get("[data-cy=new-section-button]").click();
    cy.get("[data-cy=add-section-modal-content]").should("exist");
    cy.get("[data-cy=custom-section-button]").first().click();
    cy.get("[data-cy=section-label-accordion-button]").eq(5).click();
    cy.get("[data-cy=section-label-accordion-button]").eq(6).click();
  });
  it("New section | Tag list", () => {
    // TODO: Improve
    cy.get("[data-cy=new-section-button]").click();
    cy.get("[data-cy=add-section-modal-content]").should("exist");
    cy.get("[data-cy=custom-section-button]").eq(1).click();
    cy.get("[data-cy=section-label-accordion-button]").eq(5).click();
  });
  it("Change template", () => {
    cy.get("[data-cy=templates-tab]").click();
    cy.get("[data-cy=template]")
      .eq(1)
      .click()
      .should(() => expect(getResume().design.template).to.eq("tokyo"));
  });
  it("Steps", () => {
    cy.intercept({
      method: "GET",
      url: "**/employment**",
    }).as("getEmployment");
    cy.intercept({
      method: "GET",
      url: "**/education**",
    }).as("getEducation");
    cy.intercept({
      method: "GET",
      url: "**/resumes/**",
    }).as("getResume");
    cy.visit(`/resumes/${getResume().id}/about`);

    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email(firstName, lastName);
    const phone = faker.phone.number();
    const city = faker.address.city();
    const country = faker.address.country();

    cy.contains("Personal details");
    cy.get("[data-cy=first-name-input]")
      .type(firstName)
      .should("have.value", firstName);
    cy.get("[data-cy=last-name-input]")
      .type(lastName)
      .should("have.value", lastName);
    cy.get("[data-cy=email-input]")
      .clear()
      .type(email)
      .should("have.value", email);
    cy.get("[data-cy=phone-input]").type(phone).should("have.value", phone);
    cy.get("[data-cy=city-input]")
      .clear()
      .type(city)
      .should("have.value", city);
    cy.get("[data-cy=country-input]")
      .clear()
      .type(country)
      .should("have.value", country);
    cy.get("[data-cy=next-button]").click();
    cy.wait("@getEmployment");
    cy.url().should(
      "eq",
      `${Cypress.config().baseUrl}/resumes/${getResume().id}/employment`
    );
    cy.contains("Employment history");

    // const company = faker.company.name();
    // const jobTitle = faker.name.jobTitle();
    // const startDate = faker.date.past().toDateString();
    // const endDate = "Current";

    // cy.get("[data-cy=employment-title-input]")
    //   .type(company)
    //   .should("have.value", company);
    // cy.get("[data-cy=employment-subtitle-input]")
    //   .type(jobTitle)
    //   .should("have.value", jobTitle);
    // cy.get("[data-cy=employment-start-date-input]")
    //   .type(startDate)
    //   .should("have.value", startDate);
    // cy.get("[data-cy=employment-end-date-input]")
    //   .type(endDate)
    //   .should("have.value", endDate);
    // cy.get("[data-cy=next-button]").click();
    // cy.wait("@getEducation");
    // cy.url().should(
    //   "eq",
    //   `${Cypress.config().baseUrl}/resumes/${getResume().id}/education`
    // );
    // cy.contains("Education");

    // const school = faker.random.word();
    // const degree = faker.random.word();

    // cy.get("[data-cy=education-title-input]")
    //   .type(school)
    //   .should("have.value", school);
    // cy.get("[data-cy=education-subtitle-input]")
    //   .type(degree)
    //   .should("have.value", degree);
    // cy.get("[data-cy=education-start-date-input]")
    //   .type(startDate)
    //   .should("have.value", startDate);
    // cy.get("[data-cy=education-end-date-input]")
    //   .type(endDate)
    //   .should("have.value", endDate);
    // cy.get("[data-cy=finish-button]").click();
    // cy.wait("@getResume");
    // cy.url().should(
    //   "eq",
    //   `${Cypress.config().baseUrl}/resumes/${getResume().id}`
    // );
  });
});
