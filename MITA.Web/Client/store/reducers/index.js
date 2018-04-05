import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { projectsReducer } from './projectsReducer';
import { todoistReducer } from './todoistReducer';

export default combineReducers({
    auth: authReducer,
    projects: projectsReducer,
    todoist: todoistReducer,
});
if (module.hot) {
    module.hot.accept();
}
