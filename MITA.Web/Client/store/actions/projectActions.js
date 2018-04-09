import axios from 'axios';

import * as actionTypes from './actionTypes';

export const requestProjects = () => {
    return dispatch => {
        dispatch({ type: actionTypes.FETCH_PROJECTS_START });
        axios.get("/api/projects", {
            headers: { "Authorization": "Bearer " + localStorage.getItem("token") }
        })
            .then(response => {
                dispatch({ type: actionTypes.FETCH_PROJECTS_SUCCESS, payload: { ...response.data } })
            })
            .catch(error => dispatch({ type: actionTypes.FETCH_PROJECTS_FAILURE }));
    }
}
export const createProject = (title, description) => {
    return dispatch => {
        dispatch({ type: actionTypes.CREATE_PROJECT_START });
        axios
            .post("/api/projects", { title: title, description: description }, {
                headers: { "Authorization": "Bearer " + localStorage.getItem("token") }
            })
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }
}