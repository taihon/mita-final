import axios from 'axios';
import jwt_decode from 'jwt-decode';
import * as actionTypes from './actionTypes';

export const login = (email, password) => {
    return dispatch => {
        dispatch({ type: actionTypes.AUTH_LOGIN_START });
        return axios.post("/api/account/login",
            { email: email, password: password })
            .then(data => {
                const tokenData = jwt_decode(data.data.token);
                const payload = {
                    email: tokenData["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
                    token: data.data.token
                }
                dispatch(
                    {
                        type: actionTypes.AUTH_LOGIN_SUCCESS,
                        payload: payload
                    });
                localStorage.setItem("token", payload.token);
            })
            .catch(error => console.log(error));
    }
}
export const logout = () => {
    return dispatch => {
        localStorage.removeItem("token");
    }
}