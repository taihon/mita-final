import axios from 'axios';
import jwtDecode from 'jwt-decode';
import * as actionTypes from './actionTypes';

const authSuccess = (token) => {
    const tokenData = jwtDecode(token);
    const userinfo = {
        email: tokenData["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
        token,
    };
    return {
        type: actionTypes.AUTH_LOGIN_SUCCESS,
        payload: userinfo,
    };
};
export const login = (email, password) => (dispatch) => {
    dispatch({ type: actionTypes.AUTH_LOGIN_START });
    axios
        .post("/api/account/login", { email, password })
        .then((data) => {
            localStorage.setItem("token", data.data.token);
            dispatch(authSuccess(data.data.token));
        })
        .catch(error => console.log(error));
};
export const logout = () => {
    localStorage.removeItem("token");
    return {
        type: actionTypes.AUTH_LOGOUT_SUCCESS,
    };
};
const autoLogout = at => dispatch =>
    setTimeout(() => {
        dispatch(logout());
    }, at * 1000);
export const checkAuthStatus = () => (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token || Date.now() / 1000 > jwtDecode(token).exp) {
        dispatch(logout());
    } else {
        dispatch(authSuccess(token));
        const expiresAt = jwtDecode(token).exp - (new Date().getTime() / 1000);
        dispatch(autoLogout(expiresAt));
    }
};
export const register = data => (dispatch) => {
    dispatch({ type: actionTypes.REGISTER_START });
    console.log(data);
    axios
        .post(`/api/account/register`, data)
        .then((response) => {
            dispatch({ type: actionTypes.REGISTER_SUCCESS });
            localStorage.setItem("token", response.data.token);
            dispatch(authSuccess(response.data.token));
        })
        .catch(e => dispatch({
            type: actionTypes.REGISTER_FAILURE,
            payload: e.response && e.response.data ? e.response.data : e,
        }));
};
export const externalRegister = data => (dispatch) => {
    dispatch({ type: actionTypes.REGISTER_START });
    axios
        .post(`/api/account/extregister`, data)
        .then((response) => {
            dispatch({ type: actionTypes.REGISTER_SUCCESS });
            localStorage.setItem("token", response.data.token);
            dispatch(authSuccess(response.data.token));
        })
        .catch(e => dispatch({
            type: actionTypes.REGISTER_FAILURE,
            payload: e.response && e.response.data ? e.response.data : e,
        }));
};
