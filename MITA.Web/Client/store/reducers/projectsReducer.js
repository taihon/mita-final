import * as actionTypes from '../actions/actionTypes';

const initialState = {
    projects: [],
    isLoading: false,
    pagesCount: 0,
    page: 0,
    projectDetailsLoading: false,
};
const fetchProjectsStart = state => ({ ...state, isLoading: true });
const fetchProjectsSuccess = (state, payload) => ({
    ...state,
    isLoading: false,
    pagesCount: payload.pagesCount,
    page: payload.page,
    projects: payload.items,
});
const fetchProjectDetailsStart = state => ({ ...state, projectDetailsLoading: true });
const fetchProjectDetailsSuccess = (state, payload) => {
    const pay = payload;
    return { ...state, projectDetailsLoading: false };
};
const fetchProjectDetailsFailure = state => ({ ...state, projectDetailsLoading: false });
const fetchProjectsError = state => ({ ...state, isLoading: false });
export const projectsReducer = (state = initialState, action) => {
    /* eslint-disable indent */
    switch (action.type) {
        case actionTypes.FETCH_PROJECTS_START: return fetchProjectsStart(state);
        case actionTypes.FETCH_PROJECTS_SUCCESS: return fetchProjectsSuccess(state, action.payload);
        case actionTypes.FETCH_PROJECTS_FAILURE: return fetchProjectsError(state);
        case actionTypes.FETCH_PROJECT_DETAILS_START: return fetchProjectDetailsStart(state);
        case actionTypes.FETCH_PROJECT_DETAILS_SUCCESS:
            return fetchProjectDetailsSuccess(state, action.payload);
        case actionTypes.FETCH_PROJECT_DETAILS_FAILURE:
            return fetchProjectDetailsFailure(state, action.payload);
        default: return state;
    }
    /* eslint-enable */
};
