import React from 'react';
import { Route, Redirect } from 'react-router-dom';


const PrivteRoute = ({ component: Component, ...rest }) => {
    return <Route
        {...rest}
        render={(props) =>
            localStorage.getItem('accessToken')
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/login' }} />}
    />
};
export default PrivteRoute;