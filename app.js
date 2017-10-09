const gameHeader = document.getElementById(`gameHeader`);
const playDiv = document.getElementById(`playDiv`);
const playButton = document.getElementById(`playButton`);
const blocks = document.querySelectorAll(`.colorBlock`);
const totalCorrectCountElement = document.getElementById(`totalCorrect`);
const totalIncorrectCountElement = document.getElementById(`totalIncorrect`);
const actualCorrectCountElement = document.getElementById(`actualCorrect`);
const highscoreElement = document.getElementById(`highscore`);
const blocksArray = [];
// import sendScore from './requests.js';

/* Put blocks in array because querySelectorAll returns a node list rather than array
   which does not allow for checking of isArray and other native array methods
*/
blocks.forEach(function (block) {
	blocksArray.push(block);
})
let answer;
let isRightAnswer;
let gameOver = false;
let correct = 0;
let actualCorrect = 0;
let incorrect = 0;
let highscore = 0;
let hsName = '';

let startGame = function () {
	setTimeout(function () {
		getHighest();
		gameOver = false;
		assignColor(blocksArray);
		pickAnswer();
		gameHeader.innerHTML = `Guess the color: ` + answer;
		playButton.style.visibility = `hidden`;
	}, 1000)
}

let endGame = function (selection) {
	if (!gameOver) {
		isRightAnswer = checkAnswer(selection);
		updateScore();
		isRightAnswer ? updateInnerHtml(`YOU WIN`, gameHeader) : updateInnerHtml(`YOU LOSE. This was the right color`, gameHeader);
		updateScoreText();
		playButton.style.visibility = `visible`;
		updateInnerHtml(`Restart`, playButton);
		playButton.onclick = startGame;
		gameOver = true;
		assignColor(blocksArray, answer);
		console.log(correct + ` ` + incorrect);
	}
}

let pickAnswer = function () {
	let num = Math.floor(Math.random() * 6);
	answer = blocksArray[num].style.backgroundColor;
}

let updateInnerHtml = function (text, objectToUpdate) {
	objectToUpdate.innerHTML = text;
}

let updateScore = function () {
	if(isRightAnswer){
		correct++;
		actualCorrect++;
	}else{
		incorrect++;
		sendScore(actualCorrect);
		actualCorrect = 0;
	}
	actualCorrect > highscore ? highscore = actualCorrect : highscore = highscore;
}


let updateScoreText = function () {
	if(isRightAnswer){
		updateInnerHtml(`Total Correct: ${correct}`, totalCorrectCountElement);
		updateInnerHtml(`Current Score: ${actualCorrect}`, actualCorrectCountElement);
	}else{
		updateInnerHtml(`Total Incorrect: ${incorrect}`, totalIncorrectCountElement);
		updateInnerHtml(`Actual Correct: ${actualCorrect}`, actualCorrectCountElement);
	}

	if(correct >= highscore){
		updateInnerHtml(`Highscore: ${highscore}`, highscoreElement);
	}
}

let sendScore = function (actualCorrect) {
	axios.post('http://localhost:3000/highscores/', {
		name: 'testing',
		score: actualCorrect
	})
	.then(function(response){
		console.log(response);
	})
	.catch(function(error){
		console.log(error);
	});
}

let getHighest = function() {
	axios.get('http://localhost:3000/highest/')
		.then(function(response){
			console.log(response);
			hsName = response.data.name;
			highscore = response.data.score;
			updateInnerHtml(`Highscore: ${hsName}, ${highscore}`, highscoreElement);
		})
		.catch(function(error){
			console.log(error);
		});
}

let assignColor = function (needsColor, color) {
	if (Array.isArray(needsColor)) {
		needsColor.forEach(function (item) {
			item.style.backgroundColor = color ? color : generateColor();
		});
	} else {
		needsColor.style.backgroundColor = color ? color : generateColor();
	}
}

let checkAnswer = function (selection) {
	return selection.style.backgroundColor === answer;
}

let generateColor = function () {
	return `#` + Math.floor(Math.random() * 16777215).toString(16);
}

startGame();
