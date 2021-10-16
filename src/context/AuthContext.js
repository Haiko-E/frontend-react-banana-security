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

  // custom hook
  const { fetchUserData, usersData } = useUserData();

  //Login functie
  const login = (result) => {
    const token = result.data.accessToken;
    const decodedToken = jwt_decode(token);

    localStorage.setItem('token', token);

    fetchUserData(decodedToken.sub, token);
    setIsAuth(usersData);
  };

  //Logout functie
  const logout = () => {
    setIsAuth({ ...isAuth, isAuth: false, user: null });
    localStorage.clear();
  };

  // wanneer userdata verander, vernieuw het naar de nieuwe gebruiker
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
      {isAuth.status === 'pending' ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
