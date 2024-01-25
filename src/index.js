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
let $board = document.querySelector("#board");

function sortRandomFruit(doubleFruits) {
    doubleFruits = doubleFruits.sort(() => {
        return 0.5 - Math.random();
    });
}

function handleInsertFruit() {
    let doubleFruits = FRUITS.concat(FRUITS);
    sortRandomFruit(doubleFruits);
    let $row = $board.querySelector(".row");
    doubleFruits.forEach((fruit) => {
        let $div = document.createElement("div");
        $div.className = `col-3 fruit-container`;

        $img = document.createElement("img");
        $img.className = `${fruit}`;
        $img.src = `./src/img/${fruit}.svg`;

        $div.appendChild($img);
        $row.appendChild($div);
    });
}

window.addEventListener("load", handleInsertFruit);

$board.onclick = (event) => {
    console.log(event.target);
};

