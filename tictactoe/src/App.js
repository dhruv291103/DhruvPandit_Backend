import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/authenticated';
import Login from './pages/login';
import Signup from './pages/signup';
import Game from './components/Game';
import Home from './components/home';
import Navbar from './components/navbar';

const AppContent = () => {
  const { isAuthenticated, user, logout, login, signup, authError } = useAuth();
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [showGame, setShowGame] = useState(false);
  // const [showHomePage, setHomePage] = useState(true);

  const handleHomeClick = () => {
    setShowHomePage(true);
    setShowLoginForm(false);
    setShowSignupForm(false);
    setShowGame(false);
  };

  const handlePlayClick = () => {
    if (!isAuthenticated) {
      setShowLoginForm(true);
    } else {
      setShowGame(true);
    }
  };

  const handleLoginClick = () => {
    setShowLoginForm(true);
    setShowSignupForm(false);
  };

  const handleSignupClick = () => {
    setShowSignupForm(true);
    setShowLoginForm(false);
  };

  return (
    <div className="App">
      <Navbar
        onHomeClick={handleLoginClick}
        onLoginClick={handleLoginClick}
        onSignupClick={handleSignupClick}
        onLogoutClick={logout}
        isAuthenticated={isAuthenticated}
        user={user}
      />

      {isAuthenticated ? (
        <>
          {showGame ? (
            <Game />
          ) : (
            <Home
              onPlayClick={handlePlayClick}
              onLoginClick={handleLoginClick}
              onSignupClick={handleSignupClick}
            />
          )}
        </>
      ) : (
        <>
          {showLoginForm && <Login onLogin={login} error={authError} />}
          {showSignupForm && <Signup onSignup={signup} error={authError} />}
          {!showLoginForm && !showSignupForm && (
            <Home
              onPlayClick={handlePlayClick}
              onLoginClick={handleLoginClick}
              onSignupClick={handleSignupClick}
            />
          )}


        </>
      )}
    </div>
  );
};

const App = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);

export default App;