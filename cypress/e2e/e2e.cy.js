const DELAY = 2000;

/**
 * Tests that verify the presence of essential elements on the Products Page.
 * These include:
 * - Sidebar
 * - Product list (should contain 12 products)
 * - Pagination controls
 * - Filters (Tags and Vendors)
 */
describe("Products Page - Elements", () => {
  it("- has a sidebar", () => {
    cy.visit("http://localhost:3000/products");
    cy.get("#sidebar").should("be.visible");
  });

  it("- has 12 products", () => {
    cy.visit("http://localhost:3000/products");
    cy.get("#products").children().should("have.length", 12);
  });

  it("- has pagination", () => {
    cy.visit("http://localhost:3000/products");
    cy.get("#productsPagination").should("be.visible");
  });

  it("- has a tags filter menu", () => {
    cy.visit("http://localhost:3000/products");
    cy.get("#filterTags").should("be.visible");
  });

  it("- has 7 tags in the filters", () => {
    cy.visit("http://localhost:3000/products");
    cy.get("#filterTags").children().should("have.length", 7);
  });

  it("- has a vendors filter menu", () => {
    cy.visit("http://localhost:3000/products");
    cy.get("#filterVendors").should("be.visible");
  });

  it("- has 3 vendors", () => {
    cy.visit("http://localhost:3000/products");
    cy.get("#filterVendors").children().should("have.length", 3);
  });
});

/**
 * Tests that verify navigation functionality on the Products Page.
 * These include:
 * - Clicking on vendor filters redirects to the correct vendor's page.
 * - Clicking on tag filters updates the URL and product list accordingly.
 * - Combining vendor and tag filters narrows results.
 * - Pagination updates results correctly.
 * - Filtering with incompatible tags and vendors results in no products found.
 */
describe("Products Page - Navigation", () => {
  it("- vendor ShelterCo redirects to vendor's page", () => {
    cy.visit("http://localhost:3000/products");
    cy.wait(DELAY);
    cy.get("#filterVendors").contains("ShelterCo").click();
    cy.wait(DELAY);
    cy.url().should("eq", "http://localhost:3000/products/ShelterCo");
    cy.get("#products").children().should("have.length", 2);
  });

  it("- tag Balm redirects to filtered products page", () => {
    cy.visit("http://localhost:3000/products");
    cy.wait(DELAY);
    cy.get("#filterTags").contains("Balm").click();
    cy.wait(DELAY);
    cy.url().should("eq", "http://localhost:3000/products?tags=Balm");
    cy.get("#products").children().should("have.length", 2);
  });

  it("- vendor ShelterCo and tag Cat shows 1 product", () => {
    cy.visit("http://localhost:3000/products");
    cy.wait(DELAY);
    cy.get("#filterVendors").contains("ShelterCo").click();
    cy.wait(DELAY);
    cy.get("#filterTags").contains("Cat").click();
    cy.wait(DELAY);
    cy.url().should("eq", "http://localhost:3000/products/ShelterCo?tags=Cat");
    cy.get("#products").children().should("have.length", 1);
  });

  it("- vendor PetLab and tag Chews on page 2 shows 10 products", () => {
    cy.visit("http://localhost:3000/products");
    cy.wait(DELAY);
    cy.get("#filterVendors").contains("PetLab").click();
    cy.wait(DELAY);
    cy.get("#filterTags").contains("Chews").click();
    cy.wait(DELAY);
    cy.get("#productsPagination").contains("2").click();
    cy.wait(DELAY);
    cy.url().should(
      "eq",
      "http://localhost:3000/products/PetLab?page=2&tags=Chews"
    );
    cy.get("#products").children().should("have.length", 10);
  });

  it("- vendor ShelterCo and tag Chews shows no products", () => {
    cy.visit("http://localhost:3000/products");
    cy.wait(DELAY);
    cy.get("#filterVendors").contains("ShelterCo").click();
    cy.wait(DELAY);
    cy.get("#filterTags").contains("Chews").click();
    cy.wait(DELAY);
    cy.url().should(
      "eq",
      "http://localhost:3000/products/ShelterCo?tags=Chews"
    );
    cy.get("#store").children().contains("No products found");
  });
});
