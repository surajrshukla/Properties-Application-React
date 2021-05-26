import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { register } from './register.reducer';
import { login } from './login.reducer';

const rootReducer = combineReducers({
    register,
    login,
    form: formReducer
});

export default rootReducer;