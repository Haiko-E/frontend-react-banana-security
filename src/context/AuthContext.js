import React, { useState, createContext } from 'react';
import { useHistory } from 'react-router';

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
  const [isAuth, setIsAuth] = useState({
    isAuth: false,
    user: '',
  });
  const history = useHistory();

  const login = (e) => {
    e.preventDefault();
    const value = e.target[0].value;

    setIsAuth(() => {
      return { user: value, isAuth: true };
    });
    history.push('/profile');
  };
  console.log(isAuth);

  const logout = () => {
    setIsAuth((prev) => {
      return { ...prev, isAuth: false };
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user: isAuth.user,
        isAuth: isAuth.isAuth,
        login: login,
        logout: logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
