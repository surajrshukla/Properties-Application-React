import { LoginConstants } from '../_constants/login.constants';

export function login(state = {}, action) {
    switch (action.type) {
        case LoginConstants.LOGIN_REQUEST:
            return {
                ...state,
                loading: true
            }
        case LoginConstants.LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
            }
        case LoginConstants.LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
            }
        default:
            return state
    }
}