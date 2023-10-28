function player(name, char) {
    this.name = name;
    this.char = char;
    this.score = 0;
    return { name, char, score };
}
const player1 = player("Player1", "X");
const player2 = player("Player2", "O");

document.querySelector("#x").style.backgroundColor = "#FFC700"

const gameBoard = (function () {
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
        console.log(plr);
        if (plr != "" && plr != "Draw") {
            this.winner = plr;
            this.scoreIncrement(plr);
            if (plr.score < 5) {
                this.showOptionButtons(true, true);
                this.setCommentary(plr.name + " wins this round.");
            } else if (plr.score >= 5) {
                this.showOptionButtons(false, true);
                this.setCommentary(plr.name + " has won the game");
                document.querySelector(".commentary-text").style.color = "#FF7A00";
            }

        } else if (plr == "Draw") {
            this.showOptionButtons(true, true);
            this.winner = "";
        } else {
            this.winner = "";
        }
    }

    this.showOptionButtons = (nextRound, restart) => {
        if (nextRound == true && restart == true) {
            console.log("Next round is true and restart is true");
            document.querySelector("#next_round_button").style.display = null;
            document.querySelector("#next_round_button").style.cursor = "pointer";
            document.querySelector("#next_round_button").style.opacity = 1;
            document.querySelector("#next_round_button").disabled = false;

            document.querySelector("#restart_button").style.display = null;
            document.querySelector("#restart_button").style.cursor = "pointer";
            document.querySelector("#restart_button").style.opacity = 1;
            document.querySelector("#restart_button").disabled = false;
        } else if (nextRound == false && restart == true) {
            console.log("Next round is false and restart is true");
            document.querySelector("#next_round_button").style.display = "none";
            document.querySelector("#next_round_button").style.cursor = "auto";
            document.querySelector("#next_round_button").style.opacity = 0;
            document.querySelector("#next_round_button").disabled = true;

            document.querySelector("#restart_button").style.display = null;
            document.querySelector("#restart_button").style.cursor = "pointer";
            document.querySelector("#restart_button").style.opacity = 1;
            document.querySelector("#restart_button").disabled = false;
        }
        else if (nextRound == false && restart == false) {
            console.log("Next round is false and restart is false");
            console.log("\"" + "Next Round Button Disabled: " + document.querySelector("#next_round_button").disabled + "\"")
            console.log("\"" + "Restart Button Disabled: " + document.querySelector("#restart_button").disabled + "\"\n")
            if (document.querySelector("#next_round_button").disabled == true && document.querySelector("#restart_button").disabled == false) {
                console.log("Hello");
                setTimeout(() => {
                    console.log("hello")
                    document.querySelector("#next_round_button").style.display = null;
                    document.querySelector("#next_round_button").style.cursor = "auto";
                    document.querySelector("#next_round_button").style.opacity = 0;
                    document.querySelector("#next_round_button").disabled = true;
                }, 1000);
            } else {
                document.querySelector("#next_round_button").style.display = null;
                document.querySelector("#next_round_button").style.cursor = "auto";
                document.querySelector("#next_round_button").style.opacity = 0;
                document.querySelector("#next_round_button").disabled = true;
            }

            document.querySelector("#restart_button").style.display = null;
            document.querySelector("#restart_button").style.cursor = "auto";
            document.querySelector("#restart_button").style.opacity = 0;
            document.querySelector("#restart_button").disabled = true;


        }
    }

    this.setCurrentPlayer = () => {
        if (currentPlayer == player1) {
            currentPlayer = player2;
            document.querySelector("#o").style.backgroundColor = "#FFC700";
            document.querySelector("#x").style.backgroundColor = null;
        } else {
            currentPlayer = player1;
            document.querySelector("#x").style.backgroundColor = "#FFC700";
            document.querySelector("#o").style.backgroundColor = null;
        }
    }

    this.setCommentary = (str) => {
        if (str == "&nbsp;") {
            document.querySelector(".commentary-text").style.opacity = 0;
            setTimeout(() => {
                document.querySelector(".commentary-text").innerHTML = str;
                document.querySelector(".commentary-text").style.color = null;
            }, 300);
        } else {
            document.querySelector(".commentary-text").style.color = null;
            document.querySelector(".commentary-text").innerHTML = str;
            document.querySelector(".commentary-text").style.opacity = 1;
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

    this.restartGame = () => {
        this.resetBoxes();
        player1.score = 0;
        player2.score = 0;
        document.querySelector("#plr1_score").innerText = player1.score;
        document.querySelector("#plr2_score").innerText = player2.score;
    }

    this.resetBoxes = () => {
        this.setCommentary("&nbsp;");
        for (let i = 1; i <= Object.keys(this.boxes).length; i++) {
            this.boxes[i] = "";
        }
        document.querySelectorAll(".field").forEach((element) => {
            element.textContent = "";
        })
        this.setWinner("");
    }

    this.checkLogic = () => {
        if (this.boxes[1] == "X" && this.boxes[2] == "X" && this.boxes[3] == "X") { setWinner(player1); return; }
        if (this.boxes[1] == "O" && this.boxes[2] == "O" && this.boxes[3] == "O") { setWinner(player2); return; }
        if (this.boxes[1] == "X" && this.boxes[4] == "X" && this.boxes[7] == "X") { setWinner(player1); return; }
        if (this.boxes[1] == "O" && this.boxes[4] == "O" && this.boxes[7] == "O") { setWinner(player2); return; }
        if (this.boxes[4] == "X" && this.boxes[5] == "X" && this.boxes[6] == "X") { setWinner(player1); return; }
        if (this.boxes[4] == "O" && this.boxes[5] == "O" && this.boxes[6] == "O") { setWinner(player2); return; }
        if (this.boxes[7] == "X" && this.boxes[8] == "X" && this.boxes[9] == "X") { setWinner(player1); return; }
        if (this.boxes[7] == "O" && this.boxes[8] == "O" && this.boxes[9] == "O") { setWinner(player2); return; }
        if (this.boxes[3] == "X" && this.boxes[6] == "X" && this.boxes[9] == "X") { setWinner(player1); return; }
        if (this.boxes[3] == "O" && this.boxes[6] == "O" && this.boxes[9] == "O") { setWinner(player2); return; }
        if (this.boxes[2] == "X" && this.boxes[5] == "X" && this.boxes[8] == "X") { setWinner(player1); return; }
        if (this.boxes[2] == "O" && this.boxes[5] == "O" && this.boxes[8] == "O") { setWinner(player2); return; }
        if (this.boxes[1] == "X" && this.boxes[5] == "X" && this.boxes[9] == "X") { setWinner(player1); return; }
        if (this.boxes[1] == "O" && this.boxes[5] == "O" && this.boxes[9] == "O") { setWinner(player2); return; }
        if (this.boxes[3] == "X" && this.boxes[5] == "X" && this.boxes[7] == "X") { setWinner(player1); return; }
        if (this.boxes[3] == "O" && this.boxes[5] == "O" && this.boxes[7] == "O") { setWinner(player2); return; }

        let count = 0;
        for (const index in this.boxes) {

            if (this.boxes[index] != "") {
                count++;
            }
        }

        if (count == 9) {
            this.setWinner("Draw");
            this.setCommentary("This game is a draw.");
        }
    }

    return { boxes, currentPlayer, getCurrentPlayer, setCurrentPlayer, checkLogic, getWinner, setWinner, resetBoxes, showOptionButtons, restartGame };
})();

const displayController = (function () {
    this.setMarker = (element, currentPlr) => {
        for (let i = 0; i < document.querySelectorAll(".field").length; i++) {
            if (document.querySelectorAll(".field")[i] == element && gameBoard.boxes[i + 1] == "") {
                gameBoard.boxes[i + 1] = currentPlr.char;
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

document.querySelector("#restart_button").addEventListener("mouseup", (event) => {
    gameBoard.restartGame();
    gameBoard.showOptionButtons(false, false);
})

document.querySelector("#next_round_button").addEventListener("mouseup", (event) => {
    gameBoard.resetBoxes();
    gameBoard.showOptionButtons(false, false);
})