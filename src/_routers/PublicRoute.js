import React from 'react';
import {  Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ component: Component, user, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        user
          ? <Redirect to={{ pathname: '/error/404' }} />
          : <Component user={user} {...props} />}
    />
);

export default PublicRoute;