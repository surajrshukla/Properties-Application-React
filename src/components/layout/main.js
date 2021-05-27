import React, { Component } from 'react';


class Main extends Component {
    render() {
        return (
            <div className="row main">
                <div className="col-12">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Main;