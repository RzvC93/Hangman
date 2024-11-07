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
            span.textContent = '_ ';  
        }
        selectedWordDisplay.appendChild(span);
    }
}
displayWordWithBlanks();

function updateWordDisplay() {
    const guessedLetter = document.querySelector('.input-letter').value.trim().toLowerCase();
    const errorMsg = document.getElementById('error-msg');
    errorMsg.textContent = ""; 

    if (guessedLetter === "") {
        errorMsg.textContent = "Please enter a letter!";
        return;
    }

    if (correctLetters.includes(guessedLetter) || wrongLetters.includes(guessedLetter)) {
        errorMsg.textContent = "You already guessed that letter!";
        document.querySelector('.input-letter').value = "";
        return;
    }

    if (word.includes(guessedLetter)) {
        correctLetters.push(guessedLetter);
        displayWordWithBlanks();

        // Actualizează afișajul pentru literele corecte
        document.getElementById('correct-letters').textContent = "Correct Letters: " + correctLetters.join(", ");

        // Verifică dacă toate literele au fost ghicite
        const allLettersGuessed = word.split('').every(letter => correctLetters.includes(letter));
        if (allLettersGuessed) {
            errorMsg.textContent = "Congratulations! You've guessed the word!";

            // Resetează jocul după ce cuvântul a fost ghicit
            word = getRandomWord();  
            correctLetters = [];  
            wrongLetters = [];  
            noOfLives = 7;  
            hangmanStage.textContent = stages[0];  

            // Actualizăm afișările pentru cuvânt și litere
            displayWordWithBlanks();
            document.getElementById('correct-letters').textContent = "Correct Letters: ";
            document.getElementById('wrong-letters').textContent = "Wrong Letters: ";
            document.getElementById('no-of-lives').textContent = "Lives: " + noOfLives;
            document.querySelector('.input-letter').value = ""; 
            return; 
        }
    } else {
        wrongLetters.push(guessedLetter);
        document.getElementById('wrong-letters').textContent = "Wrong Letters: " + wrongLetters.join(", ");
        const gameOver = decreaseLives();
        if (gameOver) {
            return;  // Oprim execuția funcției dacă jocul este resetat din decreaseLives
        }
    }
    document.querySelector('.input-letter').value = ""; 
}

function decreaseLives() {
    const errorMsg = document.getElementById('error-msg');
    errorMsg.textContent = "";
    --noOfLives; 
    const livesDisplay = document.getElementById('no-of-lives');
    livesDisplay.innerHTML = "Lives: " + noOfLives;

    hangmanStage.textContent = stages[7 - noOfLives];

    // Verifică dacă jucătorul a rămas fără vieți
    if (noOfLives === 0) {
        errorMsg.textContent = ("Game Over! The word was: " + word);
        
        // Resetează jocul și începe cu un nou cuvânt
        word = getRandomWord();
        correctLetters = [];
        wrongLetters = [];
        noOfLives = 7;
        hangmanStage.textContent = stages[0]; 

        // Actualizăm afișările pentru cuvânt și litere
        displayWordWithBlanks();
        document.getElementById('correct-letters').innerHTML = "Correct Letters: ";
        document.getElementById('wrong-letters').innerHTML = "Wrong Letters: ";
        livesDisplay.innerHTML = "Lives: " + noOfLives;
        document.querySelector('.input-letter').value = ""; 
        return true;  // Oprim jocul, a început unul nou
    }
    return false;  // Continuăm jocul
}