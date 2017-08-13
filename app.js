const gameHeader = document.getElementById(`gameHeader`);
const playDiv = document.getElementById(`playDiv`);
const playButton = document.getElementById(`playButton`);
const blocks = document.querySelectorAll(`.colorBlock`);
const blocksArray = [];

/* Put blocks in array because querySelectorAll returns a node list rather than array
   which does not allow for checking of isArray and other native array methods
*/
blocks.forEach(function (block) {
	blocksArray.push(block);
})
let answer;
let isRightAnswer;
let gameOver = false;

let startGame = function () {
	setTimeout(function () {
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
		isRightAnswer ? updateInnerHtml(`YOU WIN`, gameHeader) : updateInnerHtml(`YOU LOSE. This was the right color`, gameHeader);
		playButton.style.visibility = `visible`;
		updateInnerHtml(`Restart`, playButton);
		playButton.onclick = startGame;
		gameOver = true;
		assignColor(blocksArray, answer);
	}
}

let pickAnswer = function () {
	let num = Math.floor(Math.random() * 6);
	answer = blocksArray[num].style.backgroundColor;
}

let updateInnerHtml = function (text, objectToUpdate) {
	objectToUpdate.innerHTML = text;
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