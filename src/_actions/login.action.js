import { API_URL } from './utility.action';
import { LoginConstants } from '../_constants/login.constants';
import { history } from '../_helpers/history';

const axios = require('axios');


export const loginActions =  {
    login
}

function login(formData) {

    const request_data = { "formData": formData }

    return dispatch => {
        dispatch(request());
        axios.post(`${API_URL}/login_services/login`, request_data).then((response) => {
            if (response.data.code === 200) {
                dispatch(success(response));
                localStorage.setItem('accessToken', response.data.data.accessToken);
                history.push("/dashboard")
            } else {
                dispatch(failure(response));
            }
        }).catch((error) => {
            dispatch(failure(error));
        })
    };

    function request() { return { type: LoginConstants.LOGIN_REQUEST } }
    function success(payload) { return { type: LoginConstants.LOGIN_SUCCESS, payload } }
    function failure(payload) { return { type: LoginConstants.LOGIN_FAILURE, payload } }
}