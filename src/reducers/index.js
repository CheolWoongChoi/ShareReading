import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import books from './reducer_books';
import allbooks from './reducer_all_books';

const rootReducer = combineReducers({
  form: formReducer,
  books: books,
  allbooks: allbooks
});

export default rootReducer;