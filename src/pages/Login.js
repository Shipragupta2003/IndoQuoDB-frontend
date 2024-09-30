import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import adminLoginImage from '../images/Admin Login.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Correct variable name

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Login successful:', result);
        // Redirect to admin panel
        navigate('/adminpanel'); // Correct variable name
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div id='contact'>
      <div id='common_bg-login'>
      <img src={adminLoginImage} alt='admin login' style={{ marginTop:'80px',height:'45px', width:'230px', marginLeft:'130px'}}/>
      <form onSubmit={handleLogin}>
        <input
          type='text'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        style={{marginTop:'100px'}}/>
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input id='login-b' type='submit' value='LOGIN' />
        <Link to="/signup">
          <button className='signup' type='button'>SIGNUP</button>
        </Link>
      </form>
      
      </div>
    </div>
  );
};

export default Login;
