describe("landing page", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("should render buttons which redirects to login page", () => {
    cy.get('[data-cy="hero-container"]').should("exist");
    cy.get('[data-cy="go-to-login-btn"]').should("exist");
  });
  it("should redirect the user to login page after clicking a button", () => {
    cy.get('[data-cy="go-to-login-btn"]').click();
    cy.url().should("include", "/login");
  });
});

describe("login page", () => {
  beforeEach(() => {
    cy.visit("/login");
  });
  it("should render button which login the user", () => {
    cy.get('[data-cy="login-btn"]').should("exist");
  });
  it("should redirect the user to webiste after clicking a button", () => {
    cy.get('[data-cy="login-btn"]').click();
    cy.url().should("include", "/boards");
  });
});

describe("dashboard page", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get('[data-cy="login-btn"]').click();
  });
  it("should render buttons for creating board and logout", () => {
    cy.get('[data-cy="create-board-btn"]').should("exist");
    cy.get('[data-cy="logout-btn"]').should("exist");
  });
  it("should render modal for creating new board", () => {
    cy.get('[data-cy="create-board-btn"]').click();
    cy.get('[data-cy="create-board-modal"]').should("exist");
  });
  it("should create new board modal for creating new board", () => {
    cy.get('[data-cy="create-board-btn"]').click();
    cy.get('[data-cy="create-board-title"]').type("test board");
    cy.get(":nth-child(2) > .chakra-radio__control").click();
    cy.get('[data-cy="create-board"]').click();
  });
});
