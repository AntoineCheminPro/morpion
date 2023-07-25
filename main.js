// Il faut développer le jeu du morpions.

// - Chaque cellule doit être cliquable et doit afficher le symbole du joueur (X ou O) lorsqu'elle est cliquée.
// - Définissez deux joueurs : X et O.
// - Les joueurs doivent alterner à chaque coup.
// - Affichez le joueur actuel à chaque tour. (C’est à X de jouer)
// - Lorsqu'un joueur gagne ou qu'il y a un match nul, affichez un message approprié et réinitialisez le jeu.


playerXarray = [];
playerOarray = [];

let activeCell;
let currentPlayer = "playerX";

victoriusArrays = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["1", "4", "7"],
    ["2", "5", "8"],
    ["3", "6", "9"],
    ["3", "5", "7"],
    ["1", "5", "9"]
]


function checkWinner(playerArray) {
    let winner = false;
    victoriusArrays.forEach(combination => {
        if (combination.every(cell => playerArray.includes(cell))) {
            winner = true;
            combination.forEach(cellId => {
                document.getElementById(cellId).classList.add('winning-line');
            });
            const divs = document.getElementsByClassName('cell');
            Array.from(divs).forEach(div => {
                div.classList.add('bloqued');
            });
            const modal = document.createElement('div');
            modal.classList.add('modal');
            modal.innerHTML = `
                <div class="modal-content">
                    <p>Le joueur ${currentPlayer} a gagné !</p>
                    <button class="replay-btn">Rejouer</button>
                </div>
            `;
            document.body.appendChild(modal);
            const replayBtn = document.querySelector('.replay-btn');
            replayBtn.addEventListener('click', () => {
                modal.remove();
                resetGame();
            });
        };
    });
    return winner;
}

function resetGame() {
    playerXarray = [];
    playerOarray = [];
    currentPlayer = "playerX";
    const divs = document.querySelectorAll('.cell');
    divs.forEach(div => {
        div.classList.remove('selected', 'playerX', 'playerO', 'bloqued', 'winning-line');
        div.textContent = '';
    });
}

function play() {
    const divs = document.querySelectorAll('.cell');
    divs.forEach(div => {
        let activeCell = "";
        div.addEventListener('click', event => {
            // Retirer la classe 'selected' de toutes les autres divs
            divs.forEach(div => div.classList.remove('selected'));
            // Ajouter la classe 'selected' à la div sélectionnée
            event.target.classList.add('selected', currentPlayer, 'bloqued');

            activeCell = document.querySelector('.selected');
            playedCellId = activeCell.id;

            playerTurn(activeCell);
        });
    });
}

function playerTurn(activeCell) {
    if (currentPlayer == "playerX") {
        activeCell.textContent = "X";
        playerXarray.push(playedCellId);
        checkWinner(playerXarray);
        currentPlayer = "playerO";
    }
    else {
        activeCell.textContent = "O";
        playerOarray.push(playedCellId);
        checkWinner(playerOarray);
        currentPlayer = "playerX";
    }
}


play();