import { statusConstants } from "../constants"

const initialState = {
    loading: false,
    success: false,
    message: null,
}

export function status(state = initialState, action) {
    switch(action.type) {
        case statusConstants.SET_LOADING:
            return {
                ...state,
                loading: !state.loading
            };
        case statusConstants.SET_SUCCESS:
            return {
                ...state,
                success: action.isSuccess
            };
        case statusConstants.SET_MESSAGE:
            return {
                ...state,
                message: action.message
            };
        default:
            return state;
    }
}