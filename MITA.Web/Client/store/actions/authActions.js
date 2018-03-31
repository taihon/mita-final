import axios from 'axios';
import jwt_decode from 'jwt-decode';
import * as actionTypes from './actionTypes';

const authSuccess = token => {
    const tokenData = jwt_decode(token);
    const userinfo = {
        email: tokenData["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
        token: token
    }
    return {
        type: actionTypes.AUTH_LOGIN_SUCCESS,
        payload: userinfo
    };
}
export const login = (email, password) => {
    return dispatch => {
        dispatch({ type: actionTypes.AUTH_LOGIN_START });
        return axios.post("/api/account/login",
            { email: email, password: password })
            .then(data => {
                localStorage.setItem("token", data.data.token);
                dispatch(authSuccess(data.data.token));
            })
            .catch(error => console.log(error));
    }
}
const autoLogout = at => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, at * 1000);
    }
}
export const logout = () => {
    localStorage.removeItem("token");
    return {
        type: actionTypes.AUTH_LOGOUT_SUCCESS
    }
}
export const checkAuthStatus = () => {
    return dispatch => {
        const token = localStorage.getItem("token");
        if (!token || Date.now() / 1000 > jwt_decode(token)["exp"]) {
            dispatch(logout());
        } else {
            dispatch(authSuccess(token));
            const expiresAt = jwt_decode(token)["exp"] - new Date().getTime() / 1000;
            dispatch(autoLogout(expiresAt));
        }
    }
}