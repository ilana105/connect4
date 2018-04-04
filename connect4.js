let currPlayer;

const player1 = 1;
const player2 = 2;
let player1startColor = "";
let player2startColor = "";

const numCols = 7;
const numRows = 6;
const cellWidth = 85;
const cellSpacing = 1;


const container = document.querySelector("#gridContainer");
let chip = document.querySelectorAll('span.chip');
let p1changedColor = document.querySelector("div.player1");
let p2changedColor = document.querySelector("div.player2");
let p1Button = document.querySelector("#p1ColorChange");
let p2Button = document.querySelector("#p2ColorChange");

//----------------Create board--------------------------
let screenSize;

if (screen.width > 1500)
	screenSize = screen.width * .34;

else 
	screenSize = screen.width * .26;

container.style.left = screenSize + "px";

const span = document.createElement('span');
span.className = 'cell';

const cells = [];

for (let row = 0; row < numRows; row++) {
	cells.push([]);
	for (let col = 0; col < numCols; col++) {
		let cell = span.cloneNode();
		cell.style.left = `${col * (cellWidth + cellSpacing)}px`;
		cell.style.top = `${row * (cellWidth + cellSpacing)}px`;
		container.appendChild(cell);
		cells[row][col] = cell;
		cells[row][col].innerHTML = "0" 
	}
}
//--------------------End Board-------------------------
function startGame() {
	//Decides who goes first by random
	let randNum = (Math.floor(Math.random() * 2) + 1);

	if (randNum == 1) {
		currPlayer = 1;
		chip[0].style.visibility = "visible";
		chip[1].style.visibility = "hidden";
	}

	else {
		currPlayer = 2;
		chip[0].style.visibility = "hidden";
		chip[1].style.visibility = "visible";
	}

	p1Button.style.visibility = "hidden"; //hides the buttons to change colors, so that the players cant change colors during the game
	p2Button.style.visibility = "hidden";
	document.getElementById("restartGame").style.visibility = "visible";
	document.getElementById("startGame").style.visibility = "hidden";

	player1startColor = p1changedColor.style.color;
	player2startColor = p2changedColor.style.color;


	document.getElementById("gridContainer").style.pointerEvents = "auto";
}

function restartGame() {
	p1Button.style.visibility = "visible";
	p2Button.style.visibility = "visible";
  	document.getElementById("restartGame").style.visibility = "hidden";
	document.getElementById("startGame").style.visibility = "visible";

	chip[0].style.visibility = "hidden";
	chip[1].style.visibility = "hidden";

	player1startColor = "";
	player2startColor = "";

	let cells = document.getElementsByClassName("cellSelected");
	//debugger;
	while(cells.length){
		cells[0].className = "cell";
	}

	document.getElementById("gridContainer").style.pointerEvents = "none";
}

//-----------------------------COLOR Options------------------------------
//default color values for the player
let colorPalette1 = ["#ff9999", "#CC0000", "#800000"];
let colorPalette2 = ["#99e6ff", "#0099cc", "#006080"];

//returns the color of the disc when the user clicks a button
let index = 0;
function changeColor(array) {
 	index++;

 	if (index == 3)
 		index = 0;

	return array[index]
}

//changes the chip color depending on which button was pressed
function changeChipColor (p) {
	if (p == 1)
		chip[0].style.backgroundColor = p1changedColor.style.color;

	else if (p == 2)
		chip[1].style.backgroundColor = p2changedColor.style.color;
}
//-------------------------------------------------------------------------

//add events to the buttons when clicked
p1Button.addEventListener("click", () => {changeChipColor(1); }, false);
p2Button.addEventListener("click", () => {changeChipColor(2); }, false);


container.onclick = placeChip;


function placeChip (e) {
	let rect = container.getBoundingClientRect();
	let mouseX = e.clientX - rect.left;
	let mouseY = e.clientY - rect.top;
	let columnWidth = cellWidth + cellSpacing;
	let col = Math.floor(mouseX/columnWidth);
	let row = Math.floor(mouseY/columnWidth);
	let newRow = check(row, col)
	let selectedCell = cells[newRow][col];

	//if (isOccupied(row, newCol)) {
		//alert("spot is taken");
	//}
	selectedCell.className = 'cellSelected';
	console.log(`${col},${row}`);

	if (currPlayer == 1) {
		selectedCell.innerHTML = "1";
		selectedCell.style.backgroundColor = player1startColor;
		currPlayer = 2;
		chip[0].style.visibility = "hidden";
		chip[1].style.visibility = "visible";
	}

	else {
		selectedCell.innerHTML = "2";
		selectedCell.style.backgroundColor = player2startColor;
		currPlayer = 1;
		chip[0].style.visibility = "visible";
		chip[1].style.visibility = "hidden";
	}
}

/*
Checks to see if the column has other pieces
*/
function check(row, col) {
	for (let i = 5; i > 0; i--) {
		if (cells[i][col].innerHTML == "0")
			return i;
	}
	return row;
}

function isOccupied(row, col) {
	let thisCell = cells[row][col];
	return thisCell.innerHTML === 0 ? false : true;
}
