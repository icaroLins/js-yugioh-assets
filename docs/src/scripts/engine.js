const state = {
    score: {
        playerScore: 0,
        computerScore: 0,
        scoreBox: document.getElementById("score_points"),
    },
    cardSprites: {
        avatar: document.getElementById("card-image"),
        name: document.getElementById("card-name"),
        type: document.getElementById("card-type"),
    },
    fieldCards: {
        player: document.getElementById("player-field-card"),
        computer: document.getElementById("computer-field-card"),
    },
    playerSides: {
    player1: "player-cards",
    player1BOX: document.querySelector("#player-cards"),
    computer: "computer-cards",
    computerBOX: document.querySelector("#computer-cards"),
    },

    actions: {
        button: document.getElementById("next-duel"),
    },
};

const pathImages = "./src/assets/icons/";

const cardData = [
    {
        id: 0,
        name: "Blue Eyes White Dragon",
        type: "paper",
        img: `${pathImages}dragon.png`,
        WinOf: [1],
        LoseOf: [2],
    },
    {
        id: 1,
        name: "Dark Magician",
        type: "rock",
        img: `${pathImages}magician.png`,
        WinOf: [2],
        LoseOf: [0],
    },
    {
        id: 2,
        name: "Exodia",
        type: "scissors",
        img: `${pathImages}exodia.png`,
        WinOf: [0],
        LoseOf: [1],
    }
];

const playerSides = {
    player1: "player-cards",
    player1BOX: document.querySelector("#player-cards"),
    computer: "computer-cards",
    computerBOX: document.querySelector("#computer-cards"),
};

// Supondo que essas funções existam:
async function getRandomCardId() {
    const index = Math.floor(Math.random() * cardData.length);
    return index;
}

function drawSelectCard(cardId) {
    const card = cardData[cardId];
    state.cardSprites.avatar.src = card.img;
    state.cardSprites.name.innerText = card.name;
    state.cardSprites.type.innerText = card.type;
}

function setCardsField(cardId) {
    // lógica para colocar carta no campo
}

// Cria a imagem da carta
async function createCardImage(cardId, fieldSide) {
    const cardImage = document.createElement("img");
    cardImage.setAttribute("height", "100px");
    cardImage.setAttribute("src", "./src/assets/icons/card-back.png");
    cardImage.setAttribute("data-id", cardId);
    cardImage.classList.add("card");

    if (fieldSide === playerSides.player1) {
         cardImage.addEventListener("mouseover", () => {
        drawSelectCard(cardId);
         });

        cardImage.addEventListener("click", () => {
        setCardsField(cardImage.getAttribute("data-id"));
        });
        
    }


    return cardImage;
}

async function setCardsField(cardId){ 
await removeAllCardsImages();
let computerCardId = await getRandomCardId();
state.fieldCards.player.style.display = "block";
state.fieldCards.computer.style.display = "block";
state.fieldCards.player.src = cardData[cardId].img; 
state.fieldCards.computer.src = cardData[computerCardId].img

let duelResults = await checkDuelResults(cardId, computerCardId);

await updateScore();
await drawButton(duelResults);
}

async function drawButton(text) {
state.actions.button.innerText = text;
state.actions.button.style.display = "block";
}

async function updateScore(){
    state.score.scoreBox.innerText = `Win: ${(state.score.playerScore)} | Lose: ${state.score.computerScore}`;
}

async function checkDuelResults(playerCardId, ComputerCardId){ 
    let duelResults = "Empate" 
    let playerCard = cardData[playerCardId];
    if(playerCard.WinOf.includes(ComputerCardId)){
        duelResults = "win";
        state.score.playerScore++;
    }
    if (playerCard.LoseOf.includes(ComputerCardId)){
        duelResults = "lose";
        state.score.computerScore++;
}

await playAudio(duelResults);

return duelResults
}

async function removeAllCardsImages(){
let { computerBOX, player1BOX } = state.playerSides;
let imgElements = computerBOX.querySelectorAll("img"); 
imgElements.forEach((img) => img.remove());


imgElements = player1BOX.querySelectorAll("img"); 
imgElements.forEach((img) => img.remove());
}

async function drawSelectCard(index) {
state.cardSprites.avatar.src = cardData[index].img; 
state.cardSprites.name.innerText = cardData[index].name; 
state.cardSprites.type.innerText = "Attibute : " + cardData [index].type;
}


// Desenha um número específico de cartas
async function drawCards(cardNumbers, fieldSide) {
    for (let i = 0; i < cardNumbers; i++) {
        const randomIdCard = await getRandomCardId();
        const cardImage = await createCardImage(randomIdCard, fieldSide);
        document.getElementById(fieldSide).appendChild(cardImage);
    }
}

async function playAudio(status){
const audio = new Audio(`./src/assets/audios/${status}.wav`); 
audio.play();
}

async function resetDuel(){
state.cardSprites.avatar.src = "";

state.actions.button.style.display = "none";
state.fieldCards.player.style.display - "none";
state.fieldCards.computer.style.display = "none";

init();
}

// Função principal
function init() {
    drawCards(5, playerSides.player1);
    drawCards(5, playerSides.computer);
}

init();



