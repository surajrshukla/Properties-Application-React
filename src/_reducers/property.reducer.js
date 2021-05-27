import { PropertyConstants } from '../_constants/property.constants';
import { isEmpty } from 'lodash';

export function property(state = {}, action) {
    switch (action.type) {
        case PropertyConstants.GET_PROPERTY_LIST_REQUEST:
            return {
                ...state,
                loading: true,
                property_list: []
            }
        case PropertyConstants.GET_PROPERTY_LIST_SUCCESS: {
            const properties = isEmpty(state.property_list) ? action.payload.data.data.property_list : [...state.property_list, ...action.payload.data.data.property_list]
            return {
                ...state,
                loading: false,
                property_list: properties,
                skipped: action.payload.data.data.skipped,
            }
        }
        case PropertyConstants.GET_PROPERTY_LIST_FAILURE:
            return {
                ...state,
                loading: false,
                property_list: []
            }
        default:
            return state
    }
}