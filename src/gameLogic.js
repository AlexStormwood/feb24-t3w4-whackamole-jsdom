
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
let gameRunningInfoContainer = document.getElementById("gameRunningInfo");
let gamePlayContainer = document.getElementById("gameplayArea");
let spawnableAreas = document.getElementsByClassName("whackamoleSpawnArea");
let spawningInterval = null;

// because of function hoisting, we can call these functions before they are declared!
// These are called as soon as the page loads:
toggleGameControlButtons();
toggleGameplayContent();
updateHighScore();

Array.from(spawnableAreas).forEach(area => {
	area.addEventListener("click", (event) => {
		whackamoleHandleClick(event);
	});
});



// Game Score and Timer 

function gameTimeStep(){
	// update score displayed
	scoreDisplayText.innerText = "Score: " + currentGameScore;

	// update time remaining displayed
	timerDisplayText.innerText = "Time Remaining: " + gameTimeRemaining;

	// update the highscore based on score ASAP
	updateHighScore();
}



async function spawnMole(){
	// pick a random spawnable area
	let randomNumberWithinArrayRange = Math.floor(Math.random() * spawnableAreas.length);
	let chosenSpawnArea = spawnableAreas[randomNumberWithinArrayRange];

	// grab an image from PokeAPI 
	let randomPokemonNumber = Math.floor(Math.random() * 1025) + 1;
	let apiResponse = await fetch("https://pokeapi.co/api/v2/pokemon/" + randomPokemonNumber);
	let apiData = await apiResponse.json();

	// create img with src from PokeAPI 
	// let whackamoleImage = document.createElement("img");
	// whackamoleImage.src = apiData.sprites.other.home.front_default;

	// put img into spawnable area 
	chosenSpawnArea.src = apiData.sprites.other.home.front_default;

	// chosenSpawnArea.appendChild(whackamoleImage);
}

function wipeImagesFromSpawningAreas(){
	// loop through spawnableAreas
	// set the src property of each thing to ""
	console.log(spawnableAreas);
	Array.from(spawnableAreas).forEach(area => {
		area.src = "";
	});
}

function whackamoleHandleClick(event){
	if (event.target.src != ""){
		currentGameScore++;
		event.target.src = "";
		console.log("Clicked on a mole! Score increased, it's now: " + currentGameScore);
	}
}












function toggleGameplayContent(){
	// toggle the score, timer text, and game area elements
	if (gameTimeRemaining > 0){
		gameRunningInfoContainer.style.display = "inherit";
		gamePlayContainer.style.display = "inherit";
	} else {
		gameRunningInfoContainer.style.display = "none";
		gamePlayContainer.style.display = "none";
	}
}

function updateHighScore(){
	// check localstorage for a high score
	highestGameScore = localStorage.getItem("highScore") || 0;

	// compare high score to current score
	// if current score is higher than high score,
	if (currentGameScore > highestGameScore){
		// write to local storage
		localStorage.setItem("highScore", currentGameScore);

		// update high score text 
		highestGameScore = currentGameScore;
	}

	// make sure the text is always reflecting the value 
	// even if value didn't change, because HTML has placeholder value that is not valid
	highscoreDisplayText.innerText = "High Score: " + highestGameScore;
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



function startGame(desiredGameTime = defaultGameDuration){
	gameTimeRemaining = desiredGameTime;
	// isGameRunning = true;
	console.log("Started the game. Game time remaining is now: " + gameTimeRemaining);

	currentGameScore = 0;
	wipeImagesFromSpawningAreas();
	// toggle game controls
	toggleGameControlButtons();
	// toggle game content
	toggleGameplayContent();

	gameCountdownInterval = setInterval(() => {
		gameTimeRemaining -= 1;
		console.log("Game time remaining is counting down, it is now... " + gameTimeRemaining);

		if (gameTimeRemaining <= 0){
			// if game has no time remaining, stop subtracting from it!
			
			console.log("Game has finished!");
			stopGame();
		}

	}, 1000);

	gameUpdateInterval = setInterval(gameTimeStep, 100);

	// TODO: Refactor for multiple spawningIntervals or find a way to make it
	// a different duration on each repetition
	spawningInterval = setInterval(() => {
		spawnMole();
	}, 1000);


}

// startGame(); // gameTimeRemaining becomes 120 
// startGame(60); // gameTimeRemaining becomes 60

function stopGame(){
	gameTimeRemaining = 0;
	
	// stop all intervals
	clearInterval(gameCountdownInterval);
	clearInterval(gameUpdateInterval);
	clearInterval(spawningInterval);
	gameTimeStep();

	// toggle game controls
	toggleGameControlButtons();
	// toggle game content
	toggleGameplayContent();
	wipeImagesFromSpawningAreas();

	console.log("Stopped the game. Game time remaining is now: " + gameTimeRemaining);
}

// null.addEventListener
// button.addEventListener
startGameButton.addEventListener("click", () => {
	startGame(10);
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
