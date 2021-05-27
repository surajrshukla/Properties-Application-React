import { api } from './utility.action';
import { RegisterConstants } from '../_constants/register.constants';
import { history } from '../_helpers/history';

export const registerAction = {
    register
}

function register(formData) {

    const request_data = { "formData": formData }

    return dispatch => {
        dispatch(request());
        api().post(`/register_services/register`, request_data).then((response) => {
            if (response.data.code === 200) {
                dispatch(success(response));
                history.push("login")
            } else {
                dispatch(failure(response));
            }
        }).catch((error) => {
            dispatch(failure(error));
        })
    };

    function request() { return { type: RegisterConstants.REGISTER_USER_REQUEST } }
    function success(payload) { return { type: RegisterConstants.REGISTER_USER_SUCCESS, payload } }
    function failure(payload) { return { type: RegisterConstants.REGISTER_USER_FAILURE, payload } }
}