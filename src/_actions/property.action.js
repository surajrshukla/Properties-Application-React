import { api } from './utility.action';
import { PropertyConstants } from '../_constants/property.constants';
import { history } from '../_helpers/history';


export const propertyActions = {
    getProperties,
    getMyProperties,
    getPropertyDetails,
    uploadProperties
}

function getProperties(skip) {
    return dispatch => {
        dispatch(request());
        api().get(`/property_services/get_properties/${skip}`).then((response) => {
            if (response.data.code === 200) {
                dispatch(success(response));
            } else {
                dispatch(failure(response));
            }
        }).catch((error) => {
            dispatch(failure(error));
        })
    };

    function request() { return { type: PropertyConstants.GET_PROPERTY_LIST_REQUEST } }
    function success(payload) { return { type: PropertyConstants.GET_PROPERTY_LIST_SUCCESS, payload } }
    function failure(payload) { return { type: PropertyConstants.GET_PROPERTY_LIST_FAILURE, payload } }
}

function getMyProperties(skip) {
    return dispatch => {
        dispatch(request());
        api().get(`/property_services/get_my_properties/${skip}`).then((response) => {
            if (response.data.code === 200) {
                dispatch(success(response));
            } else {
                dispatch(failure(response));
            }
        }).catch((error) => {
            dispatch(failure(error));
        })
    };

    function request() { return { type: PropertyConstants.GET_MY_PROPERTY_LIST_REQUEST } }
    function success(payload) { return { type: PropertyConstants.GET_MY_PROPERTY_LIST_SUCCESS, payload } }
    function failure(payload) { return { type: PropertyConstants.GET_MY_PROPERTY_LIST_FAILURE, payload } }
}

function getPropertyDetails(id) {
    if (id === "0") {
        return {
            type: PropertyConstants.CREATE_NEW_PROPERTY
        }
    } else {
        return dispatch => {
            dispatch(request());
            api().get(`/property_services/get_property_details`).then((response) => {
                if (response.data.code === 200) {
                    dispatch(success(response));
                } else {
                    dispatch(failure(response));
                }
            }).catch((error) => {
                dispatch(failure(error));
            })
        };

        function request() { return { type: PropertyConstants.GET_PROPERTY_DETAIL_REQUEST } }
        function success(payload) { return { type: PropertyConstants.GET_PROPERTY_DETAIL_SUCCESS, payload } }
        function failure(payload) { return { type: PropertyConstants.GET_PROPERTY_DETAIL_FAILURE, payload } }
    }
}

function uploadProperties(data, action) {
    if (action === "IN") {
        return dispatch => {
            dispatch(request());
            const config = {
                'content-type': 'multipart/form-data'
            }
            api(config).post(`/property_services/create_property`, data).then((response) => {
                if (response.data.code === 200) {
                    dispatch(success(response));
                    history.push("/my_properties");
                } else {
                    dispatch(failure(response));
                }
            }).catch((error) => {
                dispatch(failure(error));
            })
        };

        function request() { return { type: PropertyConstants.GET_PROPERTY_DETAIL_REQUEST } }
        function success(payload) { return { type: PropertyConstants.GET_PROPERTY_DETAIL_SUCCESS, payload } }
        function failure(payload) { return { type: PropertyConstants.GET_PROPERTY_DETAIL_FAILURE, payload } }
    } else {
        return dispatch => {
            dispatch(request());
            const config = {
                'content-type': 'multipart/form-data'
            }
            api(config).put(`/property_services/update_property`, data).then((response) => {
                if (response.data.code === 200) {
                    dispatch(success(response));
                    history.push("/my_properties");
                } else {
                    dispatch(failure(response));
                }
            }).catch((error) => {
                dispatch(failure(error));
            })
        };

        function request() { return { type: PropertyConstants.UPDATE_PROPERTY_REQUEST } }
        function success(payload) { return { type: PropertyConstants.UPDATE_PROPERTY_SUCCESS, payload } }
        function failure(payload) { return { type: PropertyConstants.UPDATE_PROPERTY_FAILURE, payload } }
    }
}