describe("Landing page", () => {
  it("renders the button which redirect to login page", () => {
    cy.visit("/");
    cy.get('[data-testid="go-to-login-btn"]').should("exist");
  });
  it("redirect to login page", () => {
    cy.visit("/");
    cy.get('[data-testid="go-to-login-btn"]').click();
    cy.url().should("include", "/login");
  });
});
describe("Login Page", () => {
  it("login demo user to app", () => {
    // destructuring assignment of the this.currentUser object
    // const { email, password } = this.currentUser;

    cy.visit("/login");

    cy.get("input[name=email]").type("demo@demo.com");

    // {enter} causes the form to submit
    cy.get("input[name=password]").type(`demo123{enter}`);

    // we should be redirected to /boards
    cy.url().should("include", "/boards");

    // our auth cookie should be present
    // cy.getCookie("your-session-cookie").should("exist");
  });
});

describe("Boards dashboard", () => {
  it("renders boards and buttons", () => {
    cy.visit("/login");
    cy.get("input[name=email]").type("demo@demo.com");
    cy.get("input[name=password]").type(`demo123{enter}`);
    cy.url().should("include", "/boards");
    cy.visit("/boards");
    cy.get('[data-testid="create-board-btn"]').should("exist");
  });
});
