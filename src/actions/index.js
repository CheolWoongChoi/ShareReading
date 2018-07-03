import axios from 'axios';

export const FETCH_BOOKS = 'FETCH_BOOKS';
export const FETCH_ALL_BOOKS = 'FETCH_ALL_BOOKS';

export function fetchBooks(){
   
   const request = axios.get('/api/mypage/books');
   
   return {
      type: FETCH_BOOKS,
      payload: request
   }
}

export function fetchAllBooks(){
   
   const request = axios.get('/api/home/allbooks');
   
   return {
      type: FETCH_ALL_BOOKS,
      payload: request
   }
}