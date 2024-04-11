function gameBoard(players) {
    let docCell = document.querySelectorAll('.cell')

    let rows = 2; 
    let columns = 2;
    let board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = []; 
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell(currentPlayer.token));
        }
    }

    const getBoard = () => board;

    const putToken = (currentPlayer) => {
        token = currentPlayer.token; 

        if (token === 1) {
            docCell.textContent = 'X';
        } else if (token === 2) {
            docCell.textContent = 'O';
        };
    }

    docCell.forEach(cell => {
        cell.addEventListener('click', () => putToken())});

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

    const printBoard = () => {
        for (let i = 0; i < rows; i++) {
            let rowString = ' ';
            for (let j = 0; j < columns; j++) {
                rowString += board[i][j].getValue() + ' ';
            }
            console.log(rowString);
        }
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
    return {getBoard, dropToken, printBoard, board};
}


function gameControl(board, playerOneName = 'P1', playerTwoName = 'P2') {
    let currentPlayer = 0;
    
    let rows = 2;
    let columns = 2; 
    
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

    //switch player turn 
    const switchPlayer = () => {
        let playerOneTurn = !playerOneTurn;
    }

    const getCurrentPlayer = () => {
        currentPlayer = players[1] ? players[0] : players[1];

        return currentPlayer;
    }

    //play new round 

    const newGame = () => {
        for (i = 0; i < rows; i++) {
            for (j = 0; j < columns; j++) {
                board[i][j].addToken(0);
            }
        }

        board.printBoard(); 
        console.log('New game has begun!');
    }

    //play round 

    const playRound = () => {
        switchPlayer();
        console.log("It's" + getCurrentPlayer().name + ("'s turn."))
        board.printBoard();

        return {switchPlayer, playRound};
    }

    //check for win 
    let playerOne;
    let playerTwo;

    if (
        board.includes([1, 1, 1]) || 
        board.includes([1, 0, 0] && [0, 1, 0] && [0, 0, 1]) ||
        board.includes([1, 0, 0] && [1, 0, 0] && [1, 0, 0]) ||
        board.includes ([0, 1, 0] && [0, 1, 0] && [0, 1, 0]) ||
        board.includes([0, 0, 1] && [0, 0, 1] && [0, 0, 1])
    ) {
        playerOne = 'win'
        console.log (players[0].name + 'wins!');
    } 
    
    if (
        board.includes([2, 2, 2]) || 
        board.includes([2, 0, 0] && [0, 2, 0] && [0, 0, 2]) ||
        board.includes([2, 0, 0] && [2, 0, 0] && [2, 0, 0]) ||
        board.includes ([0, 2, 0] && [0, 2, 0] && [0, 2, 0]) ||
        board.includes([0, 0, 2] && [0, 0, 2] && [0, 0, 2])
    ) {
        playerTwo = 'win'
        console.log (players[1].name + 'wins!'); 
    } 

    //check for draw
    if (!playerOne === 'win' && !playerTwo === 'win' && board.every(item => {
        item > 0 === true;})) {
            console.log ("It's a draw!");
    } else {
        return;
    }
    
    return {getCurrentPlayer, newGame, playRound, players};
}

const players = gameControl().players;
const board = gameBoard();
const control = gameControl();

control.newGame();
control.playRound();