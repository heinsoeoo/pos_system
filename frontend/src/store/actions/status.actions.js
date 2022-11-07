import { statusConstants } from "../constants";

const setLoading = () => ({
    type: statusConstants.SET_LOADING
});

const setSuccess = isSuccess => ({
    type: statusConstants.SET_SUCCESS,
    isSuccess
});

const setMessage = msg => ({
    type: statusConstants.SET_MESSAGE,
    message: msg
});

export const statusActions = {
    setLoading,
    setSuccess,
    setMessage
}