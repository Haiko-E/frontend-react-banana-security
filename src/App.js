import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Profile from './pages/Profile';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import PrivateRoute from './components/PrivateRoute';
import './App.css';
import { AuthContext } from './context/AuthContext';

function App() {
  const { isAuth } = useContext(AuthContext);
  return (
    <>
      <NavBar />
      <div className='content'>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <PrivateRoute isAuth={isAuth} path='/profile'>
            <Profile />
          </PrivateRoute>
          <Route exact path='/signin'>
            <SignIn />
          </Route>
          <Route exact path='/signup'>
            <SignUp />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default App;
