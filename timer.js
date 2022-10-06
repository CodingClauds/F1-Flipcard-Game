window.onload = (event) => {
  console.log("page is fully loaded.");

  // Append to DOM section
  const timerSeconds = document.getElementById("seconds");

  const buttonStart = document.getElementById("button-start");
  const buttonStop = document.getElementById("button-stop");
  const buttonReset = document.getElementById("button-reset");

  // Initiate variables to their values
  let seconds = 0;
  let output = "00:00:00";
  let intervalID = {};

  // Display the text on the DOM as the string of 00:00:00
  timerSeconds.textContent = output;

  // When user clicks the start button execute code below/within => Start timer
  buttonStart.addEventListener("click", () => {
    console.log("START MY ENGINE");

    // This function displays time format, gives you the incriment in real time / dynamically
    intervalID = setInterval(function () {
      seconds++;
      let hours = Math.floor(seconds / 3600);
      let mins = Math.floor(seconds / 60) - hours * 60;
      let secs = Math.floor(seconds % 60);

      // PadStart(How many positions?, "what you want displayed").
      // This gives us the timer displayed as 00.
      output =
        hours.toString().padStart(2, "0") +
        ":" +
        mins.toString().padStart(2, "0") +
        ":" +
        secs.toString().padStart(2, "0");
      // console.log(output);
      timerSeconds.textContent = output;
    });
  });

  // buttonStop after using the setInterval, we use the clearInterval method to stop the timer and display the current time captured.
  buttonStop.addEventListener("click", () => {
    clearInterval(intervalID);
    console.log("STOP ME");
  });

  // buttonReset is used to remove all the numbers/ timer that has been captured and restate null.. back to 00:00:00
  buttonReset.addEventListener("click", () => {
    // console.log("RESET");
    seconds = 0;
    output = "00:00:00";
    console.log(output); // = 00:00:00

    // This is the way of appending text to the DOM
    timerSeconds.innerText = output;
  });

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
