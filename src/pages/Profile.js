import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Profile() {
  const [secret, setSecret] = useState({});
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const source = axios.CancelToken.source();

    async function getSecret() {
      try {
        const result = await axios.get('http://localhost:3000/660/private-content', {
          cancelToken: source.token,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        setSecret(result.data);
      } catch (e) {
        console.log('getSecret', e.response.data);
      }
    }

    getSecret();

    return function cleanup() {
      source.cancel();
    };
  }, []);

  return (
    <>
      <h1>Profielpagina</h1>
      <section>
        <h2>Gegevens</h2>
        <p>
          <strong>Gebruikersnaam:</strong> {user.username}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </section>
      <section>
        <h2>{secret.title}</h2>
        <p>{secret.content}</p>
      </section>
      <p>
        Terug naar de <Link to='/'>Homepagina</Link>
      </p>
    </>
  );
}

export default Profile;
