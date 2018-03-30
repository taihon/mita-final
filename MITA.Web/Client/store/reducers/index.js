import { combineReducers } from 'redux';
import { authReducer } from './authReducer';

export default combineReducers({
    auth: authReducer
});
if (module.hot) {
    module.hot.accept();
}