import axios from 'axios';

const host = "http://localhost:3001/";

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