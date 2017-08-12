const gameHeader = document.getElementById('gameHeader');
const playDiv = document.getElementById('playDiv');
const playButton = document.getElementById('playButton');
const blocks = document.querySelectorAll('.colorBlock');
let answer;
let isRightAnswer;

let startGame = function () {
	setTimeout(function () {
		assignColors();
		pickAnswer();
		gameHeader.innerHTML = 'Guess the color: ' + answer;
		playButton.style.visibility = 'hidden';
	}, 1000)
}

let endGame = function (selection) {
	isRightAnswer = checkAnswer(selection);
	gameHeader.innerHTML = isRightAnswer ? 'YOU WIN' : 'YOU LOSE';
	playButton.style.visibility = 'visible';
	playButton.innerHTML = 'Restart';
	playButton.onclick = startGame;
}

let pickAnswer = function () {
	let num = Math.floor(Math.random() * 6);
	answer = blocks[num].style.backgroundColor;
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
	return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

startGame();