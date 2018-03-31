import * as actionTypes from '../actions/actionTypes';

const initialState = {
    projects: [],
    isLoading: false,
    pagesCount: 0,
    page: 0,
}
const fetchProjectsStart = state => {
    return { ...state, isLoading: true }
}
const fetchProjectsSuccess = (state, payload) => {
    return { ...state, isLoading: false, pagesCount: payload.pagesCount, page: payload.page, projects: payload.items }
}
const fetchProjectsError = state => {
    return { ...state, isLoading: false }
}
export const projectsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PROJECTS_START: return fetchProjectsStart(state);
        case actionTypes.FETCH_PROJECTS_SUCCESS: return fetchProjectsSuccess(state, action.payload);
        case actionTypes.FETCH_PROJECTS_FAILURE: return fetchProjectsError(state);
        default: return state;
    }
}