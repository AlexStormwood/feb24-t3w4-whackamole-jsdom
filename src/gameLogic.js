
let gameTimeRemaining = 0;
let defaultGameDuration = 120;
let gameCountdownInterval = null;
let startGameButton = document.getElementById("startGameButton");
let stopGameButton = document.getElementById("stopGameButton");
let gameUpdateInterval = null;
let currentGameScore = 0;
let highestGameScore = 0;
let scoreDisplayText = document.getElementById("currentGameScore");
let highscoreDisplayText = document.getElementById("highScoreDisplay");
let timerDisplayText = document.getElementById("currentTimeRemaining");

// Game Score and Timer 

function gameTimeStep(){
	// update score displayed
	scoreDisplayText.innerText = "Score: " + currentGameScore;

	// update time remaining displayed
	timerDisplayText.innerText = "Time Remaining: " + gameTimeRemaining;
}































// if (gameTimeRemaining > 0){
// 
// }

function toggleGameControlButtons(){
	// check gameTimeRemaining

	// reveal or hide startGameButton

	// hide or reveal stopGameButton

	if (gameTimeRemaining > 0){
		// game has started
		startGameButton.style.display = "none";
		stopGameButton.style.display = "inherit";
	} else {
		// game has finished
		startGameButton.style.display = "inherit";
		stopGameButton.style.display = "none";
	}

}

toggleGameControlButtons();

function startGame(desiredGameTime = defaultGameDuration){
	gameTimeRemaining = desiredGameTime;
	// isGameRunning = true;
	console.log("Started the game. Game time remaining is now: " + gameTimeRemaining);

	// toggle game controls
	toggleGameControlButtons();

	gameCountdownInterval = setInterval(() => {
		gameTimeRemaining -= 1;
		console.log("Game time remaining is counting down, it is now... " + gameTimeRemaining);

		if (gameTimeRemaining <= 0){
			// if game has no time remaining, stop subtracting from it!
			clearInterval(gameCountdownInterval);
			console.log("Game has finished!");
			stopGame();
		}

	}, 1000);

	gameUpdateInterval = setInterval(gameTimeStep, 100);


}

// startGame(); // gameTimeRemaining becomes 120 
// startGame(60); // gameTimeRemaining becomes 60

function stopGame(){
	gameTimeRemaining = 0;
	
	// toggle game controls
	toggleGameControlButtons();

	console.log("Stopped the game. Game time remaining is now: " + gameTimeRemaining);
}

// null.addEventListener
// button.addEventListener
startGameButton.addEventListener("click", () => {
	startGame(3);
});

stopGameButton.addEventListener("click", () => {
	stopGame();
});














// let isGameRunning = false; 

// if (isGameRunning){
// 	// make moles appear to be whacked by the user 
// }

// if (isGameRunning){
// 	// decrease the time remaining 
// }

// if (isGameRunning){
// 	// hide the Start Game button 
// }
