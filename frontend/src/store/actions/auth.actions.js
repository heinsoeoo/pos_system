import { authConstants } from "../constants";
import { apiService } from '../../services';
import { setToken } from '../../utils/token';
import { setUser } from '../../utils/user';

const setAuthUser = user => ({
    type: authConstants.SET_AUTH_USER,
    user: user
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
        } catch (err) {
            console.log(err.response.data);
            await setToken(null);
            await setUser({});
            apiService.setAuthHeader(null);
            dispatch(setAuthUser({}));
        }
    }
}

export const userActions = {
    login,
    setAuthUser
}