function gameBoard() {

    let moves = 0; 

    const totalMoves = () => {
        moves++;
        return moves;
    }

    const visualBoard = document.querySelector('.board');
    visualBoard.addEventListener('click', (event) => {
        if (event.target.classList.contains('cell')) {
            toggleToken(event.target);
            printBoard();
        } 
    })

    // const rows = 2; 
    // const columns = 2; 
    // // let board = []; 

    // for (let i = 0; i < rows; i++) {
    //     board[i] = []; 
    //     for (let j = 0; j < columns; j++) {
    //         board[i].push(' '); 
    //     }
    // }

    const printBoard = () => {
        const cells = visualBoard.querySelectorAll('.cell');
        cells.forEach(cell => {
            let row = parseInt(cell.dataset.row); 
            let col = parseInt(cell.dataset.column);
            cell[row][col] = cell.textContent;
        })
    }

    //keep track of turns played 
    

    //cells listens for click, and assigns an x or o 
    const toggleToken = (cell) => {
        let currentToken = totalMoves() % 2; 

        if (cell.textContent === ' ') {
            if (currentToken === 0) {
                return cell.textContent = 'X';
            } else {
                return cell.textContent = 'O';
            }
        } else {
            return;
        }
    }

    return {toggleToken, printBoard}
}
const initiateBoard = gameBoard();