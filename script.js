const stages = [
    `
    +---+
    |   |
    O   |
   /|\\  |
   / \\  |
        |
  =========`,
    `
    +---+
    |   |
    O   |
   /|\\  |
   /    |
        |
  =========`,
    `
    +---+
    |   |
    O   |
   /|\\  |
        |
        |
  =========`,
    `
    +---+
    |   |
    O   |
   /|   |
        |
        |
  =========`,
    `
    +---+
    |   |
    O   |
    |   |
        |
        |
  =========`,
    `
    +---+
    |   |
    O   |
        |
        |
        |
  =========`,
    `
    +---+
    |   |
        |
        |
        |
        |
  =========`  
];

const availableWords = [
    "tiger", "elephant", "monkey", "cow", "kangaroo", 
    "giraffe", "hippopotamus", "bear", "leopard", "panda", 
    "lynx", "zebra", "whale", "dolphin", "snake", "crocodile", 
    "wolf", "vulture", "owl", "pigeon"
];

const hangmanStage = document.getElementById('hangman-stage');
hangmanStage.textContent = stages[0];
let word = getRandomWord(); 
let correctLetters = [];
let wrongLetters = [];
let noOfLives = 7;

function getRandomWord() {
    const selectedWordIndex = Math.floor(Math.random() * availableWords.length);
    return availableWords[selectedWordIndex];
}

function displayWordWithBlanks() {
    const selectedWordDisplay = document.getElementById('display-word');
    selectedWordDisplay.innerHTML = "";

    for (let i = 0; i < word.length; ++i) {
        const span = document.createElement('span');
        span.id = "span-line";
        if (correctLetters.includes(word[i])) {
            span.textContent = word[i];  
        } else {
            span.textContent = ' ';  
        }
        selectedWordDisplay.appendChild(span);
    }
}
displayWordWithBlanks();

function updateWordDisplay() {
    const guessedLetter = document.querySelector(
        '.input-letter').value.trim().toLowerCase();
    const errorMsg = document.getElementById('error-msg');
    errorMsg.textContent = ""; 

    if (guessedLetter === "") {
        errorMsg.textContent = "Please enter a letter!";
        return;
    }

    if (correctLetters.includes(guessedLetter) || 
    wrongLetters.includes(guessedLetter)) {
        errorMsg.textContent = "You already guessed that letter!";
        document.querySelector('.input-letter').value = "";
        return;
    }

    if (word.includes(guessedLetter)) {
        correctLetters.push(guessedLetter); 
        displayWordWithBlanks();
        document.getElementById('correct-letters').textContent = 
            "Correct Letters: " + correctLetters.join(", ");

        if (checkWin()) return;
    } else {
        wrongLetters.push(guessedLetter);
        document.getElementById('wrong-letters').textContent = 
            "Wrong Letters: " + wrongLetters.join(", ");

        if(decreaseLives()) return;

    }
    document.querySelector('.input-letter').value = ""; 
}

function checkWin() {
    const allLettersGuessed = word.split('').every(
        letter => correctLetters.includes(letter)
    );

    if (allLettersGuessed) {
        document.getElementById('error-msg').textContent = 
            "Congratulations! You've guessed the word!";
        resetGame();
        return true;
    }
    return false;
}

function resetGame() {
    word = getRandomWord();  
    correctLetters = [];  
    wrongLetters = [];  
    noOfLives = 7;  
    hangmanStage.textContent = stages[0];  
    displayWordWithBlanks();
    document.getElementById('correct-letters').textContent = "Correct Letters: ";
    document.getElementById('wrong-letters').textContent = "Wrong Letters: ";
    document.getElementById('no-of-lives').textContent = "Lives: " + noOfLives;
    document.querySelector('.input-letter').value = ""; 
}

function decreaseLives() {
    const errorMsg = document.getElementById('error-msg');
    errorMsg.textContent = "";
    --noOfLives; 

    document.getElementById('no-of-lives').innerHTML = "Lives: " + noOfLives;
    hangmanStage.textContent = stages[7 - noOfLives];

    if (noOfLives === 0) {
        errorMsg.textContent = ("Game Over! The word was: " + word);
        resetGame();
        return true; 
    }
    return false;  
}