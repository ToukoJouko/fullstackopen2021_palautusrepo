describe("Blog app", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("Log in to application");
    cy.contains("username");
    cy.contains("password");
    cy.contains("login");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("touko");
      cy.get("#password").type("salasana");
      cy.get("#login-button").click();

      cy.contains("Touko Pakarinen logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("touko");
      cy.get("#password").type("wrong");
      cy.get("#login-button").click();

      cy.get(".notification").cy.should(
        "contain",
        "wrong username or password"
      );
      cy.get("html").should("not.contain", "Touko Pakarinen logged in");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.get("#username").type("touko");
      cy.get("#password").type("salasana");
      cy.get("#login-button").click();
    });

    it("A blog can be created", function () {
      cy.contains("create new blog").click();
      cy.get("#title").type("test title");
      cy.get("#author").type("test author");
      cy.get("#url").type("test url");
      cy.contains("create").click();
      cy.contains("test title").click();
      cy.contains("test author");
    });
  });
});
