export class MemoryGame {
  constructor(cards) {
    this.cards = cards;
    this.pickedCards = [];
    this.pairsClicked = 0;
    this.pairsGuessed = 0;
  }

  shuffleCards() {
    //optimized version of Fisher-Yates:
    if (!this.cards) {
      return undefined;
    }

    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }

    return this.cards;
  }

  checkIsPair(card1, card2) {
    this.pairsClicked++;
    if (card1 === card2) {
      this.pairsGuessed++;
      return true;
    } else {
      return false;
    }
  }

  checkIsFinished() {
    return this.cards.length / 2 === this.pairsGuessed ? true : false;
  }

  addToPicked(name) {
    this.pickedCards.push(name);
  }

  isTwoCardsPicked() {
    return this.pickedCards.length === 2 ? true : false;
  }

  resetPickedCards() {
    this.pickedCards = [];
  }
}
