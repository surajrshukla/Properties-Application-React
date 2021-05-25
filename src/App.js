import React, { Component } from 'react';
import { Router, Switch } from 'react-router-dom';
import './App.css';
import { history } from './_helpers/history';
import PublicRoute from './_routers/PublicRoute';
import PrivateRoute from './_routers/PrivateRoute';



import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

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
        hey there
        <MuiThemeProvider theme={theme}>
          <Router history={history} >
            <Switch>
              {/* <PublicRoute exact path="/" component={Adminlogin} /> */}
            </Switch>
          </Router>
        </MuiThemeProvider>
      </div>
    );
  }
}
export default App