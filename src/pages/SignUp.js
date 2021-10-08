import React from 'react';
import { Link } from 'react-router-dom';

function SignUp() {
  return (
    <>
      <h1>Registreren</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing
        elit. Aspernatur atque consectetur, dolore eaque
        eligendi harum, numquam, placeat quisquam repellat
        rerum suscipit ullam vitae. A ab ad assumenda,
        consequuntur deserunt doloremque ea eveniet facere
        fuga illum in numquam quia reiciendis rem sequi
        tenetur veniam?
      </p>
      <form>
        <label htmlFor='email'>E-mail</label>
        <input type='email' name='email' id='email' />
        <label htmlFor='user'>Username</label>
        <input type='text' name='username' id='username' />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          name='password'
          id='password'
        />
      </form>
      <p>
        Heb je al een account? Je kunt je{' '}
        <Link to='/signin'>hier</Link> inloggen.
      </p>
    </>
  );
}

export default SignUp;
