import * as actionTypes from '../actions/actionTypes';

const initialState = {
    projects: [],
    isLoading: false,
    pagesCount: 0,
    page: 0,
    projectDetailsLoading: false,
    archivedProjects: [],
    archiveIsLoading: false,
};
const archiveProjectSuccess = (state, id) => {
    const projects = [...state.projects];
    return {
        ...state,
        projects: projects.filter(p => p.id !== id),
        archivedProjects: [...state.archivedProjects, projects.filter(p => p.id === id)],
    };
};
const unarchiveProjectSuccess = (state, id) => {
    const archivedProjects = [...state.archivedProjects];
    return {
        ...state,
        projects: [...state.projects, archivedProjects.filter(p => p.id === id)],
        archivedProjects: archivedProjects.filter(p => p.id !== id),
    };
};
const fetchArchiveStart = state => ({ ...state, archiveIsLoading: true });
const fetchArchiveFailure = state => ({ ...state, archivedProjects: [] });
const fetchArchiveSuccess = (state, payload) => ({
    ...state,
    archiveIsLoading: false,
    archivedProjects: payload.items,
});
const fetchProjectsStart = state => ({ ...state, isLoading: true });
const fetchProjectsSuccess = (state, payload) => ({
    ...state,
    isLoading: false,
    pagesCount: payload.pagesCount,
    page: payload.page,
    projects: payload.items,
    /* [...payload.items].map(item => ({ ...item,
        description: item.description && item.description.replace(/\\\\/g, "\\") })), */
});
const fetchProjectDetailsStart = state => ({ ...state, projectDetailsLoading: true, projects: [] });
const fetchProjectDetailsSuccess = (state, payload) => {
    const { id, items } = payload;
    const project = state.projects.find(p => p.id === id);
    project.items = items;
    const updatedProjects = [...state.projects];
    return { ...state, projectDetailsLoading: false, projects: updatedProjects };
};
const fetchProjectSuccess = (state, payload) => ({
    ...state,
    isLoading: false,
    projects: [{ ...payload, items: [] }],
});
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
        case actionTypes.FETCH_PROJECT_SUCCESS:
            return fetchProjectSuccess(state, action.payload);
        case actionTypes.ARCHIVE_PROJECT_SUCCESS:
            return archiveProjectSuccess(state, action.payload);
        case actionTypes.FETCH_ARCHIVE_SUCCESS:
            return fetchArchiveSuccess(state, action.payload);
        case actionTypes.FETCH_ARCHIVE_FAILURE:
            return fetchArchiveFailure(state);
        case actionTypes.FETCH_ARCHIVE_START:
            return fetchArchiveStart(state);
        case actionTypes.UNARCHIVE_PROJECT_SUCCESS:
            return unarchiveProjectSuccess(state, action.payload);
        default: return state;
    }
    /* eslint-enable */
};
