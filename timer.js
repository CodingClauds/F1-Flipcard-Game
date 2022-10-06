class MixAndMatch {
  constructor(totalTime, cards) {
    this.cardsArray = cards;
    this.totalTime = totalTime;
    this.timeRemaining = totalTime;

    this.timer = document.getElementById("time-remaining");
    this.ticker = document.getElementById("flips");
  }

  // Start game,initialize values to null / no value
  startGame() {
    this.totalClicks = 0;
    this.timeRemaining = this.totalTime;
    this.cardToCheck = null;
    this.matchedCards = [];
    this.busy = true;

    // Shuffle Cards onLoad/New game
    this.shuffleCards();

    // Delay to allow shuffle to finish
    setTimeout(() => {
      this.shuffleCards();
      this.countDown = this.startCountDown();
      this.busy = false;
    }, 500);

    // Reset
    this.hideCards();

    // Reseting the text when there is a new game.
    this.timer.innerText = this.timeRemaining;
    this.ticker.innerText = this.totalClicks;
  }

  hideCards() {
    this.cardsArray.forEach((card) => {
      card.classList.remove("visible");
      card.classList.remove("matched");
    });
  }

  shuffleCards() {
    for (let i = this.cardsArray.length - 1; i > 0; i--) {
      let randomIndex = Math.floor(Math.random() * (i + 1));

      // style.order is coming from the Display:Grid, it holds these properties.
      this.cardsArray[randomIndex].style.order = i;
      this.cardsArray[i].style.order = randomIndex;
    }
  }

  // Allows card to flip
  canFlipCard(card) {
    return (
      !this.busy &&
      !this.matchedCards.includes(card) &&
      card !== this.cardToCheck
    );
  }

  flipCards(card) {
    if (this.canFlipCard(card)) {
      this.totalClicks++;
      this.ticker.innerText = this.totalClicks;
      card.classList.add("visible");

      if (this.cardToCheck) {
        this.checkForMatchedCard(card);
      } else {
        this.cardToCheck = card;
      }
    }
  }

  checkForMatchedCard(card) {
    if (this.getCardType(card) === this.getCardType(this.cardToCheck)) {
      this.cardMatch(card, this.cardToCheck);
    } else {
      this.cardMisMatch(card, this.cardToCheck);
    }

    this.cardToCheck = null;
  }

  // Input Card and access through className => id => slice => id = id => match!
  getCardType(card) {
    return card.getElementsByClassName("game__driver-img")[0].id.slice(2);
  }

  cardMatch(card1, card2) {
    this.matchedCards.push(card1, card2);

    card1.classList.add("matched");
    card2.classList.add("matched");

    // When all cards are matched, you have won the game
    if (this.matchedCards.length === this.cardsArray.length) {
      this.victory();
    }
  }

  cardMisMatch(card1, card2) {
    this.busy = true;

    setTimeout(() => {
      card1.classList.remove("visible");
      card2.classList.remove("visible");
      this.busy = false;
    }, 1000);
  }

  // Victory Overlay
  victory() {
    clearInterval(this.countDown);
    document.getElementById("victory-text").classList.add("visible");
  }

  // Game over Overlay
  gameOver() {
    clearInterval(this.countDown);
    document.getElementById("game-over-text").classList.add("visible");
  }

  // Countdown timer expires = game over
  startCountDown() {
    return setInterval(() => {
      this.timeRemaining--;
      this.timer.innerText = this.timeRemaining;
      if (this.timeRemaining === 0) {
        this.gameOver();
      }
    }, 1000);
  }
}

function ready() {
  let overlays = Array.from(document.getElementsByClassName("overlay-text"));
  let cards = Array.from(document.getElementsByClassName("game__card"));
  let game = new MixAndMatch(100, cards);

  overlays.forEach((overlay) => {
    overlay.addEventListener("click", () => {
      overlay.classList.remove("visible");
      game.startGame();
    });
  });
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      game.flipCards(card);
    });
  });
}

// Game Loading Ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", ready());
} else {
  ready();
}

window.onload = () => {
  // Dynamic Date-Year, this will change once a year.
  const copyrightYear = document.getElementById("copyright-year");
  const today = new Date().getFullYear();

  copyrightYear.innerText = today;
};

class MixAndMatch {
  constructor(totalTime, cards) {
    this.cardsArray = cards;
    this.totalTime = totalTime;
    this.timeRemaining = totalTime;

    // these two below are just for the time remaining and amount of flips, extract from HTML
    this.timer = document.getElementById("time-remaining");
    this.ticker = document.getElementById("flips");
  }

  // Start game,initialize values to null / no value
  startGame() {
    this.totalClicks = 0;
    this.timeRemaining = this.totalTime;
    this.cardToCheck = null;
    this.matchedCards = [];
    this.busy = true;

    // Shuffle Cards onLoad/New game
    this.shuffleCards();

    // Delay to allow shuffle to finish
    setTimeout(() => {
      this.shuffleCards();
      this.countDown = this.startCountDown();
      this.busy = false;
    }, 500);

    // Reset
    this.hideCards();
    // Reseting the text when there is a new game.
    this.timer.innerText = this.timeRemaining;
    this.ticker.innerText = this.totalClicks;
  }

  hideCards() {
    this.cardsArray.forEach((card) => {
      card.classList.remove("visible");
      card.classList.remove("matched");
    });
  }

  shuffleCards() {
    for (let i = this.cardsArray.length - 1; i > 0; i--) {
      let randomIndex = Math.floor(Math.random() * (i + 1));

      // style.order is coming from the Display:Grid, it holds these properties.
      this.cardsArray[randomIndex].style.order = i;
      this.cardsArray[i].style.order = randomIndex;
    }
  }

  // Allows card to flip
  canFlipCard(card) {
    return (
      !this.busy &&
      !this.matchedCards.includes(card) &&
      card !== this.cardToCheck
    );
  }

  flipCards(card) {
    if (this.canFlipCard(card)) {
      this.totalClicks++;
      this.ticker.innerText = this.totalClicks;
      card.classList.add("visible");

      // double check that CURLY brace syntax doesn't effect outcome

      if (this.cardToCheck) {
        this.checkForMatchedCard(card);
      } else {
        this.cardToCheck = card;
      }
    }
  }

  // double check that CURLY brace syntax doesn't effect outcome
  checkForMatchedCard(card) {
    if (this.getCardType(card) === this.getCardType(this.cardToCheck)) {
      this.cardMatch(card, this.cardToCheck);
    } else {
      this.cardMisMatch(card, this.cardToCheck);
    }

    this.cardToCheck = null;
  }

  // Fucntion to grab the className and be able to match it using the src img-file.
  // is src[0] === src[0]
  getCardType() {
    return card.getElementsByClassName("card-value")[0].src;
  }

  cardMatch(card1, card2) {
    this.matchedCards.push(card1);
    this.matchedCards.push(card2);
    // this.matchedCards.push(card1, card2);???

    card1.classList.add("matched");
    card2.classList.add("matched");

    // When all cards are matched, you have won the game
    if (this.matchedCards.length === this.cardsArray.length) {
      this.victory();
    }
  }

  cardMisMatch(card1, card2) {
    this.busy = true;

    setTimeout(() => {
      card1.classList.remove("visible");
      card2.classList.remove("visible");
      this.busy = false;
    }, 1000);
  }

  startCountDown() {
    return setInterval(() => {
      this.timeRemaining--;
      this.timer.innerText = this.timeRemaining;
      if (this.timeRemaining === 0) {
        this.gameOver();
      }
    }, 1000);
  }

  victory() {
    clearInterval(this.countDown);
    document.getElementById("victory-text").classList.add("visible");
  }

  gameOver() {
    clearInterval(this.countDown);
    document.getElementById("game-over-text").classList.add("visible");
  }
}

function ready() {
  let overlays = Array.from(document.getElementsByClassName("overlay-text"));
  let cards = Array.from(document.getElementsByClassName("game__card"));
  let game = new MixAndMatch(100, cards);

  overlays.forEach((overlay) => {
    overlay.addEventListener("click", () => {
      overlay.classList.remove("visible");
      game.startGame();
    });
  });
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      game.flipCards(card);
    });
  });
}

// Game Loading Ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", ready());
} else {
  ready();
}
