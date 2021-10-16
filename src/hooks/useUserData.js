import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import jwt_decode from 'jwt-decode';
import tokenChecker from '../helper/tokenChecker';

const useUserData = () => {
  const [usersData, setUserData] = useState('');
  const history = useHistory();
  const source = axios.CancelToken.source();

  async function fetchUserData(id, token) {
    try {
      const userdata = await axios.get(`http://localhost:3000/600/users/${id}`, {
        cancelToken: source.token,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      setUserData({
        status: 'done',
        isAuth: true,
        user: { username: userdata.data.username, email: userdata.data.email },
      });
      history.push('/profile');
    } catch (e) {
      console.log('userData', e);
      setUserData({ isAuth: false, status: 'done', user: null });
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken = jwt_decode(token);
      const result = tokenChecker(decodedToken);
      if (result) {
        fetchUserData(decodedToken.sub, token);
      } else {
        setUserData({ isAuth: false, status: 'done', user: null });
      }
    } else {
      console.log('custom hook load in use effect');
      setUserData({ isAuth: false, status: 'done', user: null });
    }
    return function cleanup() {
      source.cancel();
    };
  }, []);

  return { usersData, fetchUserData };
};

export default useUserData;
