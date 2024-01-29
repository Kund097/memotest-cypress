let $fruit = null;
let roundCounter;
let $buttonStart = document.querySelector("#button-start");
let $board = document.querySelector("#board");
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
];

function handleDisplayStartGame() {
    roundCounter = 0;
    let $containerStart = document.querySelector("#container-start");
    let $totalRounds = document.querySelector("#results-total-rounds");
    $totalRounds.style.display = "none";
    $buttonStart.style.display = "none";
    $containerStart.style.display = "none";
    configureGame();
}

function configureGame() {
    let doubleFruits = FRUITS.concat(FRUITS);
    sortRandomFruit(doubleFruits);
    let $row = $board.querySelector(".row");
    doubleFruits.forEach((fruitName, index) => {
        let elements = {};
        createElements(fruitName, elements);
        insertElements($row, index, elements);
    });
}

function createElements(fruitName, elements) {
    let $fruitContainer = document.createElement("div");
    let $fruitImg = document.createElement("img");
    $fruitContainer.className = "fruit-container col-3";
    $fruitImg.className = `fruit ${fruitName}`;
    $fruitImg.src = `./src/img/${fruitName}.svg`;
    elements.$fruitContainer = $fruitContainer;
    elements.$fruitImg = $fruitImg;
}

function insertElements($row, index, { $fruitContainer, $fruitImg }) {
    $fruitContainer.appendChild($fruitImg);
    setTimeout(() => {
        $row.appendChild($fruitContainer);
    }, (index + 1) * 150);
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
        return;
    }

    roundCounter++;

    if (fruitAreEqual($fruit, $currentFruit)) {
        matchedFruit($fruit);
        matchedFruit($currentFruit);
    } else {
        hiddenFruit($fruit);
        hiddenFruit($currentFruit);
    }
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
    let matchedFruits = document.querySelectorAll(".fruit-matched").length;
    let totalFruits = FRUITS.length * 2;
    if (Number(matchedFruits) === Number(totalFruits)) {
        handleDisplaysEndGame();
    }
}

function handleDisplaysEndGame() {
    let $containerStart = document.querySelector("#container-start");
    let $totalRounds = document.querySelector("#results-total-rounds");
    $containerStart.style.display = "flex";
    $buttonStart.style.display = "block";
    $totalRounds.style.display = "block";
    $totalRounds.textContent = `Cantidad de rondas para ganar: ${roundCounter}`;

    let $containersFruits = document.querySelectorAll(".fruit-container");
    $containersFruits.forEach(($container) => {
        $container.remove();
    });
}

$buttonStart.addEventListener("click", handleDisplayStartGame);
$board.addEventListener("click", handlePlayerInput);
