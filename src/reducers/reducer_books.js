
import { FETCH_BOOKS } from '../actions';

export default function(state = [], action){

   switch(action.type){
      
      //특정 사용자의 책 정보
      case FETCH_BOOKS:
         return action.payload.data;

      default:
         return state;
   }
} 