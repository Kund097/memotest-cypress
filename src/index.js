let $fruit = null;
let roundCounter;
let currentFruits = [];
let $buttonStart = document.querySelector("#button-start");
let $board = document.querySelector("#board");

function handleDisplayStartGame() {
    roundCounter = 0;
    let $containerStart = document.querySelector("#container-start");
    let $totalRounds = document.querySelector("#results-total-rounds");
    $totalRounds.style.display = "none";
    $buttonStart.style.display = "none";
    $containerStart.style.display = "none";
    configureGame();
}

function setDifficulty(FRUITS) {
    let difficultyValue = document.querySelector(".btn-check:checked").value;
    for (let i = 0; i < difficultyValue; i++) {
        currentFruits.push(
            FRUITS.splice(Math.floor(Math.random() * FRUITS.length), 1)
        );
    }
}

function configureGame() {
    currentFruits = [];
    const FRUITS = [
        "apple",
        "banana",
        "cherries",
        "grape",
        "green-apple",
        "pear",
        "strawberry",
        "tangerine",
        "watermelon",
        "lemon",
        "pineapple",
        "peach",
        "coconut",
    ];
    setDifficulty(FRUITS);
    let doubleFruits = currentFruits.concat(currentFruits);
    sortRandomFruit(doubleFruits);
    let $row = $board.querySelector(".row");
    doubleFruits.forEach((fruitName) => {
        let elements = {};
        createElements(fruitName, elements);
        insertElements($row,elements);
    });
}

function createElements(fruitName, elements) {
    let $fruitContainer = document.createElement("div");
    let $fruitImg = document.createElement("img");
    $fruitContainer.className = "fruit-container col-3";
    $fruitContainer.style.height = `${100 / (currentFruits.length / 2)}vh`;
    $fruitImg.className = `fruit ${fruitName}`;
    $fruitImg.src = `./src/img/${fruitName}.svg`;
    elements.$fruitContainer = $fruitContainer;
    elements.$fruitImg = $fruitImg;
}

function insertElements($row,{ $fruitContainer, $fruitImg }) {
    $fruitContainer.appendChild($fruitImg);

        $row.appendChild($fruitContainer);

}

function sortRandomFruit(doubleFruits) {
    doubleFruits = doubleFruits.sort(() => {
        return 0.5 - Math.random();
    });
}

function handlePlayerInput(event) {
    let $currentElement = event.target;
    if ($currentElement.classList.contains("fruit")) {
        showFruit($currentElement);
        handleCompareFruits($currentElement);
        evaluateEndOfGame();
    }
}

function handleCompareFruits($currentFruit) {
    if (!$fruit) {
        $fruit = $currentFruit;
        return;
    } else if ($fruit === $currentFruit) {
        hiddenFruit($fruit);
        $fruit = null;
        roundCounter++;
        return;
    }

    if (fruitAreEqual($fruit, $currentFruit)) {
        matchedFruit($fruit);
        matchedFruit($currentFruit);
    } else {
        hiddenFruit($fruit);
        hiddenFruit($currentFruit);
    }
    roundCounter++;
    $fruit = null;
}

function fruitAreEqual($fruit, $currentFruit) {
    return $fruit.className === $currentFruit.className;
}

function showFruit($currentFruit) {
    if ($currentFruit.classList.contains("image-animation-hidden")) {
        $currentFruit.classList.replace(
            "image-animation-hidden",
            "image-animation-show"
        );
    } else {
        $currentFruit.classList.add("image-animation-show");
    }
}

function hiddenFruit($currentFruit) {
    setTimeout(() => {
        if ($currentFruit.classList.contains("image-animation-show")) {
            $currentFruit.classList.replace(
                "image-animation-show",
                "image-animation-hidden"
            );
        }
    }, 1000);
}

function matchedFruit($currentFruit) {
    $currentFruit.className += " fruit-matched";
}

function evaluateEndOfGame() {
    setTimeout(() => {
        let matchedFruits = document.querySelectorAll(".fruit-matched").length;
        let totalFruits = currentFruits.length * 2;
        if (Number(matchedFruits) === Number(totalFruits)) {
            handleDisplaysEndGame();
        }
    }, 1000);
}

function handleDisplaysEndGame() {
    let $containerStart = document.querySelector("#container-start");
    let $totalRounds = document.querySelector("#results-total-rounds");
    let $totalPoints = document.querySelector("#results-total-points");
    $containerStart.style.display = "flex";
    $buttonStart.style.display = "block";
    $totalRounds.style.display = "block";
    $totalRounds.textContent = `Cantidad de rondas para ganar: ${roundCounter}`;
    $totalPoints.textContent = `Puntuación final: ${
        currentFruits.length * 10 - roundCounter
    }`;

    let $containersFruits = document.querySelectorAll(".fruit-container");
    $containersFruits.forEach(($container) => {
        $container.remove();
    });
}

$buttonStart.addEventListener("click", handleDisplayStartGame);
$board.addEventListener("click", handlePlayerInput);
