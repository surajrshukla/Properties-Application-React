import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { reduxForm, Field } from 'redux-form';
import MenuItem from '@material-ui/core/MenuItem';

import { RenderTextField, RenderSelectField } from '../../_helpers/reduxFields';
import { registerAction } from '../../_actions/register.action';
import Loading from '../loading';

const validate = (values) => {
    const errors = {};
    if (!values.username) {
        errors.username = 'Please enter user name'
    }
    if (!values.email) {
        errors.email = 'Please enter email'
    }
    if (!values.password) {
        errors.password = 'Please enter password'
    }
    return errors;
}

const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
    'Invalid email address' : undefined


class Register extends Component {
    constructor() {
        super();
        this.onSubmit.bind(this);
    }

    onSubmit = (formProps) => {
        this.props.register(formProps);
    }

    render() {
        const { handleSubmit } = this.props;
        if (this.props.loading) {
            return <Loading/>
        }
    
        return (
            <div className="container h-100">
                <div className="row h-100 justify-content-center align-items-center">
                    <div className="col-6">
                        <div className="row">
                            <div className="col-12">
                                <div className="card shadow">
                                    <div className="card-header">
                                        <h6 className="text-center">Register</h6>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-12">
                                                <form onSubmit={handleSubmit(this.onSubmit)}>
                                                    <Field
                                                        name="username"
                                                        type="text"
                                                        label="User Name"
                                                        component={RenderTextField}
                                                        fullWidth={true}
                                                        autoComplete="off"
                                                        margin="dense"
                                                        variant="outlined"
                                                    />
                                                    <Field
                                                        name="email"
                                                        type="text"
                                                        label="Email"
                                                        validate={email}
                                                        component={RenderTextField}
                                                        fullWidth={true}
                                                        autoComplete="off"
                                                        margin="dense"
                                                        variant="outlined"
                                                    />
                                                    <Field
                                                        name="password"
                                                        type="password"
                                                        label="Password"
                                                        component={RenderTextField}
                                                        fullWidth={true}
                                                        variant="outlined"
                                                        margin="dense"
                                                    />
                                                    <Field
                                                        name="user_type"
                                                        fullWidth={true}
                                                        component={RenderSelectField}
                                                        autoComplete="off"
                                                        label="User Type"
                                                        variant="outlined"
                                                        margin="dense"
                                                    >
                                                        <MenuItem value="user">User</MenuItem>
                                                        <MenuItem value="broker">Broker</MenuItem>
                                                    </Field>
                                                    <Button type="submit" color="primary" className="mt-3" variant="contained" size="medium">Register</Button>
                                                </form>
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
    return {
        loading: state.register.loading,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        register: formProps => dispatch(registerAction.register(formProps))
    }
}

Register = reduxForm({
    form: 'Register',
    validate,
})(Register)

export default connect(mapStateToProps, mapDispatchToProps)(Register);