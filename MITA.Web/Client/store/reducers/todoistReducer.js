import * as actionTypes from '../actions/actionTypes';

const initialState = {
    projects: [],
    token: null,
    error: null,
    projectsLoading: false,
};
const authSuccess = (state, payload) => (
    {
        ...state,
        token: payload.token,
    });
const authFail = (state, payload) => (
    {
        ...state,
        error: payload.error,
    }
);
const fetchProjectsStart = state => ({
    ...state,
    projectsLoading: true,
});
const fetchProjectsSuccess = (state, projects) => (
    { ...state, projects }
);
export const todoistReducer = (state = initialState, action) => {
    /* eslint-disable indent */
    switch (action.type) {
        case actionTypes.TODOIST_AUTH_START:
            return state;
        case actionTypes.TODOIST_AUTH_SUCCESS:
            return authSuccess(state, action.payload);
        case actionTypes.TODOIST_AUTH_FAILURE:
            return authFail(state, action.payload);
        case actionTypes.TODOIST_PROJECTS_FETCH_START:
            return fetchProjectsStart(state);
        case actionTypes.TODOIST_PROJECTS_FETCH_SUCCESS:
            return fetchProjectsSuccess(state, action.payload);
        default:
            return state;
        /* eslint-enable indent */
    }
};
