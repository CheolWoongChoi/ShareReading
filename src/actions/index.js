import axios from 'axios';

export const GET_NICKNAME = 'GET_NICKNAME';
export const GET_IMAGES = 'GET_IMAGES';
export const FETCH_BOOKS = 'FETCH_BOOKS';
export const FETCH_ALL_BOOKS = 'FETCH_ALL_BOOKS';

export function getNickname(){
   
   const request = axios.get('/home/users');
      
   return {
      type: GET_NICKNAME,
      payload: request
   }
}

export function getImages(nickname){
   
   const request = axios.get(`/home/images?nickname=${nickname}`);
      
   return {
      type: GET_IMAGES,
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

export function fetchAllBooks(){
   
   const request = axios.get('/home/allbooks');
   
   return {
      type: FETCH_ALL_BOOKS,
      payload: request
   }
}