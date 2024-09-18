const elements = [
    { name: "Zinek", symbol: "Zn" },
    { name: "Cín", symbol: "Sn" },
    { name: "Lithium", symbol: "Li" },
    { name: "Titan", symbol: "Ti" },
    { name: "Vanad", symbol: "V" },
    { name: "Wolfram", symbol: "W" },
    { name: "Platina", symbol: "Pt" },
    { name: "Argon", symbol: "Ar" },
    { name: "Kyslík", symbol: "O" },
    { name: "Dusík", symbol: "N" },
    { name: "Uhlík", symbol: "C" },
    { name: "Vodík", symbol: "H" },
    { name: "Železo", symbol: "Fe" },
    { name: "Měď", symbol: "Cu" },
    { name: "Hliník", symbol: "Al" },
    { name: "Křemík", symbol: "Si" },
    { name: "Stříbro", symbol: "Ag" },
    { name: "Zlato", symbol: "Au" },
    { name: "Sodík", symbol: "Na" },
    { name: "Hořčík", symbol: "Mg" },
    { name: "Vápník", symbol: "Ca" },
    { name: "Draslík", symbol: "K" },
    { name: "Chlor", symbol: "Cl" },
    { name: "Síra", symbol: "S" },
    { name: "Helium", symbol: "He" },
    { name: "Fluor", symbol: "F" },
    { name: "Fosfor", symbol: "P" },
    { name: "Rtuť", symbol: "Hg" },
    { name: "Olovo", symbol: "Pb" },
    { name: "Mangan", symbol: "Mn" },
    { name: "Nikl", symbol: "Ni" }
];

// Duplikujeme prvky a vytvoříme dvojice pro názvy a symboly
let cards = [];
elements.forEach(el => {
    cards.push({ text: el.name, type: "name" });
    cards.push({ text: el.symbol, type: "symbol" });
});

// Zamícháme karty
cards = cards.sort(() => 0.5 - Math.random());

let flippedCards = [];
let matchedCards = [];

const gameBoard = document.getElementById("game-board");

// Vytvoříme karty
cards.forEach((card, index) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.dataset.index = index;
    cardElement.innerText = "?";
    cardElement.addEventListener("click", () => flipCard(cardElement, card));
    gameBoard.appendChild(cardElement);
});

function flipCard(cardElement, card) {
    if (flippedCards.length === 2 || cardElement.classList.contains("flipped") || cardElement.classList.contains("matched")) {
        return;
    }

    cardElement.classList.add("flipped");
    cardElement.innerText = card.text;
    flippedCards.push({ cardElement, card });

    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;

    if (card1.card.type === "name" && card2.card.type === "symbol" && elements.find(el => el.name === card1.card.text && el.symbol === card2.card.text) ||
        card1.card.type === "symbol" && card2.card.type === "name" && elements.find(el => el.name === card2.card.text && el.symbol === card1.card.text)) {
        card1.cardElement.classList.add("matched");
        card2.cardElement.classList.add("matched");
        matchedCards.push(card1, card2);
    } else {
        setTimeout(() => {
            card1.cardElement.classList.remove("flipped");
            card1.cardElement.innerText = "?";
            card2.cardElement.classList.remove("flipped");
            card2.cardElement.innerText = "?";
        }, 1000);
    }

    flippedCards = [];

    if (matchedCards.length === cards.length) {
        setTimeout(() => alert("Gratulujeme, vyhráli jste!"), 500);
    }
}
