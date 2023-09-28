import { MemoryGame } from './memory.js';

const cards = [
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' },
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' },
];

const memoryGame = new MemoryGame(cards);

const pairsClicked = document.querySelector('#pairs-clicked');
const pairsGuessed = document.querySelector('#pairs-guessed');
const endGameScreen = document.querySelector('.end-game-screen');

window.addEventListener('load', (event) => {
  memoryGame.shuffleCards();
  let html = '';
  memoryGame.cards.forEach((pic) => {
    html += `
      <div class="card" data-card-name="${pic.name}">
        <div class="back" name="${pic.img}"></div>
        <div class="front" style="background: url(img/${pic.img}) no-repeat"></div>
      </div>
    `;
  });

  // Add all the divs to the HTML
  document.querySelector('#memory-board').innerHTML = html;

  // Bind the click event of each element to a function
  document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('click', flipCard);
  });
});

function flipCard() {
  if (!memoryGame.isTwoCardsPicked()) {
    this.classList.add('turned');
    memoryGame.addToPicked(this);
  }

  if (memoryGame.isTwoCardsPicked()) {
    const [firstCard, secondCard] = memoryGame.pickedCards;
    checkForMatch(firstCard, secondCard);
    pairsGuessed.textContent = memoryGame.pairsGuessed;
  }
  pairsClicked.textContent = memoryGame.pairsClicked;
}

function checkForMatch(firstCard, secondCard) {
  const isPair = memoryGame.checkIsPair(
    firstCard.dataset.cardName,
    secondCard.dataset.cardName
  );

  if (isPair) {
    disableCards(firstCard, secondCard);
    memoryGame.resetPickedCards();

    if (memoryGame.checkIsFinished()) {
      endGame();
    }
  } else {
    unflipCards(firstCard, secondCard);
    memoryGame.resetPickedCards();
  }
}

function unflipCards(firstCard, secondCard) {
  setTimeout(() => {
    firstCard.classList.remove('turned');
    secondCard.classList.remove('turned');
  }, 1000);
}

function disableCards(firstCard, secondCard) {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
}

function endGame() {
  if (memoryGame.checkIsFinished()) {
    endGameScreen.showModal();
  }
}
