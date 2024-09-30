import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import successImage from '../images/signup.png';
import signupimg from '../images/Signup1.png'; // Adjust the path if necessary

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccessImage, setShowSuccessImage] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.status === 201) {
        const result = await response.json();
        console.log('Signup successful:', result);
        setShowSuccessImage(true); // Show success image

        // Hide the image after 2 seconds
        setTimeout(() => {
          setShowSuccessImage(false);
        }, 2000);
      } else {
        console.error('Signup failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div id='contact'>
      <div id='common_bg'>
        {showSuccessImage && (
          <div className='img-box'>
            <div className="success-image">
              <img src={successImage} alt="Signup Successful" />
            </div>
          </div>
        )}

        <img src={signupimg} alt='signup' style={{height:'45px', marginBottom:'70px', marginTop:'60px',marginLeft:'190px'}}/>
        <form onSubmit={handleSignup}>
          <input
            type='text'
            placeholder='Name'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input id='signup-b' type='submit' value='SIGNUP' />
          <Link to="/login">
            <button className='signup' type='button'>LOGIN</button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
