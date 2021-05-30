import { api } from './utility.action';
import { PropertyConstants } from '../_constants/property.constants';
import { history } from '../_helpers/history';
import { store } from '../_helpers/store'

export const propertyActions = {
    getProperties,
    getMyProperties,
    getPropertyDetails,
    uploadProperties, toggleFavourite,
    deleteImage, increamentVisitCount
}

function getProperties(skip, limit = 10, reassign = false) {
    return dispatch => {
        dispatch(request());
        api().get(`/property_services/get_properties/${skip}/${limit}`).then((response) => {
            if (response.data.code === 200) {
                response.data.data.reassign = reassign;
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

function getMyProperties(skip, limit = 10, reassign = false) {
    return dispatch => {
        dispatch(request());
        api().get(`/property_services/get_my_properties/${skip}/${limit}`).then((response) => {
            if (response.data.code === 200) {
                response.data.data.reassign = reassign;
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
            api().get(`/property_services/get_property_details/${id}`).then((response) => {
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

function toggleFavourite(data) {
    return dispatch => {
        dispatch(request());
        api().post(`/property_services/toggle_favourite`, data).then((response) => {
            if (response.data.code === 200) {
                dispatch(success(response));
                const propertyState = store.getState().property;
                if (data.isMyProperty) {
                    dispatch(getMyProperties(0, propertyState.my_property_list.length, true))
                } else {
                    dispatch(getProperties(0, propertyState.property_list.length, true))
                }
            } else {
                dispatch(failure(response));
            }
        }).catch((error) => {
            dispatch(failure(error));
        })
    };

    function request() { return { type: PropertyConstants.TOGGLE_FAVOURITE_REQUEST } }
    function success(payload) { return { type: PropertyConstants.TOGGLE_FAVOURITE_SUCCESS, payload } }
    function failure(payload) { return { type: PropertyConstants.TOGGLE_FAVOURITE_FAILURE, payload } }
}

function deleteImage(data) {
    return dispatch => {
        dispatch(request());
        api().delete(`/property_services/delete_image/${data.property_id}/${data.image_name}`).then((response) => {
            if (response.data.code === 200) {
                dispatch(success(response));
                dispatch(getPropertyDetails(data.property_id));
            } else {
                dispatch(failure(response));
            }
        }).catch((error) => {
            dispatch(failure(error));
        })
    };

    function request() { return { type: PropertyConstants.DELETE_IMAGE_REQUEST } }
    function success(payload) { return { type: PropertyConstants.DELETE_IMAGE_SUCCESS, payload } }
    function failure(payload) { return { type: PropertyConstants.DELETE_IMAGE_FAILURE, payload } }
}

function increamentVisitCount(id) {
    return dispatch => {
        dispatch(request());
        api().put(`/property_services/increament_visit_count`, { id }).then((response) => {
            if (response.data.code === 200) {
                dispatch(success(response));
            } else {
                dispatch(failure(response));
            }
        }).catch((error) => {
            dispatch(failure(error));
        })
    };

    function request() { return { type: PropertyConstants.INCREAMENT_VISIT_COUNT_REQUEST } }
    function success(payload) { return { type: PropertyConstants.INCREAMENT_VISIT_COUNT_SUCCESS, payload } }
    function failure(payload) { return { type: PropertyConstants.INCREAMENT_VISIT_COUNT_FAILURE, payload } }
}