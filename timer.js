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
