const visualBoard = document.querySelector('.board');
function gameBoard() {

    //keep track of moves
    let moves = 0; 
    const totalMoves = () => {
        moves++;
        return moves;
    }

    //control board activity 
    visualBoard.addEventListener('click', (event) => {
        if (endRound === false && event.target.classList.contains('cell')) {
            toggleToken(event.target);
            checkWin();
        } 
    })

    //cells listens for click, and assigns an x or o 
    const toggleToken = (cell) => {
        let currentToken = totalMoves() % 2; 

        if (cell.textContent === '') {
            if (currentToken === 0) {
                return cell.textContent = 'O';
            } else {
                return cell.textContent = 'X';
            }
        } else {
            return;
        }
    }
}

let rounds = 1;
const displayRounds = document.querySelector('.countrounds');
displayRounds.textContent = 'ROUND 1';
let endRound = false;

const playerOne = {
    token: 'X',
    win: false,
    winStatement: 'Player one wins!',
    points: 0
}
const playerTwo = {
    token: 'O',
    win: false, 
    winStatement: 'Player two wins!',
    points: 0
}

function checkWin() {
    const resultPanel = document.querySelector('.displayresults');
    const playerOnePts = document.querySelector('.playeronepoints');
    const playerTwoPts = document.querySelector('.playertwopoints');
    
    const cellArray = []

    let cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cellArray.push(cell);
    })

    function findWinner() {
        //check rows
        if (cellArray[0].textContent !== '' && cellArray[1].textContent === cellArray[0].textContent && cellArray[2].textContent === cellArray[1].textContent) {
            return cellArray[0].textContent;
        }
        if (cellArray[3].textContent !== '' && cellArray[4].textContent === cellArray[3].textContent && cellArray[5].textContent === cellArray[4].textContent) {
            return cellArray[3].textContent;
        }
        if (cellArray[6].textContent !== '' && cellArray[7].textContent === cellArray[6].textContent && cellArray[8].textContent === cellArray[7].textContent) {
            return cellArray[6].textContent;
        }

        //check columns
        if (cellArray[0].textContent !== '' && cellArray[3].textContent === cellArray[0].textContent && cellArray[6].textContent === cellArray[3].textContent) {
            return cellArray[0].textContent;
        }
        if (cellArray[1].textContent !== '' && cellArray[4].textContent === cellArray[1].textContent && cellArray[7].textContent === cellArray[4].textContent) {
            return cellArray[1].textContent;
        }
        if (cellArray[2].textContent !== '' && cellArray[5].textContent === cellArray[2].textContent && cellArray[8].textContent === cellArray[5].textContent) {
            return cellArray[2].textContent;
        }

        //check diagonals
        if (cellArray[0].textContent !== '' && cellArray[4].textContent === cellArray[0].textContent && cellArray[8].textContent === cellArray[4].textContent) {
            return cellArray[0].textContent;
        }
        if (cellArray[2].textContent !== '' && cellArray[4].textContent === cellArray[2].textContent && cellArray[6].textContent === cellArray[4].textContent) {
            return cellArray[2].textContent;
        }
    
        return false;
    }

    //check for tie
    if (findWinner() === false) {
        function checkEmptyCells() {
            for (i = 0; i < cellArray.length; i++) {
                const element = cellArray[i];
                if (element.textContent === '') {
                    return true;
                } 
            }
            return false;
        }

        if (checkEmptyCells() === false) {
            resultPanel.textContent = ("It's a tie!")
        } else {
            return;
        }
    }

    //update player properties and display results

    if (findWinner() === playerOne.token) {
        playerOne.win = true; 
        playerOne.points++;
        playerOnePts.textContent = 'Player One: ' + playerOne.points;
        playerTwoPts.textContent = 'Player Two: ' + playerTwo.points;
    
        resultPanel.textContent = playerOne.winStatement;
        endRound = true;
    } 

    if (findWinner() === playerTwo.token) {
        playerTwo.win = true; 
        playerTwo.points++;
        playerOnePts.textContent = 'Player One: ' + playerOne.points;
        playerTwoPts.textContent = 'Player Two: ' + playerTwo.points;

        resultPanel.textContent = playerTwo.winStatement;
        endRound = true;
    }

    //update rounds
    if (findWinner() !== false || checkEmptyCells() === false) {
        rounds++;
    }

    //new round & game
    newRoundBtn = document.querySelector('.newround')
    newRoundBtn.addEventListener('click', () => {
        newRound();
    })


    function newRound() {
        if (playerOne.points < 5 && playerTwo.points < 5) {
            playerOne.win = false; 
            playerTwo.win = false;
            cells.forEach(cell => cell.textContent = '');
            resultPanel.textContent = '';
            displayRounds.textContent = 'ROUND ' + rounds;
        } 
        endRound = false;
    }

    function newGame() {
        if (playerOne.points === 5 || playerTwo.points === 5) {
            //
        }
    }
    
}






const initiateBoard = gameBoard();
const winner = checkWin();
