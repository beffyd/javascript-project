/* Word to guess */

// -- Komal ------------- start --

/* Set the directory path to images' folder  */
const imagePath = "assets/imgs/";

/* array of image names  */
let hangManImages = [
  "01.png",
  "02.png",
  "03.png",
  "04.png",
  "05.png",
  "06.png",
  "07.png",
  "08.png",
  "09.png",
  "10.png",
  "11.png",
];

/* array of game words */
let secretWords = [
  "apple",
  "banana",
  "javascript",
  "python",
  "html",
  "css",
  "jinx",
  "beffy",
];

/* Use Math.random to fetch a random secretWord for game play */
index = Math.floor(Math.random() * secretWords.length);
let secretWord = secretWords[index];

// -- komal ----------- end ---- >

/* Displayed word (unguessed) */
let displayedWord = Array(secretWord.length).fill("_");

/* Guessed letters (empty list) */
let guessedLetters = [];

/* Amount of remaining guesses */
let remainingGuesses = 10;

/* Constant elements */
const wordDisplay = document.getElementById("word-display");
const guessedLettersList = document.getElementById("guessed-letters-list");
const remainingGuessesSpan = document.getElementById("remaining-guesses");

/* Update display */
function updateDisplay() {
  /*puts displayed word in word-display div */
  wordDisplay.textContent = displayedWord.join(" ");
  /* puts guessed letters in guessed-letters-list div */
  guessedLettersList.textContent = guessedLetters.join(", ");
  /* puts remaining guesses in guesses-left span */
  remainingGuessesSpan.textContent = remainingGuesses;
}

function makeGuess() {
  const guessInput = document.getElementById("guess-input");
  const guess = guessInput.value.toLowerCase();
  /* if character not a-z */
  if (!guess.match(/[a-z]/)) {
    alert("Please enter a valid letter.");
    return;
  }
  /* if more than 1 letter */
  if (guess.length !== 1) {
    alert("You can guess only 1 letter at a time.");
    return;
  }
  /* if character already guessed */
  if (guessedLetters.includes(guess)) {
    alert("You've already guessed that letter.");
    return;
  }

  guessedLetters.push(guess);

  /* Check if guessed letter is in secret word */
  if (secretWord.includes(guess)) {
    /* Iterate through secret word, update displayed word with correctly guessed letter*/
    for (let i = 0; i < secretWord.length; i++) {
      if (secretWord[i] === guess) {
        displayedWord[i] = guess;
      }
    }
    /* if a character from the secret word has strict equality with the guess, then show guess on displayed word ^ */
  } else {
    /* Incorrect guess, hide & display hangman images*/
    remainingGuesses--;
  }

  // <-- Komal ----------------------------------------------------- start ---->

  /* set the image src name using number of incorrect guessess already made */
  let imageName = imagePath + hangManImages[10 - remainingGuesses];
  document.getElementById("hangedMan").src = imageName;

  // -- komal -------------------------------------------------------- end ----- >

  /* Check if the game is won or lost (compare displayed word & secret word) */
  if (displayedWord.join("") === secretWord) {
    alert("Congratulations! You've won!");
    resetGame();
  } else if (remainingGuesses === 0) {
    alert("Sorry, you've run out of guesses. The word was: " + secretWord);
    resetGame();
  }

  /* Update the display */
  updateDisplay();

  /* Clear the input field */
  guessInput.value = "";
}

/* Reset the game */
function resetGame() {
  displayedWord = Array(secretWord.length).fill("_");
  guessedLetters = [];
  remainingGuesses = 10;
  updateDisplay();
  // -- Komal ----- start ---- set initial image to default
  document.getElementById("hangedMan").src = imagePath + hangManImages[0];
  // -- Komal -- end
}

/* Initialize the display */
updateDisplay();