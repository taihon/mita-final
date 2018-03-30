import axios from 'axios';
import jwt_decode from 'jwt-decode';
import * as actionTypes from './actionTypes';

export const login = (email, password) => {
    return dispatch => {
        return axios.post("/api/account/login",
            { email: email, password: password })
            .then(data => {
                const tokenData = jwt_decode(data.data.token);
                console.log(tokenData);
                console.log(tokenData["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"]);
                dispatch(
                    {
                        type: actionTypes.AUTH_LOGIN_SUCCESS,
                        payload: {
                            email: tokenData["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
                            token: data.data.token
                        }
                    });
            })
            .catch(error => console.log(error));
    }
}
export const logout = () => {
    return dispatch => {
        //here we'll go to api and logout user?
    }
}