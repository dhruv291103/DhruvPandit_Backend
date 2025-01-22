import React from 'react';
import './Board.css';

function Board({ squares, onClick, winningCombination, userWon }) {
    function renderSquare(i) {
        const isWinningSquare = winningCombination && winningCombination.includes(i);
        return (
            <button
                className={`square ${isWinningSquare ? (userWon ? 'winning-square' : 'losing-square') : ''}`}
                onClick={() => onClick(i)}
            >
                {squares[i]}
            </button>
        );
    }

    return (
        <div>
            <br></br>
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    );
}

export default Board;
