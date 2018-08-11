import _ from 'lodash';
import { FETCH_ALL_BOOKS } from '../actions';

export default function(state = [], action){

   switch(action.type){

      //모든 사용자들의 책 정보
      /* 
            '데이터베이스로부터 받은 정보'
            [ 
               {no:'', 닉네임:'', 책이름:'', 책이미지명:'', 저자명:'', 발행일: '', 메모: ''},
               {...},
               {...}
            ]

            => (_.groupBy를 사용하여 변환)

            'nickname을 key값으로 책 정보를 변환'
            {
                  nickname A: [
                                 {no:'', 닉네임:'', 책이름:'', 책이미지명:'', 저자명:'', 발행일: '', 메모: ''},
                                 {...},
                                 {...}
                              ],
                  nickname B: [
                                 {no:'', 닉네임:'', 책이름:'', 책이미지명:'', 저자명:'', 발행일: '', 메모: ''},
                                 {...},
                                 {...}
                              ],
                  ...
            }
      */
      case FETCH_ALL_BOOKS:
         return _.groupBy(action.payload.data, data => data.nickname);

      default:
         return state;
   }
} 