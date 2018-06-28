
import { GET_IMAGES } from '../actions';

export default function(state = [], action){

   switch(action.type){
      case GET_IMAGES:
         console.log('GET_IMAGES');
         console.log(action.payload.data);
         return action.payload.data;

      default:
         return state;
   }

} 