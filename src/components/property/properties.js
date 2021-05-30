import React, { Component } from 'react';
import Property from './property';

class Properties extends Component {
    render() {
        const { properties } = this.props;
        return (
            <div className="row properties"> {
                properties.map((property) => {
                    return <Property property={property} />
                })
            }
            </div>
        )
    }
}

export default Properties;