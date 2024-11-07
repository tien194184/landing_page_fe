import * as httpRequest from '../utils/httpRequest';

const token = localStorage.getItem('token');

export const post = async (data) => {
    try {
        const res = await httpRequest.post(`/user/product`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        });
        return res;
    } catch (error) {
        if (error.response && error.response.status === 400) {
            return error.response.data;
        }
    }
};

export const postOrder = async (slug, data) => {
    try {
        const res = await httpRequest.post(`/order/${slug}`, data);
        return res;
    } catch (error) {
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
    }
};

export const getListOrder = async () => {
    try {
        const res = await httpRequest.get(`/user/manage-order`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res;
    } catch (error) {
    }
};

export const getListProduct = async () => {
    try {
        const res = await httpRequest.get(`/user/manage-product`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res;
    } catch (error) {
    }
};

export const updateStatusOrder = async (id, data) => {
    try {
        const res = await httpRequest.put(`/user/order/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res;
    } catch (error) {
    }
};

export const editProduct = async (slug, data) => {
    try {
        const res = await httpRequest.post(`/user/product/edit/${slug}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        });
        return res;
    } catch (error) {
        if (error.response && error.response.status === 400) {
            return error.response.data;
        }
    }
};

export const handleDeleteImageProduct = async (slug, data) => {
    try {
        const res = await httpRequest.post(`/user/product/${slug}/delete-image`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res;
    } catch (error) {
    }
};
