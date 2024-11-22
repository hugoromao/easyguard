describe("Passwords flux", () => {
  it("should finish onboarding correctly", () => {
    cy.visit("http://localhost:3000");

    cy.skipOnboarding();

    cy.isOnHome();
  });

  it("should create the user password correctly", () => {
    cy.visit("http://localhost:3000");

    cy.skipOnboarding();

    cy.contains(/Nova Senha/i).click();

    cy.get("[name='Palavra 1']").type("O Sol");
    cy.get("[name='Palavra 2']").type("sussurou");
    cy.get("[name='Palavra 3']").type("segredos");
    cy.get("[name='Palavra 4']").type("suaves");
    cy.contains("Adicionar palavra").click();
    cy.contains("Adicionar palavra").click();
    cy.contains("Adicionar palavra").click();
    cy.get("[name='Palavra 5']").type("ao vento");
    cy.get("[name='Palavra 6']").type("brando");
    cy.get("[name='Palavra 7']").type("da manhã");
    cy.get("[name='Remover Palavra 7']").click();
    cy.get("[name='Remover Palavra 6']").click();
    cy.get("[name='Remover Palavra 5']").click();
    cy.contains("Adicionar palavra").click();
    cy.contains("Adicionar palavra").click();
    cy.contains("Adicionar palavra").click();
    cy.get("[name='Palavra 5']").type("ao vento");
    cy.get("[name='Palavra 6']").type("brando");
    cy.get("[name='Palavra 7']").type("da manhã");
    cy.get("[type=submit]").click();
    cy.get("[name='Número 1']").type("14");
    cy.get("[name='Número 2']").type("2016");
    cy.contains("Adicionar mais um número").click();
    cy.contains("Adicionar mais um número").click();
    cy.get("[name='Número 3']").type("14");
    cy.get("[name='Número 4']").type("2016");
    cy.get("[name='Remover Número 4']").click();
    cy.get("[name='Remover Número 3']").click();
    cy.contains("Adicionar mais um número").click();
    cy.contains("Adicionar mais um número").click();
    cy.get("[name='Número 3']").type("1080");
    cy.get("[name='Número 4']").type("2048");
    cy.get("[type=submit]").click();

    cy.url().should(
      "eq",
      "http://localhost:3000/generatePassword?words=%5B%22OSol%22%2C%22sussurou%22%2C%22segredos%22%2C%22suaves%22%2C%22aovento%22%2C%22brando%22%2C%22damanh%C3%A3%22%5D&numbers=%5B%2214%22%2C%222016%22%2C%221080%22%2C%222048%22%5D"
    );

    cy.get("[name='password']").then(($input) => {
      const value = $input.val();
      cy.get("[name='password']").should("have.value", value);

      cy.contains("Regerar").click();

      cy.get("[name='password']").should("not.have.value", value);
    });

    cy.contains("Copiar senha").click();
    cy.get("[class='notistack-CollapseWrapper']", { timeout: 2000 }).should(
      "exist"
    );

    cy.contains(/Voltar para o início/i).click();
  });
});

describe("Badges", () => {
  it("should complete the achivements correctly", () => {
    cy.visit("http://localhost:3000/achivements");

    cy.skipOnboarding();

    cy.get("[aria-details=inprogress]").then((cards) => {
      expect(cards).to.have.length(10);

      cy.contains("Completar desafio").click();
      cy.contains("Completar desafio").click();
      cy.contains("Completar desafio").click();
      cy.contains("Completar desafio").click();
      cy.contains("Completar desafio").click();
      cy.contains("Completar desafio").click();
      cy.contains("Completar desafio").click();
      cy.contains("Completar desafio").click();

      cy.get("[aria-details=completed]").then((cards) => {
        expect(cards).to.have.length(8);
      });
      cy.get("[aria-details=inprogress]").then((cards) => {
        expect(cards).to.have.length(2);
      });
    });
  });
});
