const URL = "http://127.0.0.1:8080/";
const NUMBER_OF_FRUITS = 16;
context("Memotest normal", () => {
    beforeEach(() => {
        cy.visit(URL);
    });
    describe("Test buttons", () => {
        it("It makes sure that there are buttons to start the game, change difficulty", () => {
            cy.get("[data-cy='btn-normal']").should("contain", "Normal").click();
            cy.get("[data-cy='btn-start']").should("contain", "Jugar").click();
            cy.get("[data-cy='board']")
                .find("[data-cy='fruit']")
                .should("have.length", NUMBER_OF_FRUITS);
        });
    });
    describe("Make sure the fruits are random and solve the game", () => {
        it("Make sure the fruits are random", () => {
            cy.get("[data-cy='btn-normal']").click();
            cy.get("[data-cy='btn-start']").click();

            cy.get("[data-cy='fruit']").then((fruits) => {
                let originalClasses = [];
                fruits.each(function (i, fruit) {
                    originalClasses.push(fruit.className);
                });

                cy.visit(URL);
                cy.get("[data-cy='btn-normal']").click();
                cy.get("[data-cy='btn-start']").click();

                let newClasses = [];
                cy.get("[data-cy='fruit']").then((newFruits) => {
                    newFruits.each(function (i, fruit) {
                        newClasses.push(fruit.className);
                    });
                    cy.wrap(originalClasses).should(
                        "not.deep.equal",
                        newClasses
                    );
                });
            });
        });
        it("solve game with wrong combination", () => {
            cy.get("[data-cy='btn-normal']").click();
            cy.get("[data-cy='btn-start']").click();
            let pairMap, pairList;
            
            cy.get("[data-cy='fruit']").then((fruits) => {
                pairMap = getEvenOfFruits(fruits);
                pairList = Object.values(pairMap);

                cy.get(pairList[0][0]).click();
                cy.get(pairList[1][0]).click();

                cy.get("[data-cy='fruit']").should(
                    "have.length",
                    NUMBER_OF_FRUITS
                );
            });
            cy.get("[data-cy='fruit']")
                .should("have.length", NUMBER_OF_FRUITS)
                .then(() => {
                    pairList.forEach(function (pair) {
                        cy.get(pair[0]).click();
                        cy.get(pair[1]).click();
                    });
                });

            cy.get("[data-cy='fruit']").should("have.length", 0);

            cy.get("[data-cy='board']").should("not.be.visible");
            const turnNumber = NUMBER_OF_FRUITS / 2 + 1;
            cy.get("[data-cy='results']").should("be.visible");
            cy.get("[data-cy='turn-number']").should(
                "contain",
                `${turnNumber}`
            );
            cy.get("[data-cy='points']").should(
                "contain",
                `${(NUMBER_OF_FRUITS / 2) * 10 - turnNumber}`
            );
        });
    });
});

function getEvenOfFruits(fruits) {
    const pair = {};

    fruits.each((i, fruit) => {
        const fruitClass = fruit.className.replace("fruit", "");

        if (pair[fruitClass]) {
            pair[fruitClass].push(fruit);
        } else {
            pair[fruitClass] = [fruit];
        }
    });

    return pair;
}
