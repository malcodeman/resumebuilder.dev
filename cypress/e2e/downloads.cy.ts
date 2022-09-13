beforeEach(() => {
  cy.visit("/downloads");
});

describe("Downloads page", () => {
  it("Download for MacOS button", () => {
    cy.get(`[data-cy=downloads-macos]`).should("be.disabled");
  });
  it("Download for Windows button", () => {
    cy.get(`[data-cy=downloads-windows]`).should("be.disabled");
  });
});

export {};
