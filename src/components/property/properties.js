import React, { Component } from "react";

class Properties extends Component {
    render() {
        const { properties } = this.props;
        return (
            <div className="row properties"> {
                properties.map((property) => {
                    return
                })
            }
            </div>
        )
    }
}

export default Properties;