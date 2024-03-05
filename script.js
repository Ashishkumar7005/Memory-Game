var errors = 0;
var cardList = [
    "darkness",
    "double",
    "fairy",
    "fighting",
    "fire",
    "grass",
    "lightning",
    "metal",
    "psychic",
    "water"
]

var cardSet;
var board=[];
var rows =4;
var columns = 5;
let card1Selected;
let card2Selected;

window.onload  =function(){
    shuffleCards();
    startGame();
}

function shuffleCards(){
    cardSet = cardList.concat(cardList);
    //shuffle
    for(let i=0;i<cardSet.length;i++){
        let j= Math.floor(Math.random() * cardSet.length);
        let temp =  cardSet[i];
        cardSet[i] = cardSet[j];
        cardSet[j] = temp;
    }

}

function startGame(){
    for(let r=0;r<rows;r++){
        let row=[];
        for(let c=0; c<columns;c++){
            let cardImg = cardSet.pop();
            row.push(cardImg);

            // img
            let card = document.createElement('img');
            card.id = r.toString()+"-"+c.toString();
            card.src= cardImg+".jpg";
            card.classList.add("card");
            card.addEventListener("click",selectCard);
            document.getElementById("board").append(card);
        }
        board.push(row);
    }
    console.log(board);
    setTimeout(hideCards,1000);
}

function hideCards(){
    for(let r=0;r<rows;r++){
        for(let c=0;c<columns;c++){
            let card = document.getElementById(r.toString()+"-"+c.toString());
            card.src = "back.jpg"
        }
    }
}

function selectCard(){
    if(this.src.includes("back")){
          if(!card1Selected){
            card1Selected= this;

            let coords = card1Selected.id.split("-");
            let r= parseInt(coords[0]);
            let c= parseInt(coords[1]);

            card1Selected.src = board[r][c] + ".jpg";
          }
          else if(!card2Selected && this!=card1Selected){
            card2Selected  = this;
            let coords = card2Selected.id.split("-");
            let r= parseInt(coords[0]);
            let c= parseInt(coords[1]);

            card2Selected.src = board[r][c]+".jpg";
            setTimeout(update, 1000);
          }
    }
}

function update(){
    // if cards aren't the same, flip both back

 if(card1Selected.src != card2Selected.src){
    card1Selected.src = "back.jpg"
    card2Selected.src = "back.jpg"
    
    errors+=1;
    document.getElementById("errors").innerText = errors;
 }
card1Selected=null;
card2Selected=null;

 // Check if all cards are flipped
 if (allCardsFlipped()) {
    displayWellPlayed();
}
}

function allCardsFlipped() {
for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
        let card = document.getElementById(r.toString() + "-" + c.toString());
        if (card.src.includes("back.jpg")) {
            return false;
        }
    }
}
return true;
}

function displayWellPlayed() {
    // Display "Well Played" message
    let wellPlayedMessage = document.createElement('h2');
    wellPlayedMessage.textContent = "Well Played!";
    document.body.appendChild(wellPlayedMessage);

    // Create a restart button
    let restartButton = document.createElement('button');
    restartButton.textContent = "Restart Game";
    restartButton.addEventListener("click", restartGame);

    // Add padding and border radius to the restart button
    restartButton.style.padding = "8px";
    restartButton.style.borderRadius = "4px";
    wellPlayedMessage.style.marginBottom = "4px";
    document.body.appendChild(restartButton);
}

function restartGame() {
// Reset variables
errors = 0;
cardSet = [];
board = [];
card1Selected = null;
card2Selected = null;

// Clear the board
let boardElement = document.getElementById("board");
while (boardElement.firstChild) {
    boardElement.removeChild(boardElement.firstChild);
}

// Restart the game
shuffleCards();
startGame();

// Remove "Well Played" message and restart button
let wellPlayedMessage = document.querySelector('h2');
let restartButton = document.querySelector('button');
if (wellPlayedMessage) {
    wellPlayedMessage.remove();
}
if (restartButton) {
    restartButton.remove();
}
}
