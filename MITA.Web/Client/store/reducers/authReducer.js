import * as actionTypes from '../actions/actionTypes'

const initialState = {
    token: null,
    user: null
}
const authSuccess = (state, payload) => {
    return { ...state, user: payload.email, token: payload.token }
}
const authFailure = (state) => {
    return {
        ...state, user: null, token: null
    }
}
const authLogoutFailure = state => {
    return state;
}
const authLogoutSuccess = state => {
    return { ...state, user: null, token: null }
}
export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_LOGIN_START: return state;
        case actionTypes.AUTH_LOGIN_SUCCESS: return authSuccess(state, action.payload);
        case actionTypes.AUTH_LOGIN_FAILURE: return authFailure(state);
        case actionTypes.AUTH_LOGOUT_SUCCESS: return authLogoutSuccess(state);
        case actionTypes.AUTH_LOGOUT_FAILURE: return authLogoutFailure(state);
        default: return state;
    }
}