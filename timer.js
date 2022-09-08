window.onload = (event) => {
  console.log("page is fully loaded.");

  // Append to DOM section
  const timerSeconds = document.getElementById("seconds");

  const buttonStart = document.getElementById("button-start");
  const buttonStop = document.getElementById("button-stop");
  const buttonReset = document.getElementById("button-reset");

  let seconds = 0;
  let intervalID;

  timerSeconds.innerText = "00:00:00";

  buttonStart.addEventListener("click", () => {
    intervalID = setInterval(function () {
      seconds++;
      let hours = Math.floor(seconds / 3600);
      let mins = Math.floor(seconds / 60) - hours * 60;
      let secs = Math.floor(seconds % 60);

      // padStart(how many positions, "what you want displayed") gives us the 00 counter.
      const output =
        hours.toString().padStart(2, "0") +
        ":" +
        mins.toString().padStart(2, "0") +
        ":" +
        secs.toString().padStart(2, "0");
      //   console.log(output);
      timerSeconds.textContent = output;
    });
  });

  buttonStop.addEventListener("click", () => {
    clearInterval(intervalID);
    console.log("STOP ME");
  });

  buttonReset.addEventListener("click", () => {
    console.log("RESET Bishhh");

    // Re-state variables again to "null" in theory
    timerSeconds.innerText = "00:00:00";
  });
};
