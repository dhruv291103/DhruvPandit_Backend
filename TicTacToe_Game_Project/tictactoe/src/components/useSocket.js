import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/authenticated';
import axios from 'axios';

const useSocket = (initialSocket, isSocketInitialized) => {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);
    const [player, setPlayer] = useState(null);
    const [waiting, setWaiting] = useState(true);
    const [winner, setWinner] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [availablePlayers, setAvailablePlayers] = useState([]);
    const [invites, setInvites] = useState([]);
    const [currentRoom, setCurrentRoom] = useState(null);
    const socketRef = initialSocket;
    const { user } = useAuth();
    const apiCalledRef = useRef(false);

    useEffect(() => {
        if (!isSocketInitialized) {
            return;
        }

        if (socketRef && !socketRef.connected) {
            socketRef.connect();
        }

        socketRef.on('gameState', (game) => {
            setSquares(game.squares);
            setXIsNext(game.xIsNext);
            setPlayer(game.players[0] === socketRef.id ? 'X' : 'O');
            setWaiting(!game.full);
            setWinner(game.winner);
            setGameOver(game.gameOver);

            if (game.gameOver && !apiCalledRef.current) {
                const winnerName = game.winner;
                const opponentName = game.players[0] === winnerName ? game.players[1] : game.players[0];
                const currUserName = game.players[0] === winnerName ? game.Players[0] : game.players[1];

                console.log("game log players", game)

                let statusOfMatchWinner = "Win";
                let statusOfMatchOpponent = "Lose";

                if (!game.winner) {
                    statusOfMatchWinner = "Draw";
                    statusOfMatchOpponent = "Draw";
                }
                const time = new Date().toISOString();

                axios.post('http://localhost:4000/scores/addScore', {
                    winner_name: currUserName,
                    opponent_name: opponentName,
                    status_of_match: statusOfMatchWinner,
                    time: time,
                })
                    .then(response => {
                        console.log('Match result for winner stored successfully:', response.data);
                    })
                    .catch(error => {
                        console.error('Error storing match result for winner:', error);
                    });

                axios.post('http://localhost:4000/scores/addScore', {
                    winner_name: opponentName,
                    opponent_name: currUserName,
                    status_of_match: statusOfMatchOpponent,
                    time: time,
                })
                    .then(response => {
                        console.log('Match result for opponent stored successfully:', response.data);
                    })
                    .catch(error => {
                        console.error('Error storing match result for opponent:', error);
                    });

                apiCalledRef.current = true;
            }
        });


        socketRef.on('updateLobby', (players) => {
            setAvailablePlayers(players.filter(player => player !== user.username));
        });

        socketRef.on('gameInvite', (invite) => {
            setInvites(prevInvites => [...prevInvites, invite]);
        });

        socketRef.on('roomJoined', (roomId) => {
            setCurrentRoom(roomId);
        });

        return () => {
            if (socketRef) {
                socketRef.off('gameState');
                socketRef.off('updateLobby');
                socketRef.off('gameInvite');
                socketRef.off('roomJoined');
            }
        };
    }, [socketRef, isSocketInitialized, user]);

    useEffect(() => {
        if (gameOver) {
            alert(winner ? `Game Over! Winner is ${winner}` : `Game Over! It\'s a Draw.`);
        }
    }, [gameOver, winner]);

    const handleClick = (i) => {
        if (currentRoom && !waiting && !gameOver && squares[i] === null && ((xIsNext && player === 'X') || (!xIsNext && player === 'O'))) {
            socketRef.emit('makeMove', { roomId: currentRoom, index: i });
        }
    };

    const handleRestart = () => {
        if (currentRoom) {
            socketRef.emit('restartGame', currentRoom);
            setWinner(null);
            setGameOver(false);
            apiCalledRef.current = false;
        }
    };

    const handleInvite = (playerId) => {
        socketRef.emit('searchPlayer', playerId);
    };

    const handleAcceptInvite = (invite) => {
        setCurrentRoom(invite.roomId);
        socketRef.emit('acceptInvite', invite.roomId);
        setInvites(invites.filter(i => i.roomId !== invite.roomId));
    };

    const status = winner ? `Winner is: ${winner}` :
        gameOver ? 'Game Over: Draw' :
            waiting ? 'Waiting for another player...' :
                ((player === 'X' && xIsNext) || (player === 'O' && !xIsNext)) ? 'Now Your turn' : 'Opponents Turn';

    return {
        squares, xIsNext, player, waiting, winner, gameOver, availablePlayers, invites, currentRoom,
        handleClick, handleRestart, handleInvite, handleAcceptInvite, status
    };
};

export default useSocket;