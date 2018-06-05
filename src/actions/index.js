import axios from 'axios';

export const GET_NICKNAME = 'GET_NICKNAME';

export function getNickname(){
   
   const request = axios.get('/home/users');
      
   return {
      type: GET_NICKNAME,
      payload: request
   }
}