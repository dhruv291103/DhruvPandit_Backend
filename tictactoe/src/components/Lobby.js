import React from 'react';
import './Lobby.css';

const Lobby = ({ availablePlayers, onInvite }) => (
    <div className="lobby">
        <h3>Lobby</h3>
        {availablePlayers.length === 0 ? <p>No available players</p> : 
            availablePlayers.map(id => (
                <button key={id} onClick={() => onInvite(id)}>Invite {id}</button>
            ))
        }
    </div>
);

export default Lobby;