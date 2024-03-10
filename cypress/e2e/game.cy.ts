/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

describe("Game", () => {
  it("Should play a game", () => {
    cy.visit("/", {
      failOnStatusCode: false,
    });

    const squares = Array.from({ length: 9 }).map((_, i) =>
      cy.findAllByRole("button").filter((j) => j === i)
    );

    squares[0].click();
    squares[1].click();
    squares[2].click();
    squares[3].click();
    squares[4].click();
    squares[5].click();
    squares[6].click();

    expect(cy.findByText("Winner: X")).to.exist;
  });

  it("Should reset when Go to move # is clicked", () => {
    cy.visit("/", {
      failOnStatusCode: false,
    });

    const squares = Array.from({ length: 9 }).map((_, i) =>
      cy.findAllByRole("button").filter((j) => j === i)
    );

    squares[0].click();
    squares[1].click();
    squares[2].click();
    squares[3].click();
    squares[4].click();
    squares[5].click();
    squares[6].click();

    cy.findByText("Go to move #3").click();

    squares[4].click();
    squares[3].click();
    squares[7].click();

    expect(cy.findByText("Winner: O")).to.exist;
  });
});
