import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { isEmpty } from 'lodash';


import { RenderTextField, RenderSelectField } from '../../../_helpers/reduxFields';
import { propertyActions } from '../../../_actions/property.action';
import { history } from '../../../_helpers/history'


const Localities = {
    "gota": "Gota",
    "sarkhej": "Sarkhej",
    "sola": "Sola"
}

const Bedrooms = [1, 2, 3, 4];
const Bathrooms = [1, 2, 3, 4];
const CarpetArea = ["Sq", "Ft", "Sq Yd"]

class PropertyFormView extends Component {

    componentDidMount() {
        this.props.getPropertyDetails(this.props.match.params.id);
        this.props.increamentVisitCount(this.props.match.params.id);
    }

    handleCancel = (ev) => {
        history.push("/dashboard")
    }


    deleteUploadedImageClick = (index) => {
        const image_name = this.props.propertyDetails.images[index].split("/").pop()
        this.props.deleteImage({ property_id: this.props.match.params.id, image_name: image_name })
    }

    render() {
        return (
            <div className="row m-4">
                <div className="col-6">
                    <h4 className="text-muted">View Property</h4>
                </div>
                <div className="col-6 text-right">
                    <Button className="ml-2" onClick={this.handleCancel} color="primary" variant="contained" size="medium">Go Back</Button>
                </div>
                <div className="col-12"><hr /></div>
                <div className="col-12">
                    <div className="row">
                        <div className="col-sm-12 col-md-6">
                            <div className="card shadow">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-6">
                                            <Field
                                                name="property_name"
                                                type="text"
                                                label="Property Name"
                                                component={RenderTextField}
                                                fullWidth={true}
                                                disabled={true}
                                                autoComplete="off"
                                                margin="dense"
                                                variant="outlined"
                                            />
                                            <Field
                                                name="address"
                                                type="text"
                                                label="Address"
                                                multiline
                                                rows={4}
                                                component={RenderTextField}
                                                fullWidth={true}
                                                disabled={true}
                                                autoComplete="off"
                                                margin="dense"
                                                variant="outlined"
                                            />
                                        </div>
                                        <div className="col-6">
                                            <Field
                                                name="price"
                                                type="text"
                                                label="Price in Rs"
                                                component={RenderTextField}
                                                fullWidth={true}
                                                disabled={true}
                                                autoComplete="off"
                                                margin="dense"
                                                variant="outlined"
                                            />
                                            <Field
                                                name="property_description"
                                                type="text"
                                                label="Property Description"
                                                multiline
                                                rows={4}
                                                component={RenderTextField}
                                                fullWidth={true}
                                                disabled={true}
                                                autoComplete="off"
                                                margin="dense"
                                                variant="outlined"
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-3">
                                            <Field
                                                name="locality"
                                                label="Locality/Area"
                                                component={RenderSelectField}
                                                fullWidth={true}
                                                disabled={true}
                                                autoComplete="off"
                                                margin="dense"
                                                variant="outlined"
                                            >
                                                {Object.keys(Localities).map((key) => {
                                                    return (<MenuItem key={`${key}-${Date.now()}`} value={key}>{Localities[key]}</MenuItem>)
                                                })}
                                            </Field>
                                        </div>
                                        <div className="col-3">
                                            <Field
                                                name="badrooms"
                                                label="Badrooms"
                                                component={RenderSelectField}
                                                fullWidth={true}
                                                disabled={true}
                                                autoComplete="off"
                                                margin="dense"
                                                variant="outlined"
                                            >
                                                {Bedrooms.map((room, index) => {
                                                    return (<MenuItem key={`room-${Date.now()}-${index}`} value={room}>{room}</MenuItem>)
                                                })}
                                            </Field>
                                        </div>
                                        <div className="col-3">
                                            <Field
                                                name="bathrooms"
                                                label="Bathrooms"
                                                component={RenderSelectField}
                                                fullWidth={true}
                                                disabled={true}
                                                autoComplete="off"
                                                margin="dense"
                                                variant="outlined"
                                            >
                                                {Bathrooms.map((room, index) => {
                                                    return (<MenuItem key={`room-${Date.now()}-${index}`} value={room}>{room}</MenuItem>)
                                                })}
                                            </Field>
                                        </div>
                                        <div className="col-3">
                                            <Field
                                                name="carpet_area"
                                                label="Carpet Area"
                                                component={RenderSelectField}
                                                fullWidth={true}
                                                disabled={true}
                                                autoComplete="off"
                                                margin="dense"
                                                variant="outlined"
                                            >
                                                {CarpetArea.map((area, index) => {
                                                    return (<MenuItem key={`carpet_area-${Date.now()}-${index}`} value={area}>{area}</MenuItem>)
                                                })}
                                            </Field>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-12 mt-2">
                                            <div className="row">
                                                <div className="col-12">
                                                    <Carousel width={250} showThumbs={false}>
                                                        {this.props.propertyDetails && this.props.propertyDetails.images && this.props.propertyDetails.images.map((image, index) => {
                                                            return (
                                                                <div key={image + "-" + index}>
                                                                    <img src={image} alt="property-img" />
                                                                </div>)
                                                        })}
                                                    </Carousel>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    let initialValues = {};

    if (!isEmpty(state.property.property_details)) {
        initialValues = state.property.property_details;
    }
    return {
        loading: state.property.loading,
        initialValues,
        propertyDetails: state.property.property_details,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPropertyDetails: (id) => dispatch(propertyActions.getPropertyDetails(id)),
        increamentVisitCount: (id) => dispatch(propertyActions.increamentVisitCount(id))
    }
}

PropertyFormView = reduxForm({
    form: 'PropertyFormView',
    enableReinitialize: true,
})(PropertyFormView)

export default connect(mapStateToProps, mapDispatchToProps)(PropertyFormView);

