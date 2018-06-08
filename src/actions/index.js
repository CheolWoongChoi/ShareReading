import axios from 'axios';

export const GET_NICKNAME = 'GET_NICKNAME';
export const FETCH_BOOKS = 'FETCH_BOOKS';

export function getNickname(){
   
   const request = axios.get('/home/users');
      
   return {
      type: GET_NICKNAME,
      payload: request
   }
}

export function fetchBooks(){
   
   const request = axios.get('/mypage/books');
   
   return {
      type: FETCH_BOOKS,
      payload: request
   }
}