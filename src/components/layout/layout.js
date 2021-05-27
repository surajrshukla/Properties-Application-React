import React, { Component } from 'react';
import Navbar from './navbar';
import Main from './main';

class Layout extends Component {
    render() {
        return (
            <div className="container-fluid h-100 p-0 layout">
                <Navbar />
                <Main>{this.props.children}</Main>
            </div>
        )
    }
}

export default Layout;