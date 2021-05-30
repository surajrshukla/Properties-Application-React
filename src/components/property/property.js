import React, { Component } from "react";
import { Carousel } from 'react-responsive-carousel';
import { connect } from 'react-redux';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

import { propertyActions } from "../../_actions/property.action";
import { history } from "../../_helpers/history"


class Property extends Component {

    handleFavouriteClick = (ev) => {
        ev.stopPropagation();
        this.props.toggleFavourite({
            property_id: this.props.property._id,
            action: this.props.property.isFavourite ? "remove" : "add",
            isMyProperty: this.props.isMyProperty
        })
    }

    handlePropertyClick = (ev) => {
        if (!this.props.isMyProperty) {
            return history.push("/dashboard/" + this.props.property._id)
        }
        return history.push("/my_properties/" + this.props.property._id)
    }

    render() {
        const { property } = this.props;
        return (
            <div className="col-12 property mt-2 mb-2 position-relative">
                <div onClick={this.handlePropertyClick} className="card shadow">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-4">
                                <Carousel width={200} showThumbs={false}>
                                    {property.thumbnails && property.thumbnails.map((image, index) => {
                                        return (
                                            <div key={image + "-" + index}>
                                                <img src={image} alt="property-img" />
                                            </div>)
                                    })}
                                </Carousel>
                            </div>
                            <div className="col-4">
                                <div>
                                    <span><b>Property Name: </b></span><span>{property.property_name}</span>
                                </div>
                                <div>
                                    <span><b>Property Price: </b></span><span>{property.price + " /-"}</span>
                                </div>
                                <div>
                                    <span><b>Property Description: </b></span><span>{property.property_description}</span>
                                </div>
                                <div>
                                    <span><b>Locality: </b></span><span>{property.locality}</span>
                                </div>
                                <div>
                                    <span><b>Property Address: </b></span><span>{property.address}</span>
                                </div>
                                <div>
                                    <span><b>Property Bedrooms: </b></span><span>{property.badrooms}</span>
                                </div>
                                <div>
                                    <span><b>Property Bedrooms: </b></span><span>{property.bathrooms}</span>
                                </div>
                                <div>
                                    <span><b>Carpet Area: </b></span><span>{"1700 " + property.carpet_area}</span>
                                </div>
                            </div>
                            <div className="col-4">
                                {property.visit_count && <div>
                                    <span><b>Peaple Visited: </b></span><span>{property.visit_count}</span>
                                </div>}

                                <div>
                                    <span><b>Posted By: </b></span><span>{property.posted_by.username}</span>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div onClick={this.handleFavouriteClick} className="position-absolute" style={{ right: 25, top: 15 }}>
                    {property.isFavourite ? <FavoriteIcon style={{ color: "red" }} /> : <FavoriteBorderIcon />}
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        toggleFavourite: (data) => dispatch(propertyActions.toggleFavourite(data))
    }
}

export default connect(null, mapDispatchToProps)(Property);