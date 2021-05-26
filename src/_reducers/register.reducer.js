import { RegisterConstants } from '../_constants/register.constants';

export function register(state = {}, action) {
    switch (action.type) {
        case RegisterConstants.REGISTER_USER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case RegisterConstants.REGISTER_USER_SUCCESS:
            return {
                ...state,
                loading: false,
            }
        case RegisterConstants.REGISTER_USER_FAILURE:
            return {
                ...state,
                loading: false,
            }
        default:
            return state
    }
}