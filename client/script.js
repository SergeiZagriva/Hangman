window.addEventListener('load', playButton);

let attemptedLetter = "";
let word;
let attempts = 0;
let remainingLetters;
let foundLetter = false;
let wordArray;
let points = 0;
let highestScore = 0;

const alphabet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z"];

alphabet.forEach((item, i) => {
    item.id = i+1;
    
});

//Creates an alphabet which will later be used for guesses
function createAlphabet() {
    const where = document.getElementById('alphabet');
    const list = document.createElement('ul');
    list.id = 'allLetters';
    where.appendChild(list);

    for (let i=0; i<alphabet.length; i++) {
        const letter = document.createElement('li');
        letter.id = `singleLetter${i}`;
        list.appendChild(letter);
        letter.append(alphabet[i]);
    }
}

// The words to choose from
let listOfWords = [

    'laugh',
    'structure',
    'uninterested',
    'opine',
    'hearing',
    'hang',
    'tangy',
    'activity',
    'mean',
    'optimal',
    'sink',
    'disappear',
    'ubiquitous',
    'right',
    'ray',
    'electric',
    'conscious',
    'fruit',
    'sail',
    'save', 

];
listOfWords = listOfWords.map(toUpper);

// The hints
let listOfHints = [
    'When you exert loud excited noises from your body while experiencing pleasure and enjoyment',
    'The arrangement of and relations between the parts or elements of something complex',
    'Not having any personal concern in something',
    "Hold and state as one's opinion",
    'The faculty of perceiving sounds',
    'Suspend or be suspended from above with the lower part dangling free',
    'Having a strong, piquant flavour or smell',
    'The condition in which things are happening or being done',
    'Intend to convey or refer to (a particular thing); signify',
    'Best or most favourable',
    'Go down below the surface of something, especially of a liquid',
    'Cease to be visible',
    'Present, appearing, or found everywhere',
    'Not left',
    'Any of a set of straight lines passing through one point',
    'Having or producing a sudden sense of thrilling excitement',
    "Aware of and responding to one's surroundings",
    'the sweet and fleshy product of a tree or other plant that contains seed and can be eaten as food',
    'A wind-catching apparatus attached to the arm of a windmill',
    'Keep and store up for future use', 
];


// Function for changing the word+response to upper case
function toUpper(x) {
    return x.toUpperCase()
}

//  The scoreboard
function scoreboard() {
    word = pickWords();
    wordArray = Array.from(word);
    remainingLetters = wordArray.length;
    for (let i = 0; i < word.length; i++) {
        wordArray[i] = " ";
    }

    const where = document.getElementById('word');
    const list = document.createElement('ul');
    list.id = 'wholeWord';
    where.appendChild(list);
    for (let i=0; i<wordArray.length; i++) {
        let oneLetter = document.createElement('li');
        oneLetter.id = `oneLetter${i}`;
        list.appendChild(oneLetter);
        oneLetter.textContent = wordArray[i];
        
    }
}

// Chooses the word from an array and allocates to scoreboard
function pickWords() {
    return listOfWords[Math.floor(Math.random() * listOfWords.length)];
}

// Pass the guess from a click to the checker
function scoreList(event) {
    attemptedLetter = document.getElementById(event.target.id).textContent.toUpperCase(); 
    foundLetter = false;
    let where = document.getElementById(event.target.id);
    where.removeEventListener('click', scoreList);
    where.style.opacity = 0.2;
    checker(attemptedLetter);

    showPoints();
    yourGuess();
}

// Checks the guess
function checker(attemptedLetter){
    for (let i=0; i<word.length; i++) {
        if (word[i] === attemptedLetter) {
            wordArray[i] = attemptedLetter;
            remainingLetters --;
            let oneLetter = document.getElementById(`oneLetter${i}`);
            oneLetter.textContent = attemptedLetter;
            foundLetter = true;
            points ++;
        } 
    }
}

//Clickable alphabet
function chooseLetter() {
    const letterPick = document.querySelectorAll('li');
    letterPick.forEach(element => {
        element.addEventListener('click', scoreList);
    }); 
}

//Checks your attempted letter 
function yourGuess(){
    if (points>=highestScore) {
        highestScore = points;
    }

    if (foundLetter === false) {
        attempts ++;
        drawPicture[attempts - 1]();
    } else if (remainingLetters === 0) {
        youWin();
    }
    if (attempts === 8) {
        youLose();
    }
    showPoints();


}

// Point counter 
async function showPoints() {
    const where = document.querySelector('#score');
    let scores = `Current score: ${points * 10}`;
    let highestPts = document.querySelector('#highScore');
    let highestScr = `\nHighest score: ${highestScore*10}`;
    highestPts.textContent = highestScr;
    where.textContent = scores;
}

// Draw the stick man
function canvas() {
    hangMan = document.getElementById('hangman');
    const c = hangMan.getContext('2d');
    c.strokeStyle = 'black';
    c.lineWidth = 6;
}

function line(x,y,x1,y1) {
    hangMan = document.getElementById('hangman');
    const c = hangMan.getContext('2d');
    c.beginPath();
    c.moveTo(x,y);
    c.lineTo(x1,y1);
    c.stroke();
}

function drawPlatformBot() {
    line(110, 140, 200, 140);
  }

function drawPlatformTop() {
    line(110, 30, 160, 30);
}

function drawPole() {
    line(120, 145, 120, 20);
}

function drawRope() {
    const c = hangMan.getContext('2d');
    c.lineWidth = 1.5;
    line(160, 30, 160, 54);
}

function drawBody() {
    const c = hangMan.getContext('2d');
    c.lineWidth = 3;
    line(160, 68, 160, 95);
}

function drawArms() {
    const c = hangMan.getContext('2d');
    c.lineWidth = 3;
    line(160, 67, 140, 80);
    line(160, 67, 180, 80);
}

function drawLegs() {
    const c = hangMan.getContext('2d');
    c.lineWidth = 3;
    line(160, 95, 140, 108);
    line(160, 95, 180, 108);
}

function drawHead() {
    hangMan = document.getElementById('hangman');
    const c = hangMan.getContext('2d');
    c.lineWidth = 3;
    c.beginPath();
    c.arc(160, 60, 8, 0, Math.PI*2, true);
    c.stroke();
}

const drawPicture = [
    drawPlatformBot,
    drawPole,
    drawPlatformTop,
    drawRope,
    drawHead,
    drawBody,
    drawArms,
    drawLegs
];

// Clear canvas 
function clearCanvas() {
    hangMan = document.querySelector('#hangman');
    const c = hangman.getContext('2d');
    c.clearRect(0, 0, hangman.width, hangman.height);
}

// Play button at the start of the page 
function playButton() {
    const button = document.querySelector('#play');
    button.addEventListener('click', startGame);
    button.addEventListener('click', hideBtn);

}

function hideBtn(){
    const button = document.querySelector('#play');
    button.remove();
    const startInfo = document.querySelector('#startinfo');
    startInfo.remove();
}

// Start game function
function startGame() {
    canvas();
    createAlphabet();
    scoreboard();
    chooseLetter();
    showPoints();
    startAgain();
    hintBtn();
}

// Start again button
function startAgain() {
    const startAgain = document.createElement('button');
    const where = document.querySelector('#menu');
    startAgain.id = 'playAgain';
    startAgain.textContent = 'Start again';
    where.appendChild(startAgain);
    startAgain.addEventListener('click', startGameAgain);
}

function startGameAgain() {
    attempts = 0;
    points = 0;
    foundLetter = false;

    let removeWord = document.querySelector('#word ul');
    let alphabet = document.querySelector('#alphabet ul');
    removeWord.remove();
    alphabet.remove();
    clearCanvas();
    canvas();
    scoreboard();
    createAlphabet();
    chooseLetter();
    showPoints();
    clearLossWindow();
}

// Winning situation
function youWin(){
    const createBg = document.createElement('div');
    createBg.id = 'winBg';
    document.body.appendChild(createBg);

    const createWindow = document.createElement('div');
    const heading = document.createElement('h1');
    createWindow.id = 'winWindow';
    heading.id = 'heading';
    document.body.appendChild(createWindow);
    createWindow.textContent = `\nYour score is ${points*10}.  \nYou can carry on with the same amount of lives or keep your score.`;
    
    createWindow.append(heading);
    heading.textContent = 'YOU WIN!';

    const carryOn = document.createElement('button');
    carryOn.className = 'winButtons';
    carryOn.textContent = 'Carry on';
    createWindow.append(carryOn);
    carryOn.addEventListener('click', carryOnFunc)

    const keepMyScore = document.createElement('button');
    keepMyScore.className = 'winButtons';
    keepMyScore.textContent = 'Keep my score'
    createWindow.append(keepMyScore);
    keepMyScore.addEventListener('click', keepScore);
}

function carryOnFunc() {
    const createBg = document.querySelector('#winBg');
    createBg.remove();
    const createWindow = document.querySelector('#winWindow');
    createWindow.remove();
    let removeWord = document.querySelector('#word ul');
    let alphabet = document.querySelector('#alphabet ul');
    removeWord.remove();
    alphabet.remove();
    scoreboard();
    createAlphabet();
    chooseLetter();
    showPoints();
    clearLossWindow();
    clearCanvas();
    canvas();
}

function keepScore(){
    document.getElementById('winWindow').remove();
    const createWindow = document.createElement('div');
    createWindow.id = 'winWindow';
    document.body.appendChild(createWindow);
    createWindow.textContent = `\nCongratulations! \n\nYour score is ${points*10}.\n\n\n\n`;
    const startAgain = document.createElement('button');
    const where = document.querySelector('#winWindow');
    startAgain.id = 'playAgain';
    startAgain.textContent = 'Start again';
    where.appendChild(startAgain);
    startAgain.addEventListener('click', startGameAgain);
}

// Losing situation
function youLose() {
    const createBg = document.createElement('div');
    createBg.id = 'winBg';
    document.body.appendChild(createBg);

    const createWindow = document.createElement('div');
    const heading = document.createElement('h1');
    createWindow.id = 'winWindow';
    heading.id = 'lossHeading';
    
    document.body.appendChild(createWindow);
    createWindow.textContent = `\nYour score is ${points*10}.`;
    
    createWindow.append(heading);
    heading.textContent = 'YOU LOSE.';

    startAfterLoss();
}

// Start the game after losing
function startAfterLoss() {
    const startNewGame = document.createElement('button');
    const where = document.querySelector('#winWindow');
    startNewGame.id = 'playAgain';
    startNewGame.textContent = 'Start again';
    where.appendChild(startNewGame);
    startNewGame.addEventListener('click', startGameAgain);
}

// Clear loss window
function clearLossWindow() {
    const createBg = document.querySelector('#winBg');
    createBg.remove();
    const createWindow = document.querySelector('#winWindow');
    createWindow.remove();
    const carryOn = document.querySelector('.winButtons');
    carryOn.remove();
}

// Hint button
function hintBtn() {
    const hintBtn = document.createElement('button');
    const where = document.querySelector('#menu');
    hintBtn.id = 'hintBtn';
    hintBtn.textContent = 'Hint';
    where.appendChild(hintBtn);
    hintBtn.addEventListener('click', hint);
}

function hint() {
    let wordIdx = listOfWords.indexOf(word);
    alert(listOfHints[wordIdx]);
}