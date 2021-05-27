import { api } from './utility.action';
import { PropertyConstants } from '../_constants/property.constants';


export const propertyActions = {
    getProperties
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