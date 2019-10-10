var gameWords = ["blue", "red", "yellow", "green", "purple"]

function randomWord(words) {
    return words[Math.floor(Math.random() * words.length)];
}

function isCorrectGuess(word, letter) {
    return word.indexOf(letter) >= 0;
}

function getBlanks(word) {
    var letterCount = word.length;

    var blanks = [];

    for (var i = 0; i < letterCount; i++) {
        blanks.push("_");
    }

    return blanks;
}

function fillBlanks(word, puzzleState, letter) {
    for (var i = 0; i < word.length; i++) {
        if (word[i] === letter) {
            puzzleState[i] = letter;
        }
    }

    return puzzleState;
}

function setupRound(word) {
    var blanks = getBlanks(word);

    return {
        word: word,
        guessesLeft: 9,
        wrongGuesses: [],
        puzzleState: blanks
    };
}

function updateRound(round, letterGuessed) {
    if (isCorrectGuess(round.word, letterGuessed)) {
        round.puzzleState = fillBlanks(round.word, round.puzzleState, letterGuessed);
    } else {
        round.wrongGuesses.push(letterGuessed);
        round.guessesLeft -= 1;
    }
}

function hasWon(puzzleState) {
    return puzzleState.indexOf("_") === -1;
}

function hasLost(guessesLeft) {
    return guessesLeft === 0;
}

function isEndOfRound(round) {
    return hasWon(round.puzzleState) || hasLost(round.guessesLeft);
}

function setupGame(words, wins, losses) {
    var round = setupRound(randomWord(words));

    return {
        words: words,
        wins: wins,
        losses: losses,
        round: round
    };
}

function startNewRound(game) {
    var currentRound = game.round;

    if (hasWon(currentRound.puzzleState)) {
        game.wins += 1;
        alert("You won! The word was " + currentRound.word);
    } else if (hasLost(currentRound.guessesLeft)) {
        game.losses += 1;
        alert("You lost :( The word was " + currentRound.word);
    }

    game.round = setupRound(randomWord(game.words));
}

var myGame = setupGame(gameWords, 0, 0);


function updatePage(game) {
    document.getElementById("guesses-left").innerHTML = game.round.guessesLeft;

    document.getElementById("puzzle-state").innerHTML = game.round.puzzleState.join(" ");

    document.getElementById("wrong-guesses").innerHTML = game.round.wrongGuesses.join(" ");

    document.getElementById("win-counter").innerHTML = game.wins;

    document.getElementById("loss-counter").innerHTML = game.losses;
}

document.onkeyup = function handleKeypress(event) {
    if (event.keyCode >= 65 && event.keyCode <= 90) {

        var letterGuessed = event.key.toLowerCase();

        updateRound(myGame.round, letterGuessed);

        if (isEndOfRound(myGame.round)) {
            startNewRound(myGame);
        }
        updatePage(myGame);
    }
};

updatePage(myGame);