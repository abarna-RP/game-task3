const gameBoard = document.getElementById('gameBoard');
const restartButton = document.getElementById('restart');
let cards = [];
let flippedCards = [];
let matchedCards = [];
let lockBoard = false; 

const cardValues = ['A', 'B', 'C', 'D', 'A', 'B', 'C', 'D']; 

function createCards() {
    cardValues.sort(() => 0.5 - Math.random());
    cardValues.forEach(value => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front"></div>
                <div class="card-back">${value}</div> </div>
        `;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
        cards.push(card);
    });
}

function flipCard() {
    if (lockBoard) return; 
    if (this === flippedCards[0]) return; 

    this.classList.add('flipped');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

function checkForMatch() {
    let [card1, card2] = flippedCards;
    let value1 = card1.querySelector('.card-back').textContent;
    let value2 = card2.querySelector('.card-back').textContent;

    if (value1 === value2) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards.push(card1, card2);
        resetFlippedCards();

        if (matchedCards.length === cards.length) {
            setTimeout(() => {
                alert('You won!');
            }, 500);
        }
    } else {
        lockBoard = true; 
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            resetFlippedCards();
        }, 1000); 
    }
}


function resetFlippedCards() {
    flippedCards = [];
    lockBoard = false; 
}

function restartGame() {
    gameBoard.innerHTML = ''; 
    cards = [];
    flippedCards = [];
    matchedCards = [];
    lockBoard = false; 
    createCards();
}

createCards();
restartButton.addEventListener('click', restartGame);
