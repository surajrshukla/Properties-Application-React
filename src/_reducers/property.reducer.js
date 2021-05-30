import { PropertyConstants } from '../_constants/property.constants';
import { isEmpty } from 'lodash';

export function property(state = {}, action) {
    switch (action.type) {
        case PropertyConstants.GET_PROPERTY_LIST_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case PropertyConstants.GET_PROPERTY_LIST_SUCCESS: {
            let properties;
            if (isEmpty(state.property_list)) {
                properties = action.payload.data.data.property_list
            } else if (action.payload.data.data.reassign) {
                properties = action.payload.data.data.property_list
            } else {
                properties = [...state.property_list, ...action.payload.data.data.property_list]
            }
            return {
                ...state,
                loading: false,
                property_list: properties,
                skipped: action.payload.data.data.skipped,
                has_more_properties: action.payload.data.data.has_more_data
            }
        }
        case PropertyConstants.GET_PROPERTY_LIST_FAILURE:
            return {
                ...state,
                loading: false,
                property_list: []
            }
        case PropertyConstants.GET_MY_PROPERTY_LIST_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case PropertyConstants.GET_MY_PROPERTY_LIST_SUCCESS: {
            let properties;
            if (isEmpty(state.my_property_list)) {
                properties = action.payload.data.data.property_list
            } else if (action.payload.data.data.reassign) {
                properties = action.payload.data.data.property_list
            } else {
                properties = [...state.my_property_list, ...action.payload.data.data.property_list]
            }
            return {
                ...state,
                loading: false,
                my_property_list: properties,
                skipped_my_proprties: action.payload.data.data.skipped_my_proprties,
                has_more_my_properties: action.payload.data.data.has_more_data
            }
        }
        case PropertyConstants.GET_MY_PROPERTY_LIST_FAILURE:
            return {
                ...state,
                loading: false,
                my_property_list: []
            }
        case PropertyConstants.CREATE_NEW_PROPERTY:
            return {
                ...state,
                loading: false,
                property_details: {}
            }
        case PropertyConstants.GET_PROPERTY_DETAIL_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case PropertyConstants.GET_PROPERTY_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                property_details: action.payload.data.data
            }
        case PropertyConstants.GET_PROPERTY_DETAIL_FAILURE:
            return {
                ...state,
                loading: false,
            }
        case PropertyConstants.CREATE_PROPERTY_REQUEST:
            return {
                ...state,
                loading: true
            }
        case PropertyConstants.CREATE_PROPERTY_SUCCESS:
            return {
                ...state,
                loading: false
            }
        case PropertyConstants.CREATE_PROPERTY_FAILURE:
            return {
                ...state,
                loading: false
            }
        case PropertyConstants.UPDATE_PROPERTY_REQUEST:
            return {
                ...state,
                loading: true
            }
        case PropertyConstants.UPDATE_PROPERTY_SUCCESS:
            return {
                ...state,
                loading: false
            }
        case PropertyConstants.UPDATE_PROPERTY_FAILURE:
            return {
                ...state,
                loading: false
            }
        case PropertyConstants.TOGGLE_FAVOURITE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case PropertyConstants.TOGGLE_FAVOURITE_SUCCESS:
            return {
                ...state,
                loading: false
            }
        case PropertyConstants.TOGGLE_FAVOURITE_FAILURE:
            return {
                ...state,
                loading: false
            }
        case PropertyConstants.DELETE_IMAGE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case PropertyConstants.DELETE_IMAGE_SUCCESS:
            return {
                ...state,
                loading: false
            }
        case PropertyConstants.DELETE_IMAGE_FAILURE:
            return {
                ...state,
                loading: false
            }
        case PropertyConstants.INCREAMENT_VISIT_COUNT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case PropertyConstants.INCREAMENT_VISIT_COUNT_SUCCESS:
            return {
                ...state,
                loading: false
            }
        case PropertyConstants.INCREAMENT_VISIT_COUNT_FAILURE:
            return {
                ...state,
                loading: false
            }

        default:
            return state
    }
}