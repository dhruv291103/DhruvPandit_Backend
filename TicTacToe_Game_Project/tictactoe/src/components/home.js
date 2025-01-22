import React from 'react';
import { TowerControl as GameController } from 'lucide-react';
import './Home.css';

const Home = ({ onPlayClick, onLoginClick, onSignupClick }) => {
  return (
    <div>
      <div className="home-container">
        <div className="content-card">
          <div className="header">
            <GameController className="game-icon" />
            <h1 className="title">Welcome to TicTacToe!</h1>
            <p className="subtitle">
              Challenge yourself in the classic game of X's and O's. Play against friends
              and become the ultimate TicTacToe champion!
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card realtime">
              <h3 className="feature-title realtime">Real-time Play</h3>
              <p className="feature-description">Instant moves and responses</p>
            </div>
            <div className="feature-card stats">
              <h3 className="feature-title stats">Track Stats</h3>
              <p className="feature-description">Monitor your progress</p>
            </div>
            <div className="feature-card leaderboard">
              <h3 className="feature-title leaderboard">Leaderboard</h3>
              <p className="feature-description">Compete with others</p>
            </div>
          </div>

          <div className="buttons-container">
            <button className="play-button" onClick={onPlayClick}>
              Play Now
            </button>
            <div className="auth-buttons">
              <button className="auth-button login-button" onClick={onLoginClick}>
                Login
              </button>
              <button className="auth-button signup-button" onClick={onSignupClick}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
