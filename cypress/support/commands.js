Cypress.Commands.add("setLocalStorage", (key, value) => {
  cy.window().then((window) => {
    window.localStorage.setItem(key, JSON.stringify(value));
  });
});
