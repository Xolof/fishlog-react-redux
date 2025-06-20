import "cypress-file-upload";

const URL = `http://localhost:5173`;
const email = "kjell@ullared.se";
const password = "pass123";
const species = "mackerel"
const imageFile = "mackerel.jpg";
const weight = 500;
const length = 42;
const date = getFormattedDate();

function logIn() {
  cy.get("a:contains(Login)").click();
  cy.get("#email").type(email);
  cy.get("#passWord").type(password);
  cy.get("button:contains(Log in)").click();
}

function logOut() {
  cy.get("button:contains(Logout)").click();
  cy.get(".Toastify__toast").contains("You have been logged out");
}

function getFormattedDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

describe("User workflow.", () => {
  it("Login, add fishCatch, delete fishCatch, logout.", () => {
    cy.viewport(1024, 768);
    cy.visit(URL);
    logIn();
    cy.get(".Toastify__toast").contains("You logged in");
    cy.get(".Toastify__close-button").click();
    cy.get("a:contains(Add)").click();
    cy.get(".leaflet-container").click(400, 250);
    cy.get("form.addForm").find('#species', { timeout: 1000 }).should('be.visible');
    cy.get("form.addForm").find("#species").type(species);
    cy.get("#weight").type(weight);
    cy.get("#length").type(length);
    cy.get("#date").type(date);
    cy.get("#uploadImage").attachFile(imageFile);
    cy.get("button:contains(Save)").click();
    cy.get("a:contains(List)").click();
    cy.get(".toggleFiltersButton").click();
    cy.get("#species").type(species);
    cy.contains(species);
    cy.contains(weight + " g");
    cy.contains(length + " cm");
    cy.contains(date);
    cy.get(".deleteButton").first().click();
    cy.wait(500);
    cy.get(".Toastify__toast").contains("Catch deleted");
    cy.get(".Toastify__close-button").click({ multiple: true });
    logOut();
  });
});


