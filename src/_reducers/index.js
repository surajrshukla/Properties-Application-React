import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { register } from './register.reducer';
import { login } from './login.reducer';
import { property } from './property.reducer';


const rootReducer = combineReducers({
    register,
    login, property,
    form: formReducer
});

export default rootReducer;