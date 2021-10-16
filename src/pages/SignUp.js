import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

function SignUp() {
  const history = useHistory();

  async function SubmitHandler(e) {
    e.preventDefault();
    const email = e.target[0].value;
    const user = e.target[1].value;
    const password = e.target[2].value;

    try {
      const result = await axios.post('http://localhost:3000/register', {
        email: email,
        password: password,
        username: user,
      });
      console.log(result.data.accesToken);
      history.push('/signin');
    } catch (e) {
      console.log(e.response.data);
    }
  }

  return (
    <>
      <h1>Registreren</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque
        consectetur, dolore eaque eligendi harum, numquam, placeat quisquam repellat
        rerum suscipit ullam vitae. A ab ad assumenda, consequuntur deserunt
        doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi
        tenetur veniam?
      </p>
      <form onSubmit={SubmitHandler}>
        <label htmlFor='email'>E-mail</label>
        <input type='email' name='email' id='email' />
        <label htmlFor='user'>Username</label>
        <input type='text' name='username' id='username' />
        <label htmlFor='password'>Password</label>
        <input type='password' name='password' id='password' />
        <button>Registreren</button>
      </form>
      <p>
        Heb je al een account? Je kunt je <Link to='/signin'>hier</Link> inloggen.
      </p>
    </>
  );
}

export default SignUp;
