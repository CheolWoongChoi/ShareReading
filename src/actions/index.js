import axios from 'axios';

export const FETCH_BOOKS = 'FETCH_BOOKS';
export const FETCH_ALL_BOOKS = 'FETCH_ALL_BOOKS';

//서버에서 특정 사용자의 마이페이지에 보여줄 책 정보를 가져옴
export function fetchBooks(){
   
   const request = axios.get('/api/mypage/books');
   
   return {
      type: FETCH_BOOKS,
      payload: request
   }
}

//서버에서 사용자들의 모든 책 정보를 가져옴
export function fetchAllBooks(){
   
   const request = axios.get('/api/home/allbooks');
   
   return {
      type: FETCH_ALL_BOOKS,
      payload: request
   }
}