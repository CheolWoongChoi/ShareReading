import _ from 'lodash';
import { FETCH_ALL_BOOKS } from '../actions';

export default function(state = [], action){

   switch(action.type){
      case FETCH_ALL_BOOKS:
         return _.groupBy(action.payload.data, data => data.nickname);

      default:
         return state;
   }
} 