import React, { useEffect } from 'react';
import Board from './Board';
import Lobby from './Lobby';
import Invites from './Invites';
import './Game.css';
import useSocket from './useSocket';
import { useAuth } from '../context/authenticated';

const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const Game = () => {
    const { socket, isSocketInitialized } = useAuth();
    const {
        squares, xIsNext, player, waiting, winner, gameOver, availablePlayers, invites, currentRoom,
        handleClick, handleRestart, handleInvite, handleAcceptInvite, status
    } = useSocket(socket, isSocketInitialized);

    useEffect(() => {
        if (isSocketInitialized && socket) {
            socket.emit('updateLobby', availablePlayers);
        }
    }, [socket, isSocketInitialized, availablePlayers]);

    const getWinningCombination = () => {
        for (let line of winningLines) {
            const [a, b, c] = line;
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return line;
            }
        }
        return null;
    };

    const winningCombination = getWinningCombination();

    const userWon = winner === player;


    if (!isSocketInitialized) {
        return <div>Loading...</div>;
    }

    return (
        <div className="game">
            <div className="status">{status}</div>
            {player && <div className="player">You are: "{player}"</div>}
            <Board
                squares={squares}
                onClick={handleClick}
                winningCombination={winningCombination}
                userWon={userWon}
            />
            <button className="restart" onClick={handleRestart}>
                Restart Game
            </button>
            <Lobby availablePlayers={availablePlayers} onInvite={handleInvite} />
            <Invites invites={invites} onAcceptInvite={handleAcceptInvite} />
        </div>
    );
};

export default Game;
