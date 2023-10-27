function player(name, char) {
    this.name = name;
    this.char = char;
    this.score = 0;
    return {name, char, score};
}
const player1 = player("Player1", "X");
const player2 = player("Player2", "O");

const gameBoard = (function() {
    this.boxes = { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "", 9: "" }
    this.currentPlayer = player1;
    this.winner = "";

    this.getCurrentPlayer = () => {
        return this.currentPlayer;
    }

    this.getWinner = () => {
        return this.winner;
    }

    this.setWinner = (plr) => {
        if (plr != "") {
            this.winner = plr;
            this.scoreIncrement(plr);
        } else {
            this.winner = "";
        }
    }

    this.setCurrentPlayer = () => {
        if (currentPlayer == player1) {
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        }
    }

    this.getScore = (plr) => {
        return plr.score
    }

    this.scoreIncrement = (plr) => {
        plr.score++
        if (this.getWinner() == player1) {
            document.querySelector("#plr1_score").textContent = plr.score
        } else if (this.getWinner() == player2) {
            document.querySelector("#plr2_score").textContent = plr.score
        }
    }

    this.resetBoxes = () => {
        for (let i = 1; i <= this.boxes.length; i++) {
            this.boxes[i] = "";
        }
    }

    this.checkLogic = () => {
        if (this.boxes[1] == "X" && this.boxes[2] == "X" && this.boxes[3] == "X") {setWinner(player1); return;}
        if (this.boxes[1] == "O" && this.boxes[2] == "O" && this.boxes[3] == "O") {setWinner(player2); return;} 
        if (this.boxes[1] == "X" && this.boxes[4] == "X" && this.boxes[7] == "X") {setWinner(player1); return;}
        if (this.boxes[1] == "O" && this.boxes[4] == "O" && this.boxes[7] == "O") {setWinner(player2); return;}
        if (this.boxes[4] == "X" && this.boxes[5] == "X" && this.boxes[6] == "X") {setWinner(player1); return;}
        if (this.boxes[4] == "O" && this.boxes[5] == "O" && this.boxes[6] == "O") {setWinner(player2); return;}
        if (this.boxes[7] == "X" && this.boxes[8] == "X" && this.boxes[9] == "X") {setWinner(player1); return;}
        if (this.boxes[7] == "O" && this.boxes[8] == "O" && this.boxes[9] == "O") {setWinner(player2); return;}
        if (this.boxes[3] == "X" && this.boxes[6] == "X" && this.boxes[9] == "X") {setWinner(player1); return;}
        if (this.boxes[3] == "O" && this.boxes[6] == "O" && this.boxes[9] == "O") {setWinner(player2); return;}
        if (this.boxes[2] == "X" && this.boxes[5] == "X" && this.boxes[8] == "X") {setWinner(player1); return;}
        if (this.boxes[2] == "O" && this.boxes[5] == "O" && this.boxes[8] == "O") {setWinner(player2); return;}
        if (this.boxes[1] == "X" && this.boxes[5] == "X" && this.boxes[9] == "X") {setWinner(player1); return;}
        if (this.boxes[1] == "O" && this.boxes[5] == "O" && this.boxes[9] == "O") {setWinner(player2); return;}
        if (this.boxes[3] == "X" && this.boxes[5] == "X" && this.boxes[7] == "X") {setWinner(player1); return;}
        if (this.boxes[3] == "O" && this.boxes[5] == "O" && this.boxes[7] == "O") {setWinner(player2); return;}

        for (const index in this.boxes) {
            console.log(index);
            if (index != "") {
                console.log("Draw");
                //return this.setWinner("");
            }
        }
    }

    return { boxes, currentPlayer, getCurrentPlayer, setCurrentPlayer, checkLogic, getWinner, setWinner };
})();

const displayController = (function() {
    this.setMarker = (element, currentPlr) => {
        for (let i = 0; i < document.querySelectorAll(".field").length; i++) {
            if (document.querySelectorAll(".field")[i] == element && gameBoard.boxes[i+1] == "") {
                gameBoard.boxes[i+1] = currentPlr.char;
                document.querySelectorAll(".field")[i].innerHTML = currentPlr.char;
                gameBoard.setCurrentPlayer();
            }
        }
    }
    return { setMarker };
})();


document.querySelectorAll(".field").forEach(element => {
    element.addEventListener("mouseup", (event => {
        if (gameBoard.getWinner() == "") {
            displayController.setMarker(element, gameBoard.getCurrentPlayer());
            gameBoard.checkLogic();
        }
    }))
});