import { authConstants } from "../constants";
import { apiService } from '../../services';
import { deleteToken, setToken } from '../../utils/token';
import { deleteUser, setUser } from '../../utils/user';
import { toast } from 'react-toastify';

const setAuthUser = user => ({
    type: authConstants.SET_AUTH_USER,
    user
})

const login = credentials => {
    return async (dispatch) => {
        try {
            const response = await apiService.call('post', 'login', credentials);
            const {user, token} = response;
            await setToken(token);
            await setUser(JSON.stringify(user));
            apiService.setAuthHeader(token);
            dispatch(setAuthUser(user));
            await toast.success("Logged in successfully");
            console.log('toasted');
        } catch (err) {
            await deleteToken();
            await deleteUser();
            apiService.setAuthHeader(null);
            dispatch(setAuthUser({}));
            toast.error(err.response.data?.error, {autoClose: 1000});
        }
    }
}

const logout = () => {
    return async (dispatch) => {
        await deleteToken();
        await deleteUser();
        apiService.setAuthHeader(null);
        dispatch(setAuthUser({}));
        toast.success("Logged out successfully");
    }
}

export const userActions = {
    login,
    logout,
    setAuthUser
}