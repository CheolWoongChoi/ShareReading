import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import nicknames from './reducer_nickname';

const rootReducer = combineReducers({
  form: formReducer,
  nicknames: nicknames 
});

export default rootReducer;