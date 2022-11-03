import { getUser } from '../../utils/user';
import { authConstants } from '../constants';

let user = JSON.parse(getUser());
const initialState = {
    isAuthenticated: user? true: false,
    user: user? user: {}
}

export function authenticate(state = initialState, action) {
    switch(action.type) {
        case authConstants.SET_AUTH_USER:
            return {
                ...state,
                isAuthenticated: true,
                user: action.user
            };
        default:
            return state;
    }
}