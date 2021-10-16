import axios from 'axios';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function SignIn() {
  const { login } = useContext(AuthContext);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const result = await axios.post('http://localhost:3000/login', {
        email: e.target[0].value,
        password: e.target[1].value,
      });
      login(result);
    } catch (e) {
      console.log('SignIn', e);
    }
  }

  return (
    <>
      <h1>Inloggen</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum
        debitis dolor dolore fuga id molestias qui quo unde?
      </p>

      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>E-mail</label>
        <input type='email' name='email' id='email' />
        <label htmlFor='password'>Password</label>
        <input type='password' name='password' id='password' />
        <button>Inloggen</button>
      </form>

      <p>
        Heb je nog geen account? <Link to='/signup'>Registreer</Link> je dan eerst.
      </p>
    </>
  );
}

export default SignIn;
