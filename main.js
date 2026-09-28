let gameContainer = document.querySelector(".game");
let boxs = document.querySelectorAll(".box");
let cards = Array.from(boxs);
let orderRange = Array.from(Array(cards.length).keys());
let nameSection = document.querySelector(".nameSection");
let playerNameInput = document.getElementById("Name");
let startButton = document.querySelectorAll("#startGame");
let playerName = document.querySelector(".playerName");
let timeLeft = document.querySelector(".timeLeft");
let wrongTriesCount = document.querySelector(".wrongTriesCount");
let countdown = null;
let winSection = document.querySelector(".winSection");
let spentTime = document.querySelector(".spentTimeValue");
let triesDone = document.querySelector(".triesDoneValue");

shuffle(orderRange);

startButton.forEach((button) => {
  button.addEventListener("click", () => {
    playerNameValue = playerNameInput.value;
    nameSection.remove();
    winSection.style.display = "none";
    boxs.forEach((box) => {
      box.classList.remove("no-click", "matched", "flip");
    });
    setTimeout(() => {
      shuffle(orderRange);
    }, 500);
    playerName.textContent = playerNameValue;
    gameContainer.classList.remove("no-click");
    timer();
  });
});

function timer() {
  let timerCount = 60;
  countdown = setInterval(() => {
    timerCount--;
    timeLeft.textContent = timerCount;
    if (timerCount === 0) {
      clearInterval(countdown);
      gameContainer.classList.add("no-click");
      Swal.fire({
        title: "Game Over!",
        text: "Click OK to try again.",
        imageUrl: "/images/delete.png",
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: "Custom image",
      }).then((result) => {
        if (result.isConfirmed) {
          gameContainer.classList.remove("no-click");
          cards.forEach((card) => {
            card.classList.remove("no-click", "matched", "flip");
          });
          shuffle(orderRange);
          timer();
        }
      });
      cards.forEach((card) => {
        card.classList.add("no-click");
      });
    }
  }, 1000);
  timeLeft.textContent = 60;
}


function shuffle(array) {
  boxs.forEach((box) => {
      box.classList.remove("no-click", "matched", "flip");
    });
  for (let i = array.length - 1; i > 0; i--) {
    let random = Math.floor(Math.random() * (i + 1));
    // تبديل الأماكن بين العناصر
    [array[i], array[random]] = [array[random], array[i]];
  }
  cards.forEach((card, index) => {
    card.style.order = orderRange[index];
  });
  return array;
}

boxs.forEach((box) => {
  box.addEventListener("click", () => {
    box.classList.add("flip");
    let sound = box.querySelector("audio");
    sound.play();
    check();
  });
});

function check() {
  let fliped = document.querySelectorAll(".flip");
  let flipArray = Array.from(fliped);
  if (flipArray.length === 2) {
    gameContainer.classList.add("no-click");
    if (flipArray[0].dataset.name === flipArray[1].dataset.name) {
      flipArray.forEach((box) => {
        box.classList.add("no-click");
        box.classList.add("matched");
        box.classList.remove("flip");
        gameContainer.classList.remove("no-click");
      });
    } else {
      setTimeout(() => {
        flipArray.forEach((box) => {
          box.classList.remove("flip");
          gameContainer.classList.remove("no-click");
        });
      }, 1000);
      wrongTriesCount.textContent = parseInt(wrongTriesCount.textContent) + 1;
    }
  }
  win();
}

function win() {
  let matchedCards = document.querySelectorAll(".matched");
  if (matchedCards.length === 18) {
    clearInterval(countdown);
    setTimeout(() => {
      winSection.style.display = "flex";
    }, 1000);
    spentTime.textContent = timeLeft.textContent;
    triesDone.textContent = wrongTriesCount.textContent;
  }
}
