import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import books from './reducer_books';
import allbooks from './reducer_all_books';

const rootReducer = combineReducers({
  form: formReducer,      //Redux-Form 정보
  books: books,           //특정 사용자의 책 정보
  allbooks: allbooks      //모든 사용자들의 책 정보
});

export default rootReducer;