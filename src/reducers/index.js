import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import nicknames from './reducer_nickname';
import books from './reducer_books';
import images from './reducer_images';
import allbooks from './reducer_all_books';

const rootReducer = combineReducers({
  form: formReducer,
  nicknames: nicknames,
  books: books,
  images: images,
  allbooks: allbooks
});

export default rootReducer;