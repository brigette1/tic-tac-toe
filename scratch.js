function gameBoard() {
    const rows = 2; 
    const columns = 2; 
    let board = []; 

    for (let i = 0; i < rows; i++) {
        board[i] = []; 
        for (let j = 0; j < columns; j++) {
            board[i].push(' '); 
        }
    }

    let moves = 0; 
    const totalMoves = () => {
        moves++;
        return moves;
    }

    const visualBoard = document.querySelector('.board');
    visualBoard.addEventListener('click', (event) => {
        if (event.target.classList.contains('cell')) {
            toggleToken(event.target);
            checkWin();
            // printBoard();
        } 
    })

    // const printBoard = () => {
    //     const cells = visualBoard.querySelectorAll('.cell');
    //     cells.forEach(cell => {
    //         let row = parseInt(cell.dataset.row); 
    //         let col = parseInt(cell.dataset.column);
    //         cell[row][col] = cell.textContent;  
    //     })
    // }

    //keep track of turns played 
    

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

    return {toggleToken}
}


function checkWin() {
    const cellArray = []

    let cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cellArray.push(cell);
    })

    function findWinner() {
        //check rows
        if (cellArray[0].textContent !== '' && cellArray[1].textContent === cellArray[0].textContent && cellArray[2].textContent === cellArray[1].textContent) {
            console.log(cellArray[0].textContent + ' wins');
            return true;
        }
        if (cellArray[3].textContent !== '' && cellArray[4].textContent === cellArray[3].textContent && cellArray[5].textContent === cellArray[4].textContent) {
            console.log(cellArray[3].textContent + ' wins');
            return true;
        }
        if (cellArray[6].textContent !== '' && cellArray[7].textContent === cellArray[6].textContent && cellArray[8].textContent === cellArray[7].textContent) {
            console.log(cellArray[6].textContent + ' wins');
            return true;
        }

        //check columns
        if (cellArray[0].textContent !== '' && cellArray[3].textContent === cellArray[0].textContent && cellArray[6].textContent === cellArray[3].textContent) {
            console.log(cellArray[0].textContent + ' wins');
            return true;
        }
        if (cellArray[1].textContent !== '' && cellArray[4].textContent === cellArray[1].textContent && cellArray[7].textContent === cellArray[4].textContent) {
            console.log(cellArray[1].textContent + ' wins');
            return true;
        }
        if (cellArray[2].textContent !== '' && cellArray[5].textContent === cellArray[2].textContent && cellArray[8].textContent === cellArray[5].textContent) {
            console.log(cellArray[2].textContent + ' wins');
            return true;
        }

        //check diagonals
        if (cellArray[0].textContent !== '' && cellArray[4].textContent === cellArray[0].textContent && cellArray[8].textContent === cellArray[4].textContent) {
            console.log(cellArray[0].textContent + ' wins');
            return true;
        }
        if (cellArray[2].textContent !== '' && cellArray[4].textContent === cellArray[2].textContent && cellArray[6].textContent === cellArray[4].textContent) {
            console.log(cellArray[2].textContent + ' wins');
            return true;
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
            console.log('tie!')
        } else {
            return;
        }
    }
}

function displayResults() {

}

const initiateBoard = gameBoard();
const winner = checkWin();