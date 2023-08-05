const fiveLetterWord = require("./words.json");
const prompt = require("prompt");
const chalk = require("chalk");
const { Console } = require("console");

// Start the prompt
prompt.start();

// get a random word (answer)
function getRandomWord() {
  console.log("fiveLetterWord--->", fiveLetterWord);
  return fiveLetterWord[
    Math.floor(Math.random() * fiveLetterWord.length)
  ].toUpperCase();
}

// get uses' guess
async function getGuess() {
  const guess = await prompt.get("guess");
  return guess.guess.toUpperCase();
}

// letter in the correct position
// letter in the word, but not in correct position
// letter not in word

// apple
// cream

function showWordWithHighlights(expectedWord, guess) {
  let wordWithHighlights = "";

  for (let i = 0; i <= 4; i++) {
    if (expectedWord[i] === guess[i]) {
      wordWithHighlights += chalk.bgGreenBright.black(guess[i]);
    } else if (expectedWord.includes(guess[i])) {
      wordWithHighlights += chalk.bgYellowBright.black(guess[i]);
    } else {
      wordWithHighlights += chalk.bgGray.black(guess[i]);
    }
  }
   console.log(wordWithHighlights);
}

// function printChar(expectedChar, style) {
//   if (style === "green") {
//     return chalk.bgGreenBright.black(expectedChar);
//   } else if (style === "yellow") {
//     return chalk.bgYellowBright.yellow(expectedChar);
//   } else {
//     return chalk.bgGray(expectedChar);
//   }
// }
async function playGame() {
  const expectedWord = getRandomWord();
  console.log(`The answer is ${expectedWord}`);
  const totalGuessesAllowed = 6;
  console.log("expectedWord--->", expectedWord);

  let guessNumber = 1;

  do {
    let guess = await getGuess();
    console.log(`User guessed ${guess}`);

    // check if it guess is correct

    if (guess === expectedWord) {
      console.log(`You've got it in ${guessNumber} guesses`);
      return;
    } else {
      showWordWithHighlights(expectedWord, guess);
      console.log(`You have ${totalGuessesAllowed - guessNumber} guesses left`);
    }
    guessNumber++;
  } while (guessNumber <= totalGuessesAllowed);
  console.log(`Sorry! The word was ${expectedWord}. Better luck next time :)`);
}

playGame();
