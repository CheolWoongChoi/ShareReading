
import { GET_NICKNAME } from '../actions';

export default function(state = [], action){

   switch(action.type){
      case GET_NICKNAME:
         return action.payload.data;

      default:
         return state;
   }

} 