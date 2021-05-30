import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
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
import { bytesToSize } from '../../../_helpers/heloper';
import Loading from '../../loading';


const Localities = {
    "gota": "Gota",
    "sarkhej": "Sarkhej",
    "sola": "Sola"
}

const Bedrooms = [1, 2, 3, 4];
const Bathrooms = [1, 2, 3, 4];
const CarpetArea = ["Sq", "Ft", "Sq Yd"]


const validate = (values) => {
    const errors = {};
    if (!values.property_name) {
        errors.property_name = 'Please enter property name'
    }
    if (!values.price) {
        errors.price = 'Please enter price'
    }
    if (!values.locality) {
        errors.locality = 'Please enter locality'
    }
    if (!values.badrooms) {
        errors.badrooms = 'please enter badroom detail'
    }
    if (!values.carpet_area) {
        errors.carpet_area = 'please select carpet area'
    }

    return errors;
}

class PropertyForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            files: [],
            filesToDelete: []
        }
    }

    componentDidMount() {
        this.props.getPropertyDetails(this.props.match.params.id);
    }

    onSubmit = (formProps) => {
        const data = new FormData()
        debugger

        data.append('property_details', JSON.stringify(formProps));
        for (let i = 0; i < this.state.files.length; i++) {
            data.append('files', this.state.files[i]);
        }

        if (this.props.match.params.id === "0") {
            this.props.uploadProperties(data, "IN");
        } else {
            data.append('property_id', this.props.match.params.id);
            if (!isEmpty(this.state.filesToDelete)) {
                for (let i = 0; i < this.state.filesToDelete.length; i++) {
                    data.append('files_to_delete', this.state.filesToDelete[i]);
                }
            }
            this.props.uploadProperties(data, "UP");
        }
    }

    handleCancel = (ev) => {
        history.push("/my_properties")
    }

    onChangeHandler = (ev) => {
        if (ev.target.files.length > 5) {
            alert("You can not upload more then 5 iamges");
            return
        }
        let files = [];
        let size = 0;
        for (var i = 0; i < ev.target.files.length; i++) {
            files.push(ev.target.files[i]);
            size = size + ev.target.files[i].size;
        }

        this.setState({ files: files });
        ev.target.value = null;
    }

    deleteClick = (index) => {
        let files = this.state.files;
        files.splice(index, 1);
        this.setState({ files: files });
    }

    render() {

        if (this.props.loading) return <Loading />

        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit)} className="row m-4">
                <div className="col-6">
                    <h4 className="text-muted">{this.props.match.params.id === "0" ? "Create Property" : "Edit Property"}</h4>
                </div>
                <div className="col-6 text-right">
                    <Button type="submit" color="primary" variant="contained" size="medium">Save</Button>
                    <Button className="ml-2" onClick={this.handleCancel} color="primary" variant="contained" size="medium">Cancel</Button>
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
                                        <div className="col-12">
                                            <h6>Select your files</h6>
                                            <Fab component="label" size="small" color="primary" aria-label="Upload Files" >
                                                <AddIcon fontSize="small" />
                                                <input type="file" multiple name="image" accept="image/*" className="d-none" onChange={this.onChangeHandler} />
                                            </Fab>
                                        </div>
                                        <div className="col-12 mt-2">
                                            <div className="row">
                                                {this.state.files && this.state.files.map((row, index) => {
                                                    return (
                                                        <div className="col-6" key={`${row.name}-${index}`}>
                                                            <div className="card">
                                                                <div className="card-body">
                                                                    <div className="row">
                                                                        <div className="col-10">
                                                                            <h6> {row.name} </h6>
                                                                            <small>{bytesToSize(row.size)}</small>
                                                                        </div>
                                                                        <div className="col-2 p-0">
                                                                            <IconButton aria-label="Delete" color="default" onClick={() => this.deleteClick(index)}>
                                                                                <DeleteIcon size="small"></DeleteIcon>
                                                                            </IconButton>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>)
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </form>
        )
    }
}

function mapStateToProps(state) {
    let initialValues = {};
    if (isEmpty(state.property.property_form_details)) {
        initialValues = state.property.property_form_details;
    }
    return {
        initialValues,
        propertyDetails: state.property.property_details,
        loading: state.property.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPropertyDetails: (id) => dispatch(propertyActions.getPropertyDetails(id)),
        uploadProperties: (data, action) => dispatch(propertyActions.uploadProperties(data, action))
    }
}

PropertyForm = reduxForm({
    form: 'PropertyForm',
    validate,
})(PropertyForm)

export default connect(mapStateToProps, mapDispatchToProps)(PropertyForm);

