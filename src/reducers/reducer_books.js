
import { FETCH_BOOKS } from '../actions';

export default function(state = [], action){

   switch(action.type){
      case FETCH_BOOKS:
         console.log(action.payload.data);
         return action.payload.data;

      default:
         return state;
   }

} 