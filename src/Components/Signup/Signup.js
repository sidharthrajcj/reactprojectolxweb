import React, { useState } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../Firebase/config';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(trimmedEmail)) {
      setErrorMessage('Invalid email format');
      return;
    }

    createUserWithEmailAndPassword(auth, trimmedEmail, password)
      .then((userCredential) => {
        return updateProfile(userCredential.user, { displayName: username })
          .then(() => {
            const user = userCredential.user;
            return setDoc(doc(db, "users", user.uid), {
              id: user.uid,
              username,
              email: trimmedEmail,
              phone,
              password
            });
          });
      })
      .then(() => {
        console.log('User created and data stored in Firestore successfully');
        setErrorMessage('');
        console.log('Navigating to login page...'); 
        navigate('/login');
    })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          setErrorMessage('This email is already in use. Please try logging in.');
        } else {
          setErrorMessage('Error creating user: ' + error.message);
        }
      });
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="Logo" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button type="submit">Signup</button>
        </form>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <a href="/login">Login</a>
      </div>
    </div>
  );
}
