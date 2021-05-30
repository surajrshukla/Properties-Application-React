import React, { Component } from 'react';
import Property from './property';

class Properties extends Component {
    render() {
        const { properties, isMyProperty } = this.props;

        return (
            <div className="row properties"> {
                properties.map((property) => {
                    return <Property isMyProperty={isMyProperty} key={property._id} property={property} />
                })
            }
            </div>
        )
    }
}

export default Properties;