import axios from 'axios';

import * as actionTypes from './actionTypes';

export const requestProjects = apiToken => (dispatch, getState) => {
    dispatch({ type: actionTypes.FETCH_PROJECTS_START });
    // because of way react renders components
    const token = localStorage.getItem("token");
    console.log(`token: ${token}`);
    axios.get("/api/projects", {
        headers: { Authorization: `Bearer ${token}` },
    })
        .then(response =>
            dispatch({ type: actionTypes.FETCH_PROJECTS_SUCCESS, payload: { ...response.data } }))
        .catch(error => dispatch({ type: actionTypes.FETCH_PROJECTS_FAILURE }));
};
export const createProject = (title, description, token) => (dispatch) => {
    dispatch({ type: actionTypes.CREATE_PROJECT_START });
    axios
        .post("/api/projects", { title, description }, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => console.log(response))
        .catch(error => console.log(error));
};
export const importProject = (project, token) => (dispatch) => {
    dispatch({ type: "IMPORT_PROJECT_START" });
    console.log(project);
    axios
        .post("/api/projects/import", project, { headers: { Authorization: `Bearer ${token}` } })
        .then(response => console.log(response.data))
        .catch(error => console.log(error));
};
const projectDetails = (id, data) => ({
    type: actionTypes.FETCH_PROJECT_DETAILS_SUCCESS,
    payload: { id, items: data.items },
});
export const fetchProjectDetails = (projectId, token) => (dispatch) => {
    dispatch({ type: actionTypes.FETCH_PROJECT_DETAILS_START });
    const config = { headers: { Authorization: `Bearer ${token}` } };
    axios
        .get(`/api/projects/${projectId}/tasks`, config)
        .then(response => dispatch(projectDetails(projectId, response.data)))
        .catch(error => console.log(error));
};
export const addTaskToProject = (projectId, data, token) => (dispatch) => {
    dispatch({ type: actionTypes.ADD_TASK_START });
    const config = { headers: { Authorization: `Bearer ${token}` } };
    axios
        .post(`/api/projects/${projectId}/tasks`, data, config)
        .then(response => console.log(response))
        .catch(error => console.log(error));
    dispatch({ type: actionTypes.ADD_TASK_SUCCESS, payload: { projectId, data } });
};
