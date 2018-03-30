import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { projectsReducer } from './projectsReducer';

export default combineReducers({
    auth: authReducer,
    projects: projectsReducer
});
if (module.hot) {
    module.hot.accept();
}