import "cypress-file-upload";

const URL = `http://localhost:3000/map/all`;

// const species = "torsk";

// describe("Test filtering for a species", () => {
//   it(`Visits ${URL}`, () => {
//     cy.visit(URL);
//     cy.get("#species").type(species);
//     cy.get(".leaflet-marker-icon").first().click();
//     cy.get(".leaflet-popup-content-wrapper").contains(species);
//   });
// });

// describe("Test going to Add Page without logging in", () => {
//   it(`Visits ${URL}`, () => {
//     cy.visit(URL);
//     cy.get("a:contains(Add)").click();
//     cy.contains("Login to be able to add a catch");
//   });
// });

// describe("Test logging in, then logging out", () => {
//   it(`Visits ${URL}`, () => {
//     cy.visit(URL);
//     cy.get("a:contains(Login)").click();
//     cy.get("#email").type("kjell@ullared.se");
//     cy.get("#passWord").type("pass123");
//     cy.get("button:contains(Log in)").click();
//     cy.get(".Toastify__toast-body").contains("You logged in");
//     cy.get("button:contains(Logout)").click();
//     cy.get(".Toastify__toast-body").contains("You have been logged out");
//   });
// });

describe("Test logging in, adding a fishcatch, deleting it and logging out.", () => {
  it(`Visits ${URL}`, () => {
    cy.viewport(1024, 768);
    cy.visit(URL);
    cy.get("a:contains(Login)").click();
    cy.get("#email").type("kjell@ullared.se");
    cy.get("#passWord").type("pass123");
    cy.get("button:contains(Log in)").click();
    cy.get(".Toastify__toast").contains("You logged in");
    cy.get("a:contains(Add)").click();
    cy.get("#species").type("kjellsTest");
    cy.get("#weight").type("500");
    cy.get("#length").type("45");
    cy.get("#date").type("2022-02-05");
    cy.get(".leaflet-container").click(400, 250);
    const imageFile = "mackerel.jpg";
    cy.get("#uploadImage").attachFile(imageFile);
    cy.get("button:contains(Save)").click();
    cy.visit("http://localhost:3000/list");
    cy.get(".toggleFiltersButton").click();
    cy.get("#species").type("kjellsTest");
    cy.contains("kjellsTest");
    cy.contains("500 g");
    cy.contains("45 cm");
    cy.contains("2022-02-05");
    cy.get(".deleteButton").click();
    cy.wait(500);
    cy.get(".Toastify__toast").contains("Catch deleted");
    cy.wait(1000);
    cy.get("button:contains(Logout)").click();
    cy.get(".Toastify__toast").contains("You have been logged out");
  });
});
