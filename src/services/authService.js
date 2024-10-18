import * as httpRequest from '../utils/httpRequest';
export const post = async (data) => {
    try {
        const res = await httpRequest.post(`/user/product/670e454d24d1cb40f5c45d57`, data);
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 400) {
            return error.response.data;
        }
    }
};
export const postLogin = async (data) => {
    try {
        const res = await httpRequest.post(`/login`, data);
        console.log(res);
        localStorage.setItem('accessToken', res);
        localStorage.setItem('authenticated', res.authenticated);
        localStorage.setItem('authorities', res.authorities[0].authority);
        localStorage.setItem('credentials', res.credentials);
        localStorage.setItem('details', res.details);
        localStorage.setItem('name', res.name);
        localStorage.setItem('principal', res.principal);

        return true;
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
        const res = await httpRequest.get(`/product/${slug}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
