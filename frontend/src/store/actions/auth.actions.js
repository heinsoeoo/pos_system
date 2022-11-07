import { authConstants } from "../constants";
import { apiService } from '../../services';
import { deleteToken, setToken } from '../../utils/token';
import { deleteUser, setUser } from '../../utils/user';
import { statusActions } from './status.actions';

const setAuthUser = user => ({
    type: authConstants.SET_AUTH_USER,
    user
})

const login = credentials => {
    return async (dispatch) => {
        dispatch(statusActions.setLoading());
        try {
            const response = await apiService.call('post', 'login', credentials);
            const {user, token} = response;
            await setToken(token);
            await setUser(JSON.stringify(user));
            apiService.setAuthHeader(token);
            dispatch(setAuthUser(user));
            dispatch(statusActions.setSuccess(true));
            dispatch(statusActions.setMessage("Logged in successfully"));
        } catch (err) {
            await deleteToken();
            await deleteUser();
            apiService.setAuthHeader(null);
            dispatch(setAuthUser({}));
            dispatch(statusActions.setSuccess(false));
            dispatch(statusActions.setMessage(err.response.data?.error));
        }
        dispatch(statusActions.setLoading());
    }
}

const register = credentials => {
    return async (dispatch) => {
        dispatch(statusActions.setLoading());
        try {
            const response = await apiService.call('post', 'register', credentials);
            const {user, token} = response;
            await setToken(token);
            await setUser(JSON.stringify(user));
            apiService.setAuthHeader(token);
            dispatch(setAuthUser(user));
            dispatch(statusActions.setSuccess(true));
            dispatch(statusActions.setMessage("Registered successfully"));
        } catch (err) {
            await deleteToken();
            await deleteUser();
            apiService.setAuthHeader(null);
            dispatch(setAuthUser({}));
            dispatch(statusActions.setSuccess(false));
            dispatch(statusActions.setMessage(err.response.data?.error));
        }
        dispatch(statusActions.setLoading());
    }
}

const logout = () => {
    return async (dispatch) => {
        dispatch(statusActions.setLoading());
        await deleteToken();
        await deleteUser();
        apiService.setAuthHeader(null);
        dispatch(setAuthUser({}));
        dispatch(statusActions.setSuccess(true));
        dispatch(statusActions.setMessage("Logged out successfully"));
        dispatch(statusActions.setLoading());
    }
}

export const userActions = {
    login,
    register,
    logout,
    setAuthUser
}