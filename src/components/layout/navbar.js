import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { history } from '../../_helpers/history';

class Navbar extends Component {
    handleLogout = (ev) => {
        localStorage.removeItem("accessToken");
        history.push("/login");
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Button size="small">
                    OpenXcell
                </Button>
                <div className="collapse navbar-collapse ml-4" id="navbarNav">
                    <ul className="navbar-nav ml-2">
                        <li className="nav-item active">
                            <Link to="/dashboard">Dashboard</Link>
                        </li>
                        <span className="ml-2 mr-2">|</span>
                        <li className="nav-item ml-1">
                            <Link to="/my_properties">My Properties</Link>
                        </li>
                    </ul>
                </div>
                <Button size="small" onClick={this.handleLogout}>
                    Logout
                </Button>
            </nav>
        )
    }
}

export default Navbar;