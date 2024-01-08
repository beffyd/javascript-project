/* Word to guess */
const secretWord = "javascript";

/* Displayed word (unguessed) */
let displayedWord = Array(secretWord.length).fill('_');

/* Guessed letters (empty list) */
let guessedLetters = [];

/* Amount of remaining guesses */

let remainingGuesses = 10;

/* Constant elements */
const wordDisplay = document.getElementById('word-display');
const guessedLettersList = document.getElementById('guessed-letters-list');
const remainingGuessesSpan = document.getElementById('remaining-guesses');

/* Initialize the display */
updateDisplay();


function updateDisplay() {
    wordDisplay.textContent = displayedWord.join(' ');
    guessedLettersList.textContent = guessedLetters.join(', ');
    remainingGuessesSpan.textContent = remainingGuesses;
}

function makeGuess() {
    const guessInput = document.getElementById('guess-input');
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
        /* if a character from the secret word has strict equality with the guess, then show guess on displayed word ^ */

        }
    } else {
        /* Incorrect guess, hide & display hangman images*/
        remainingGuesses--;
        if (remainingGuesses == 9) {
            document.getElementById("h01").style.display =
                "inline";
        }

        if (remainingGuesses == 8) {
            document.getElementById("h01").style.display =
                "none";

            document.getElementById("h02").style.display =
                "inline";
        }
    }

    if (remainingGuesses == 7) {
        document.getElementById("h02").style.display =
            "none";

        document.getElementById("h03").style.display =
            "inline";

    }

    if (remainingGuesses == 6) {
        document.getElementById("h03").style.display =
            "none";

        document.getElementById("h04").style.display =
            "inline";
    }

    if (remainingGuesses == 5) {
        document.getElementById("h04").style.display =
            "none";

        document.getElementById("h05").style.display =
            "inline";
    }

    if (remainingGuesses == 4) {
        document.getElementById("h05").style.display =
            "none";

        document.getElementById("h06").style.display =
            "inline";
    }

    if (remainingGuesses == 3) {
        document.getElementById("h05").style.display =
            "none";

        document.getElementById("h06").style.display =
            "inline";
    }

    if (remainingGuesses == 2) {
        document.getElementById("h06").style.display =
            "none";

        document.getElementById("h07").style.display =
            "inline";
    }

    if (remainingGuesses == 1) {
        document.getElementById("h07").style.display =
            "none";

        document.getElementById("h08").style.display =
            "inline";
    }

    if (remainingGuesses == 1) {
        document.getElementById("h08").style.display =
            "none";

        document.getElementById("h09").style.display =
            "inline";
    }

    /* Check if the game is won or lost (compare displayed word & secret word) */
    if (displayedWord.join('') === secretWord) {
        alert("Congratulations! You've won!");
        resetGame();
    } else if (remainingGuesses === 0) {
        alert("Sorry, you've run out of guesses. The word was: " + secretWord);
        resetGame();
    }

    /* Update the display */
    updateDisplay();

    /* Clear the input field */
    guessInput.value = '';
}

/* Reset the game */

function resetGame() {
    displayedWord = Array(secretWord.length).fill('_');
    guessedLetters = [];
    remainingGuesses = 10;
    updateDisplay();
}