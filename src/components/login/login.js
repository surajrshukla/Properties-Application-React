import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';


import { RenderTextField } from '../../_helpers/reduxFields';
import Loading from '../loading';
import { loginActions } from "../../_actions/login.action";

const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
        'Invalid email address' : undefined
    
const validate = (values) => {
    const errors = {};
    if (!values.email) {
        errors.email = 'Please enter email'
    }
    if (!values.password) {
        errors.password = 'Please enter password'
    }
    return errors;
}


class Login extends Component {
    constructor() {
        super();
        this.onSubmit.bind(this);
    }

    onSubmit = (formProps) => {
        this.props.login(formProps);
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
                                        <h6 className="text-center">Login</h6>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-12">
                                                <form onSubmit={handleSubmit(this.onSubmit)}>
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
                                                    <Button type="submit" color="primary" className="mt-3" variant="contained" size="medium">Login</Button>
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


Login = reduxForm({
    form: 'Login',
    validate,
})(Login)

function mapStateToProps(state) {
    return {
        loading: state.login.loading,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        login: formProps => dispatch(loginActions.login(formProps))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);