const words = {
  animal: [
    "elephant",
    "giraffe",
    "penguin",
    "alligator",
    "cheetah",
    "bison",
    "camel",
    "goose",
    "cougar",
    "lizard",
  ],
  color: [
    "blue",
    "green",
    "red",
    "yellow",
    "purple",
    "taupe",
    "olive",
    "peach",
    "indigo",
    "cobalt",
    "copper",
    "gold",
  ],
  fruit: [
    "apple",
    "banana",
    "cherry",
    "grapes",
    "peach",
    "lychee",
    "orange",
    "pomegranate",
    "pommelo",
    "blueberry",
    "papaya",
    "tangerine",
    "watermelon",
    "raspberry",
  ],
};

let selectedWord = "";
let displayedWord = [];
let wrongGuessCount = 0;
let incorrectGuesses = [];
let score = 0;
const incorrectLettersContainer = document.getElementById("incorrect-letters");

document
  .getElementById("guessInput")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      checkGuess();
    }
  });

function chooseWord(theme) {
  const wordList = words[theme];
  selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
  displayedWord = Array(selectedWord.length).fill("_");
  updateDisplayedWord();
  updateHangmanImage(); // Ensure the hangman image is reset
}

function handleThemeChange() {
  resetGame();
  const theme = document.getElementById("theme").value;
  chooseWord(theme);
}

function updateDisplayedWord() {
  const wordContainer = document.getElementById("word-container");
  wordContainer.textContent = displayedWord.join(" ");
}

function checkGuess() {
  const guessInput = document.getElementById("guessInput");
  const guess = guessInput.value.toLowerCase();
  guessInput.value = "";

  if (guess.length !== 1 || !/[a-z]/.test(guess)) {
    alert("Please enter a single letter.");
    return;
  }

  if (selectedWord.includes(guess)) {
    for (let i = 0; i < selectedWord.length; i++) {
      if (selectedWord[i] === guess) {
        displayedWord[i] = guess;
      }
    }
    score += 10;
  } else {
    if (!incorrectGuesses.includes(guess)) {
      incorrectGuesses.push(guess);
      incorrectLettersContainer.textContent = incorrectGuesses.join(" ");
      wrongGuessCount++;
    }
  }

  updateDisplayedWord();
  updateHangmanImage();
  updateScore();

  if (displayedWord.join("") === selectedWord) {
    alert("Congratulations! You won!");
    resetGame();
  } else if (wrongGuessCount >= 6) {
    alert(`Game over! The word was: ${selectedWord}`);
    resetGame();
  }
}

function updateHangmanImage() {
  const hangmanImage = document.getElementById("hangmanImage");
  hangmanImage.src = getImageSrcForWrongGuess(wrongGuessCount);
}

function getImageSrcForWrongGuess(wrongGuessCount) {
  const images = [
    "empty.svg",
    "head.svg",
    "headbody.svg",
    "1arm.svg",
    "2arms.svg",
    "1leg.svg",
    "2legs.svg",
  ];
  return images[wrongGuessCount];
}

function updateScore() {
  document.getElementById("score").textContent = `Score: ${score}`;
}

function resetGame() {
  wrongGuessCount = 0;
  score = 0;
  incorrectGuesses = [];
  incorrectLettersContainer.textContent = "";
  updateHangmanImage();
  updateScore();
  updateDisplayedWord();
}

function usePowerUp(powerUp) {
  if (powerUp === "reveal") {
    revealLetter();
  } else if (powerUp === "extraGuess") {
    extraGuess();
  }
}

function revealLetter() {
  const hiddenIndexes = [];

  for (let i = 0; i < displayedWord.length; i++) {
    if (displayedWord[i] === "_") {
      hiddenIndexes.push(i);
    }
  }

  if (hiddenIndexes.length > 0) {
    const randomIndex =
      hiddenIndexes[Math.floor(Math.random() * hiddenIndexes.length)];
    displayedWord[randomIndex] = selectedWord[randomIndex];
    updateDisplayedWord();
  } else {
    alert("There are no hidden letters to reveal.");
  }
}

function extraGuess() {
  const cost = 10;
  if (score >= cost) {
    score -= cost;
    wrongGuessCount++;
    updateHangmanImage();
    updateScore();
  } else {
    alert("You don't have enough points to use this power-up.");
  }
}

// The code below is to execute the game
document.getElementById("newGameBtn").addEventListener("click", function () {
  resetGame();
  const theme = document.getElementById("theme").value;
  chooseWord(theme);
});
document.getElementById("theme").addEventListener("change", handleThemeChange);
chooseWord("animal");
