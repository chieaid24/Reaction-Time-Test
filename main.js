// these create variables that represent the divs / objects in the HTML.
// These can be changed manipulated using javascript
const mainMenu = document.querySelector(".main-menu");
const clickableArea = document.querySelector(".clickable-area");
const message = document.querySelector(".clickable-area .message");
const endScreen = document.querySelector(".end-screen");
const reactionTimeText = document.querySelector(".end-screen .reaction-time-text");
const playAgainBtn = document.querySelector(".end-screen .play-again-btn")

//initize variables
let timer;
let greenDisplayed;
let timeNow;
let waitingForStart;
let waitingForGreen;
let scores;

//the starting screen that is called initially
const init = () => {
    greenDisplayed = false;
    waitingForStart = false;
    waitingForGreen = false;
    scores = [];
};

init();

//function that sets the green screen
const setGreenColor = () => {
    //.style changes the css of the variable
    clickableArea.style.backgroundColor = "#7EFF72";
    //.innerHTML actually changes the div text
    message.innerHTML = "CLICK NOW!";
    message.style.color = "#111";
    greenDisplayed = true;
    //starts "timer"
    timeNow = Date.now();
}

//initializes the clickable "wait for green" screen
const startGame = () => {
    clickableArea.style.backgroundColor = "#c1121f";
    message.innerHTML = "Wait for Green...";
    message.style.fontFamily = "Segoe UI";
    message.style.color = "#fff";
    message.style.fontSize = "100px";

    //generate random number
    let randomNumber = Math.floor(Math.random() * 2000 + 1500);
    //when random number time passes, call setGreenColor method
    timer = setTimeout(setGreenColor, randomNumber);
    waitingForStart = false;
    waitingForGreen = true;
};

//when on mainmenu and clicked, removed the active class from mainmenu
mainMenu.addEventListener("mousedown", () => {
    mainMenu.classList.remove("active");
    startGame();
});

//method ends the game, shows end screen, and calculates average reaction
//time
const endGame = () => {
    endScreen.classList.add("active");
    clearTimeout(timer);

    //add all scores together
    let total = 0;
    scores.forEach((s) => {
        total += s;
    })

    //create average score
    let averageScore = Math.round(total / scores.length);
    console.log("Total" + total);
    console.log("average score: " + averageScore)

    //change innerHTML to the variable with this syntax
    reactionTimeText.innerHTML = `${averageScore} ms`;
};

//after every trial, this is shown
const displayReactionTime = (rt) => {
    clickableArea.style.backgroundColor = "#faf0ca";
    //create a new div? that shows the reaction time as a variable,
    //changes "click now" text to "click to continue"
    message.innerHTML = `<div class='reaction-time-text'>${rt} ms</div>Click to continue.`;
    greenDisplayed = false;
    waitingForStart = true;
    scores.push(rt);
    console.log("scores " + scores)

    if (scores.length >= 5) {
        endGame();
    }
}

const displayTooSoon = () => {
    clickableArea.style.backgroundcolor = "#fa5a87";
    message.innerHTML = "You clicked too soon.";
    message.style.color = "#fff";
    waitingForStart = true;
    clearTimeout(timer);
}

clickableArea.addEventListener("mousedown", () => {
    if (greenDisplayed) {
        let clickTime = Date.now();
        let reactionTime = (clickTime - timeNow);
        console.log("reaction time " + reactionTime);
        displayReactionTime(reactionTime);
        return;
    }

    if (waitingForStart) {
        startGame();
        return;
    }

    if (waitingForGreen) {
        displayTooSoon();
    }
});

playAgainBtn.addEventListener("mousedown", () => {
    endScreen.classList.remove("active");
    init();
    waitingForStart = true;
    mainMenu.classList.add("active");
    //startGame();
})