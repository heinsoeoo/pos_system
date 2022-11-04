import axios from 'axios';
import { getToken } from '../utils/token';

const host = "https://pos4invoice.herokuapp.com/";

const token = getToken();

axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

const call = async(method, path, data) => {
    const res = await axios[method](host+path, data);
    return res.data;
}

const setAuthHeader = token => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}


export const apiService = {
    call,
    setAuthHeader
}