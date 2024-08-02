const board = document.getElementById('board');
const message = document.getElementById('message');
let currentPlayer = 'X';
let gameActive = true;
const boardState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleClick(event) {
    const index = event.target.dataset.index;

    if (boardState[index] !== '' || !gameActive) return;

    boardState[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWinner()) {
        message.textContent = `${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (boardState.every(cell => cell !== '')) {
        message.textContent = 'It\'s a tie!';
        gameActive = false;
        return;
    }

    currentPlayer = 'O'; // Computer's turn
    makeComputerMove();
}

function checkWinner() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
    });
}

function makeComputerMove() {
    const emptySquares = Array.from(document.querySelectorAll('.cell'))
        .filter(cell => !cell.textContent || cell.textContent === '');
    const randomSquare = emptySquares[Math.floor(Math.random() * emptySquares.length)];

    if (randomSquare) {
        const index = randomSquare.dataset.index;
        boardState[index] = 'O';
        randomSquare.textContent = 'O';

        if (checkWinner()) {
            message.textContent = 'O wins!';
            gameActive = false;
            return;
        }

        if (boardState.every(cell => cell !== '')) {
            message.textContent = 'It\'s a tie!';
            gameActive = false;
        } else {
            currentPlayer = 'X'; // Player's turn again
        }
    }
}

function resetGame() {
    gameActive = true;
    currentPlayer = 'X';
    boardState.fill('');
    Array.from(board.children).forEach(cell => cell.textContent = '');
    message.textContent = '';
}

board.addEventListener('click', handleClick);
