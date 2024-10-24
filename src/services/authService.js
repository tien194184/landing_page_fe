import * as httpRequest from '../utils/httpRequest';

const token = localStorage.getItem('token');

export const post = async (data) => {
    try {
        const res = await httpRequest.post(`/user/product`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 400) {
            return error.response.data;
        }
    }
};

export const postOrder = async (slug, data) => {
    try {
        const res = await httpRequest.post(`/order/${slug}`, data);
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 400) {
            return error.response.data;
        }
    }
};

export const signup = async (data) => {
    try {
        const res = await httpRequest.post(`/signup`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return res;
    } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 500) {
            return error.response.data;
        }
        if (error.response && error.response.status === 401) {
            return error.response.data;
        }
    }
};

export const login = async (data) => {
    try {
        const res = await httpRequest.post(`/login`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return res;
    } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 500) {
            return error.response.data;
        }
        if (error.response && error.response.status === 401) {
            return error.response.data;
        }
    }
};

export const getProduct = async (slug) => {
    try {
        const res = await httpRequest.get(`/product/${slug}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
