function gameBoard(currentPlayer) {
    const docCell = document.querySelectorAll('.cell')

    const rows = 2; 
    const columns = 2;
    let board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = []; 
        for (let j = 0; j < columns; j++) {
            board[i].push(' ');
        }
    }

    const getBoard = () => board;

    const printBoard = () => {
        for (let i = 0; i < rows; i++) {
            let rowString = ' ';
            for (let j = 0; j < columns; j++) {
                rowString += board[i][j].getValue() + ' ';
            }
            console.log(rowString);
        }
    };

    docCell.forEach(cell => {
        cell.addEventListener('click', () => putToken(currentPlayer, cell))});


    //backend
    const dropToken = (row, column, currentPlayer) => {
        if (row < 0 || column < 0 || row >= rows || column >= columns) {
            console.log('Invalid input')
            return false;
        } else if (board[row][column].getValue() !== 0) {
            console.log('This box is occupied');
            return false;
        } else {
            board[row][column].addToken(currentPlayer)};

        if (currentPlayer === players[0] || currentPlayer === players[1]) {
            putToken();
        }

        return true;
    };

    //state of cell 
    function Cell(currentPlayer) {
        
        let value = 0; 

        const addToken = () => {
            value = currentPlayer.token;
        };

        const getValue = () => value;

        return {addToken, getValue};
    }
    return {getBoard, dropToken, printBoard, board, rows, columns};
}







function gameControl(board, playerOneName, playerTwoName) {
    let currentPlayer = 0;
    let totalMoves = 0;
    
    const players = [
        {
            name: playerOneName,
            token: 1,
        },
        {
            name: playerTwoName,
            token: 2,
        }
    ]

    const getCurrentPlayer = () => {
        currentPlayer = players[totalMoves % 2];
        return currentPlayer;
    }

    //switch player turn 
    const switchPlayer = () => {
        totalMoves++; 
        currentPlayer = getCurrentPlayer();
    }

    //play round 
    const playRound = () => {
        switchPlayer();
        console.log("It's" + getCurrentPlayer().name + "'s turn.")
        board.printBoard();

        return {switchPlayer, playRound};
    }  

    //check for win 
    let playerOne = '';
    let playerTwo ='';

    const checkWin =  () => {

        //check rows
        for (i = 0; i < board.length; i++) {
            if (!board[i][0] === 0 && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
                let winner = board[i][0].getValue();
                return winner;
            }
        }

        //check columns 
        for (j = 0; j < board.length; j++) {
            if (!board[0][j] === 0 && board[0][j] === board[1][j] && board[1][j] === board[2][j]) {
                let winner = board[0][j].getValue();
                return winner;
            }
            //enter conditionals
        }

        //check diagonals - initiate with if/then conditionals
        if (!board[0][0] === 0 && board[1][1] === board[0][0] && board[1][1] === board[2][2]) {
            let winner = board[0][0].getValue();
            return winner;
        }

        if (!board[0][2] === 0 && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
            let winner = board[0][2].getValue();
            return winner;
        }

        //determine winner 
        if (winner === 1) {
            playerOne = 'win';
            return playerOne;
        } else if (winner === 2) {
            playerTwo = 'win'
            return playerTwo
        }

        //check for draw
        if (!playerOne === 'win' && !playerTwo === 'win' && board.every(item => {
            item > 0 === true;})) {
                console.log ("It's a draw!");
        } else {
            return;
        }
    }

    return {getCurrentPlayer, playRound, checkWin, players};
}





function userInterface(rows, columns, board) {
    //ui
    const putToken = (currentPlayer, cell) => {
        let token = currentPlayer.token; 
        let row = parseInt(cell.dataset.row);
        let column = parseInt(cell.dataset.column);

        if (token === 1) {
            cell.textContent = 'X';
        } else if (token === 2) {
            cell.textContent = 'O';
        };

    }

    const newGame = () => {
        for (i = 0; i < rows; i++) {
            for (j = 0; j < columns; j++) {
                board[i][j].addToken(0);
            }
        }

        board.printBoard(); 
        console.log('New game has begun!');
    }

    return {putToken, newGame};
}

const players = gameControl().players;
const board = gameBoard(currentPlayer);
const gameBoardInstance = gameBoard().board;
const control = gameControl(gameBoardInstance, "P1", "P2");
const ui = userInterface();

control.newGame();
control.playRound();


