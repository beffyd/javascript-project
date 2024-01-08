// Word to guess
const secretWord = "javascript";

// Displayed word
let displayedWord = Array(secretWord.length).fill('_');

// Guessed letters
let guessedLetters = [];

// Remaining guesses
let remainingGuesses = 10;

// Elements
const wordDisplay = document.getElementById('word-display');
const guessedLettersList = document.getElementById('guessed-letters-list');
const remainingGuessesSpan = document.getElementById('remaining-guesses');

// Initialize the display
updateDisplay();

function updateDisplay() {
    wordDisplay.textContent = displayedWord.join(' ');
    guessedLettersList.textContent = guessedLetters.join(', ');
    remainingGuessesSpan.textContent = remainingGuesses;
}

function makeGuess() {
    const guessInput = document.getElementById('guess-input');
    const guess = guessInput.value.toLowerCase();

    if (!guess.match(/[a-z]/)) {
        alert("Please enter a valid letter.");
        return;
    }

    if (guess.length !== 1) {
        alert("Please guess only one letter at a time.");
        return;
    }

    if (guessedLetters.includes(guess)) {
        alert("You've already guessed that letter.");
        return;
    }

    guessedLetters.push(guess);

    if (secretWord.includes(guess)) {
        // Update displayed word with correctly guessed letters
        for (let i = 0; i < secretWord.length; i++) {
            if (secretWord[i] === guess) {
                displayedWord[i] = guess;
            }
        }
    } else {
        // Incorrect guess
        remainingGuesses--;
    }

    // Check if the game is won or lost
    if (displayedWord.join('') === secretWord) {
        alert("Congratulations! You've won!");
        resetGame();
    } else if (remainingGuesses === 0) {
        alert("Sorry, you've run out of guesses. The word was: " + secretWord);
        resetGame();
    }

    // Update the display
    updateDisplay();

    // Clear the input field
    guessInput.value = '';
}

function resetGame() {
    displayedWord = Array(secretWord.length).fill('_');
    guessedLetters = [];
    remainingGuesses = 10;
    updateDisplay();
}