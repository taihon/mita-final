import axios from 'axios';

import * as actionTypes from './actionTypes';
import providerConfig from '../extProviderConfig';

const postTodoistData = (url, data) => {
    const serialized = Object.keys(data)
        .map(item => `${item}=${encodeURIComponent(data[item])}`)
        .join("&");
    return axios.post(url, serialized, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });
};
export const todoistAuth = () => (dispatch) => {
    dispatch({ type: actionTypes.TODOIST_AUTH_START });
    const { clientId } = providerConfig.todoist;
    const endpoint = "https://todoist.com/oauth/authorize?";
    const url = `${endpoint}client_id=${clientId}&scope=data:read&state=asrweqq5q`;

    window.location.href = url;
};
export const todoistRequestProjects = token => (dispatch) => {
    dispatch({ type: actionTypes.TODOIST_PROJECTS_FETCH_START });
    postTodoistData("https://todoist.com/api/v7/sync", { token, sync_token: "*", resource_types: '["projects"]' })
        .then(response => dispatch({
            type: actionTypes.TODOIST_PROJECTS_FETCH_SUCCESS,
            payload: response.data.projects,
        }))
        .catch(error => dispatch({
            type: actionTypes.TODOIST_PROJECTS_FETCH_FAILURE,
            payload: error,
        }));
};
const todoistRequestAccessToken = (code, token) => (dispatch) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    };
    axios
        .post("/api/todoist/gettoken", { code }, config)
        .then((response) => {
            dispatch({
                type: actionTypes.TODOIST_AUTH_SUCCESS,
                payload: response.data.accessToken,
            });
            dispatch(todoistRequestProjects(response.data.accessToken));
        })
        .catch(error => console.log(error));
};
export const todoistAuthComplete = (result, token) => (dispatch) => {
    if (result.indexOf("code") > -1) {
        const code = result.split("&")
            .filter(t => t.indexOf("code") > -1)[0]
            .split("=")[1];
        dispatch(todoistRequestAccessToken(code, token));
    }
};
const buildTree = (data, parent) => {
    const result = [];
    let pId = parent;
    if (!parent) { pId = null; }
    /* eslint-disable camelcase */
    const except = data.filter(item => item.parent_id !== pId);
    data
        .filter(item => item.parent_id === pId)
        .forEach(({ id, content, parent_id, due_date_utc }) => {
            result.push({
                id,
                title: content,
                parentId: parent_id,
                childs: [...buildTree(except, id)],
                dueDate: due_date_utc,
            });
        });
    /* eslint-enable */
    return result;
};
export const todoistRequestProjectDetails = (id, token) => (dispatch) => {
    dispatch({ type: actionTypes.TODOIST_FETCH_PROJECT_DETAILS_START });
    postTodoistData("https://todoist.com/api/v7/projects/get_data", { token, project_id: id })
        .then((response) => {
            dispatch({
                type: actionTypes.TODOIST_FETCH_PROJECT_DETAILS_SUCCESS,
                payload: {
                    id, title: response.data.project.name, items: buildTree(response.data.items),
                },
            });
        })
        .catch(error => console.log(error));
};
