import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//import { connect } from 'react-redux';

class MyPage extends Component {

   constructor(props){
      super(props);
      this.state = {};
   }

   clickLogOut(){
      axios.get('/auth/logout');
   }

   renderBook(){
      return(
         <div className="mypage-book text-center">
            <div className="mypage-top-right">
               <Link to="#" className="mypage-btn btn btn-primary">수정</Link>
               <Link to="#" className="mypage-btn btn btn-danger">삭제</Link>
             </div>
            <div>
               <div>
                  <img src={require("../images/login_welcome.jpg")} 
                     width="300px"
                     height="300px" 
                     alt="welcome" 
                  />
               </div>
               <div>책명 : </div>
               <div>저자 : </div>
               <div>발행일 : </div>
               <div>Memo : </div>
            </div>
         </div>
      )
   }

   render(){
      return(
         <div className="mypage-top">
            {/* 맨 윗줄 - 회원관리정보 */}
            <div>
               <span>
                  <Link to="#" className="mypage-btn btn btn-primary">추가</Link>
               </span>
               <span className="mypage-top-right">
                  <Link to="/home" className="mypage-btn btn btn-primary">홈 화면</Link>
                  <Link to="/" className="mypage-btn btn btn-danger" onClick={this.clickLogOut}>로그아웃</Link>
               </span>
            </div>

            {/* 회원의 책 정보들 */}
            <div> 
               {this.renderBook()}     
            </div>
         </div>
      );
   }
}

export default MyPage;

// function mapStateToProps(state) {
//       return { nicknames: state.nicknames }
// }

// export default connect(mapStateToProps, { getNickname })(Home);
