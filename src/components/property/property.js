import React, { Component } from "react";


class Property extends Component {
    render() {
        const { property } = this.props;
        return (
            <div className="col-4 property">
                <div className="card shadow">
                    property
                </div>
            </div>
        )
    }
}