import axios from 'axios';

const httpRequest = axios.create({
    baseURL: "https://landing-page-be-gsuf.onrender.com/"
});

export const get = async (
    path,
    options = {
        headers: {
            // 'Content-Type': 'multipart/form-data',
        },
    },
) => {
    const response = await httpRequest.get(path, options);
    return response.data;
};

export const post = async (
    path,
    data,
    options = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    },
) => {
    const response = await httpRequest.post(path, data, options);
    return response.data;
};

export const put = async (path, data, options = {}) => {
    const response = await httpRequest.put(path, data, options);
    return response.data;
};

export const remove = async (path, options = {}) => {
    const response = await httpRequest.delete(path, options);
    return response.data;
};

export default httpRequest;
