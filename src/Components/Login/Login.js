import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Logo from '../../olx-logo.png';
import './Login.css';
import { auth } from '../../Firebase/config'; 

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = (e) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(trimmedEmail)) {
      setErrorMessage('Invalid email format');
      return;
    }

    
    signInWithEmailAndPassword(auth, trimmedEmail, password)
      .then(() => {
        setErrorMessage('');
        navigate('/');
      })
      .catch((error) => {
        if (error.code === 'auth/user-not-found') {
          setErrorMessage('No account found with this email.');
        } else if (error.code === 'auth/wrong-password') {
          setErrorMessage('Incorrect password.');
        } else {
          setErrorMessage('Error logging in: ' + error.message);
        }
      });
  };

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt="Logo" />
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
          <br />
          <button type="submit">Login</button>
        </form>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <a href="/signup">Signup</a>
      </div>
    </div>
  );
}