(function gameBoard() {
    this.boxes = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.currentPlayer = player1;
    this.setCurrentPlayer = () => {
        player()
    }
}());

function displayController() {
    this.setMarker = (element) => {
        
    }

    return { setMarker };
}

function player(name, char) {
    this.name = name;
    this.char = char;
    return {name, char};
}

const player1 = player("Player1", "X");
const player2 = player("Player2", "O");

document.querySelectorAll(".field").forEach(element => {
    element.addEventListener("mouseup", (event => {
        element.innerHTML = "X";
    }))
});