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
let $fruit = null;
let roundCounter;
let $buttonStart = document.querySelector("#button-start");
let $board = document.querySelector("#board");
$buttonStart.onclick = handleDisplayStartGame;

function handleDisplayStartGame() {
    roundCounter = 0;
    let $containerStart = document.querySelector("#container-start");
    let $totalRounds = document.querySelector("#results-total-rounds");
    $totalRounds.style.display = "none";
    $buttonStart.style.display = "none";
    $containerStart.style.display = "none";
    handleInsertFruit();
}

function handleInsertFruit() {
    let doubleFruits = FRUITS.concat(FRUITS);
    sortRandomFruit(doubleFruits);
    let $row = $board.querySelector(".row");
    doubleFruits.forEach((fruitName, index) => {
        let $fruitContainer = document.createElement("div");
        $fruitContainer.className = "fruit-container col-3";

        $img = document.createElement("img");
        $img.className = `fruit ${fruitName}`;
        $img.src = `./src/img/${fruitName}.svg`;

        $fruitContainer.appendChild($img);
        setTimeout(() => {
            $row.appendChild($fruitContainer);
        }, (index + 1) * 150);
    });
}
function sortRandomFruit(doubleFruits) {
    doubleFruits = doubleFruits.sort(() => {
        return 0.5 - Math.random();
    });
}

$board.onclick = handlePlayerInput;

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
    } else if ($fruit === $currentFruit) {
        hiddenFruit($fruit);
        $fruit = null;
    } else if (fruitAreEqual($fruit, $currentFruit)) {
        matchedFruit($fruit);
        matchedFruit($currentFruit);
        $fruit = null;
        roundCounter++;
    } else {
        hiddenFruit($fruit);
        hiddenFruit($currentFruit);
        $fruit = null;
        roundCounter++;
    }
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
