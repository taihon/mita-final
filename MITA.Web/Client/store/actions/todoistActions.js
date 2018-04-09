import axios from 'axios';

import * as actionTypes from './actionTypes';
import providerConfig from '../extProviderConfig';

export const todoistAuth = () => (dispatch) => {
    dispatch({ type: actionTypes.TODOIST_AUTH_START });
    const { clientId } = providerConfig.todoist;
    const endpoint = "https://todoist.com/oauth/authorize?";
    const url = `${endpoint}client_id=${clientId}&scope=data:read&state=asrweqq5q`;

    window.location.href = url;
};
export const todoistAuthComplete = result => (dispatch) => {
    if (result.indexOf("code") > -1) {
        const token = result.split("&")
            .filter(t => t.indexOf("code") > -1)[0]
            .split("=")[1];
        dispatch({ type: actionTypes.TODOIST_AUTH_SUCCESS, payload: token });
    }
};
export const todoistRequestProjects = token => (dispatch) => {
    dispatch({ type: actionTypes.TODOIST_PROJECTS_FETCH_START });
    const api = axios.create();
    const data = `token=${token}&sync_token=${encodeURIComponent("*")}\
        &resource_types=${encodeURIComponent('["projects"]')}`;
    api.post("https://todoist.com/api/v7/sync", data, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    })
        .then(response => dispatch({
            type: actionTypes.TODOIST_PROJECTS_FETCH_SUCCESS,
            payload: response.data.projects,
        }))
        .catch(error => dispatch({
            type: actionTypes.TODOIST_PROJECTS_FETCH_FAILURE,
            payload: error,
        }));
};
