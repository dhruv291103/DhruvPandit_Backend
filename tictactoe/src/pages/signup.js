import React, { useState } from 'react';
import { useAuth } from '../context/authenticated';
import './Signup.css';

const Signup = () => {
  const { signup } = useAuth();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validateInputs = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^[a-zA-Z0-9_]{4,16}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!emailRegex.test(email)) {
      return 'Invalid email format.';
    }
    if (!usernameRegex.test(username)) {
      return 'Username must be 4-16 characters long and contain only letters, numbers, and underscores.';
    }
    if (!passwordRegex.test(password)) {
      return 'Password must be at least 8 characters long, with at least one letter, one number, and one special character.';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      setSuccess('');
      return;
    }

    try {
      await signup(email, username, password);
      setSuccess('User registered successfully!');
      setError('');
      alert('Signup Successfull !')
      // onSignupSuccess();

    } catch (err) {
      setError(err.message);
      setSuccess('');
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
        <button className="signup-button" type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
