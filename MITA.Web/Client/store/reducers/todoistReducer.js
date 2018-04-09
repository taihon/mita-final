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
        token: payload,
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
    error: null,
});
const fetchProjectsSuccess = (state, projects) => (
    { ...state, projects, projectsLoading: false }
);
const fetchProjectsFailure = (state, error) => (
    {
        ...state,
        projectsLoading: false,
        error,
    }
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
        case actionTypes.TODOIST_PROJECTS_FETCH_FAILURE:
            return fetchProjectsFailure(state, action.payload);
        default:
            return state;
        /* eslint-enable indent */
    }
};
