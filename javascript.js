/* 
  Game of Hangman.
  Devloper  : Beth 
  Date      : January 2024

  Purpose   : This is a project to display the use of javascript by playing hanngman

* / 



/* Define and initialise variables */
const imagePath =
  "assets/imgs/"; /* Set the directory path to images' folder   */

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

/* array of game words for playing Hangman */
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

/*   Define global vars and consts  */
let guessedLetters = [];
let remainingGuesses = 10;
let secretWord = "";
let index
let displayedWord

/* Constant elements */
const wordDisplay = document.getElementById("word-display");
const guessedLettersList = document.getElementById("guessed-letters-list");
const remainingGuessesSpan = document.getElementById("remaining-guesses");
let guessInput = document.getElementById("guess-input");
let messagesOut = document.getElementById("messages-out");
let messages;

function startGame() {
  /* Use Math.random to pick a random secretWord from the lsit of words */
  index = Math.floor(Math.random() * secretWords.length);
  secretWord = secretWords[index];

  /* display the ungessed word with dashes and display it */
  displayedWord = Array(secretWord.length).fill("_");

  /* Guessed letters (empty list) */
  guessedLetters = [];

  /* Amount of remaining guesses */
  remainingGuesses = 10;

  /* reset to initial hangman images */
  document.getElementById("hangedMan").src = imagePath + hangManImages[0];
  document.getElementById("guess-box").style.visibility = "visible";
  updateDisplay();
}

/* Update display */
function updateDisplay() {
  /*puts displayed word in word-display div */
  wordDisplay.textContent = displayedWord.join(" ");
  /* puts guessed letters in guessed-letters-list div */
  guessedLettersList.textContent = guessedLetters.join(", ");
  /* puts remaining guesses in guesses-left span */
  remainingGuessesSpan.textContent = remainingGuesses;
  /* clear input field */

  messagesOut.textContent = messages;
}

function validateInput(guess) {
  messages = "";

  /* if character not a-z */
  if (!guess.match(/[a-z]/)) {
    //     alert("Please enter a valid letter.");
    messages = "Please enter a valid letter.";
    return false;
  } else if (guess.length !== 1) {
    /* if more than 1 letter */
    //     alert("You can guess only 1 letter at a time.");
    messages = "You can guess only 1 letter at a time.";
    return false;
  } else if (guessedLetters.includes(guess)) {
    /* if character already guessed */
    // kk    alert("You've already guessed that letter.");
    messages = "You've already guessed that";
    return false;
  } else {
    messages = "";
    guessInput.textContent = "";
    return true;
  }
}

/* this function gets called when user submits their letter guessed */
function makeGuess() {
  let gameOver = false;

  var guess = document.getElementById("guess-input").value.toLowerCase();

  let validInput = validateInput(guess); // true or false

  console.log("validInput", validInput); //kk

  if (validInput) {
    messages = "";
    /* add user's letter to list of guessed letters */
    guessedLetters.push(guess);

    /* Check if guessed letter is in secret word */
    if (secretWord.includes(guess)) {
      messages = "✅";
      /* Iterate through secret word, update displayed word with correctly guessed letter*/
      for (let i = 0; i < secretWord.length; i++) {
        if (secretWord[i] === guess) {
          displayedWord[i] = guess;
        }
      }
    } else {
      /* Incorrect guess */
      remainingGuesses--;
      messages = "❌";
      /* display the next hangman image */
      let imageName = imagePath + hangManImages[10 - remainingGuesses];
      document.getElementById("hangedMan").src = imageName;
    }

    /* Check if the game is won or lost (compare displayed word & secret word) */
    if (displayedWord.join("") === secretWord) {
      //    alert("Congratulations! You've won!");
      messages = "You Won! 👑 ";
      gameOver = true;
    } else if (remainingGuesses === 0) {
      // alert("Sorry, you've run out of guesses. The word was: " + secretWord);
      messages = "Sorry , you lost ";
      gameOver = true;
    }
  }

  /* Update the display */
  updateDisplay();

  /* Clear the input field */
  guessInput.value = "";

  if (gameOver) {
    messages = "";
    document.getElementById("guess-box").style.visibility = "hidden";
    document.getElementById("newGame").style.visibility = "visible";
  }
}

/* Start the Game here  */
startGame();