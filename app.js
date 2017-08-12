const gameHeader = document.getElementById(`gameHeader`);
const playDiv = document.getElementById(`playDiv`);
const playButton = document.getElementById(`playButton`);
const blocks = document.querySelectorAll(`.colorBlock`);
let answer;
let isRightAnswer;
let gameOver = false;

let startGame = function () {
	setTimeout(function () {
		gameOver = false;
		assignColors();
		pickAnswer();
		gameHeader.innerHTML = `Guess the color: ` + answer;
		playButton.style.visibility = `hidden`;
	}, 1000)
}

let endGame = function (selection) {
	if (!gameOver) {
		isRightAnswer = checkAnswer(selection);
		isRightAnswer ? updateInnerHtml(`YOU WIN`, gameHeader) : updateInnerHtml(`YOU LOSE`, gameHeader);
		playButton.style.visibility = `visible`;
		updateInnerHtml(`Restart`, playButton);
		playButton.onclick = startGame;
		gameOver = true;
	}
}

let pickAnswer = function () {
	let num = Math.floor(Math.random() * 6);
	answer = blocks[num].style.backgroundColor;
}

let updateInnerHtml = function (text, objectToUpdate) {
	objectToUpdate.innerHTML = text;
}

let assignColors = function () {
	blocks.forEach(function(block) {
		block.style.backgroundColor = generateColor();
	});
}

let checkAnswer = function (selection) {
	return selection.style.backgroundColor === answer;
}

let generateColor = function () {
	return `#` + Math.floor(Math.random() * 16777215).toString(16);
}

startGame();