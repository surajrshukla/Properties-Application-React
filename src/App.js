import React, { Component } from 'react';
import {Router, Switch} from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import './App.css';
import PublicRoute from './_routers/PublicRoute';
import PrivateRoute from './_routers/PrivateRoute';
import { history } from "./_helpers/history";

import Register from './components/register/register';
import Login from './components/login/login';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#4285F4' },
    secondary: { main: '#4285F4' },
    danger: { main: '#ac2925' }
  },
});

class App extends Component {
    render() {
    return (
        <div className="h-100">
            <MuiThemeProvider theme={theme}>
                <Router history={history}>
                    <Switch>
                        <PublicRoute exact path="/" component={Register} />
                        <PublicRoute exact path="/login" component={Login} />
                    </Switch>
                </Router>
            </MuiThemeProvider>
        </div>
    );
  }
}
export default App