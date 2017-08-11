var gameHeader = document.getElementById('gameHeader');
var playDiv = document.getElementById('playDiv');
var playButton = document.getElementById('playButton');
var blocks = [];
blocks[0] = document.getElementById('block1');
blocks[1] = document.getElementById('block2');
blocks[2] = document.getElementById('block3');
blocks[3]= document.getElementById('block4');
blocks[4] = document.getElementById('block5');
blocks[5]= document.getElementById('block6');
var answer;
var isRightAnswer;

setTimeout(function () {
	gameHeader.innerHTML = 'Ready to play?';
	playDiv.style.visibility = 'visible';
}, 2000);

var startGame = function () {
	setTimeout(function () {
		assignColors();
		pickAnswer();
		gameHeader.innerHTML = 'Guess the color: ' + answer;
	}, 500)
}

var endGame = function (selection) {
	isRightAnswer = checkAnswer(selection);
	gameHeader.innerHTML = isRightAnswer ? 'YOU WIN' : 'YOU LOSE';
}

var pickAnswer = function () {
	var num = Math.floor(Math.random() * 6);
	answer = blocks[num].style.backgroundColor;
}

var assignColors = function () {
	blocks.forEach(function(block) {
		block.style.backgroundColor = generateColor();
	});
}

var checkAnswer = function (selection) {
	return selection.style.backgroundColor === answer;
}

var generateColor = function () {
	return '#' + Math.floor(Math.random() * 16777215).toString(16);
}