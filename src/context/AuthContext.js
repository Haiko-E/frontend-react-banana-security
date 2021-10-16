import React, { useState, createContext, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import useUserData from '../hooks/useUserData';

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
  const [isAuth, setIsAuth] = useState({
    isAuth: false,
    user: { username: '', email: '' },
    status: 'pending',
  });

  const { fetchUserData, usersData } = useUserData();

  const login = (result) => {
    const token = result.data.accessToken;
    const decodedToken = jwt_decode(token);

    localStorage.setItem('token', token);

    fetchUserData(decodedToken.sub, token);
    setIsAuth(usersData);
  };

  const logout = () => {
    setIsAuth({ ...isAuth, isAuth: false, user: null });
    localStorage.clear();
  };

  useEffect(() => {
    setIsAuth(usersData);
  }, [usersData]);

  return (
    <AuthContext.Provider
      value={{
        user: isAuth.user,
        setIsAuth: isAuth.setIsAuth,
        isAuth: isAuth.isAuth,
        login: login,
        logout: logout,
      }}
    >
      {isAuth.status === 'done' ? children : 'loading....'}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
