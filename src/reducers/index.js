import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import nicknames from './reducer_nickname';
import books from './reducer_books';

const rootReducer = combineReducers({
  form: formReducer,
  nicknames: nicknames,
  books: books 
});

export default rootReducer;