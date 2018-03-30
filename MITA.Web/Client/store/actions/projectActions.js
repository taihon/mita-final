import axios from 'axios';

import * as actionTypes from './actionTypes';
export const requestProjects = () => {
    return dispatch => {
        dispatch({ type: actionTypes.FETCH_PROJECTS_START });
        axios.get("/api/projects", {
            headers: { "Authorization": "Bearer " + localStorage.getItem("token") }
        })
            .then(data => console.log(data));
    }
}