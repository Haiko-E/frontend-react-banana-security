import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ isAuth, children, ...rest }) => {
  return (
    <Route {...rest}>
      {isAuth ? children : <Redirect to='/' />}
    </Route>
  );
};

export default PrivateRoute;
