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
            dispatch({
                type: actionTypes.FETCH_PROJECTS_SUCCESS,
                payload: { ...response.data },
            }))
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
const replaceReturns = (data) => {
    const o = {};
    const keys = Object.keys(data);
    for (let i = 0; i < keys.length; i += 1) {
        o[keys[i]] = data[keys[i]] instanceof String ? data[keys[i]].replace('\\n', '\n') : data[keys[i]];
    }
    return o;
};
const fetchSingleProject = data => ({
    type: actionTypes.FETCH_PROJECT_SUCCESS,
    payload: replaceReturns(data),
});
export const fetchProjectDetails = (projectId, token) => (dispatch) => {
    dispatch({ type: actionTypes.FETCH_PROJECT_DETAILS_START });
    const config = { headers: { Authorization: `Bearer ${token}` } };
    axios
        .get(`/api/projects/${projectId}`, config)
        .then((response) => {
            dispatch(fetchSingleProject(response.data));
            axios
                .get(`/api/projects/${projectId}/tasks`, config)
                .then(res => dispatch(projectDetails(projectId, res.data)));
        })
        .catch(error => console.log(error));
};
export const addTaskToProject = (projectId, data, token) => (dispatch) => {
    dispatch({ type: actionTypes.ADD_TASK_START });
    console.log('====================================');
    console.log(data);
    console.log('====================================');
    const config = { headers: { Authorization: `Bearer ${token}` } };
    axios
        .post(`/api/projects/${projectId}/tasks`, data, config)
        .then(response => console.log(response))
        .catch(error => console.log(error));
    dispatch({ type: actionTypes.ADD_TASK_SUCCESS, payload: { projectId, data } });
};
export const saveTask = (data, token) => (dispatch) => {
    dispatch({ type: actionTypes.SAVE_TASK_START });
    const config = { headers: { Authorization: `Bearer ${token}` } };
    axios
        .put(`/api/projects/${data.projectId}/tasks/${data.id}`, data, config)
        .then(response => console.log(response))
        .catch(e => console.log(e));
    dispatch({ type: actionTypes.SAVE_TASK_SUCCESS });
};
export const deleteTask = (taskId, projectId, token) => (dispatch) => {
    dispatch({ type: actionTypes.DELETE_TASK_START });
    const config = { headers: { Authorization: `Bearer ${token}` } };
    axios
        .delete(`/api/projects/${projectId}/tasks/${taskId}`, config)
        .then(response => console.log(response))
        .catch(e => console.log(e));
    dispatch(fetchProjectDetails(projectId, token));
};
export const saveProject = (data, token) => (dispatch) => {
    dispatch({ type: actionTypes.SAVE_PROJECT_START });
    const config = { headers: { Authorization: `Bearer ${token}` } };
    axios
        .put(`/api/projects/${data.id}`, data, config)
        .then(response => console.log(response))
        .catch(e => console.log(e));
    dispatch({ type: actionTypes.SAVE_PROJECT_SUCCESS });
};
export const archiveProject = (id, token) => (dispatch) => {
    dispatch({ type: actionTypes.ARCHIVE_PROJECT_START });
    const config = { headers: { Authorization: `Bearer ${token}` } };
    axios
        .post(`/api/projects/${id}/archive`, { projectId: id, confirm: true }, config)
        .then(response => console.log(response))
        .catch(e => console.log(e));
    dispatch({ type: actionTypes.ARCHIVE_PROJECT_SUCCESS, payload: id });
};
export const requestArchivedProjects = token => (dispatch) => {
    dispatch({ type: actionTypes.FETCH_ARCHIVE_START });
    // because of way react renders components
    axios.get("/api/projects?archived=true", {
        headers: { Authorization: `Bearer ${token}` },
    })
        .then(response =>
            dispatch({
                type: actionTypes.FETCH_ARCHIVE_SUCCESS,
                payload: { ...response.data },
            }))
        .catch(error => dispatch({ type: actionTypes.FETCH_ARCHIVE_FAILURE }));
};
export const unarchiveProject = (id, token) => (dispatch) => {
    dispatch({ type: actionTypes.UNARCHIVE_PROJECT_START });
    const config = { headers: { Authorization: `Bearer ${token}` } };
    axios
        .post(`/api/projects/${id}/restore`, { projectId: id, confirm: true }, config)
        .then(() => dispatch({ type: actionTypes.UNARCHIVE_PROJECT_SUCCESS, payload: id }))
        .catch(() => dispatch({ type: actionTypes.UNARCHIVE_PROJECT_FAILURE }));
};
