import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Modal from './modal';

//import { connect } from 'react-redux';

class MyPage extends Component {

   constructor(props){
      super(props);
      this.state = { 
        isAdd: false,
        isModify: false 
      };
   }

   clickLogOut(){
      axios.get('/auth/logout');
   }

   bookAddModal = () => {
      this.setState({
        isAdd: !this.state.isAdd
      });
   }
 
   bookModifyModal = () => {
      this.setState({
        isModify: !this.state.isModify
      });
   }

   renderBookAdd(){
      return(
          <form action="/mypage/add" method="post" encType="multipart/form-data">
              <input type="file" 
                     className="form-control" 
                     accept=".jpg, .jpeg, .png"
                     name="bookImage"
              />
              <div className="mypage-text">
                  <label className="">책명</label>
                  <div className="">
                    <input className="form-control" type="text" />
                  </div>
              </div>
              <div className="mypage-text">
                  <label className="">저자</label>
                  <div className="">
                    <input className="form-control" type="text" />
                  </div>
              </div>
              <div className="mypage-text">
                  <label className="">발행일</label>
                  <div className="">
                    <input className="form-control" type="text" />
                  </div>
              </div>
              <div className="mypage-text">
                  <label className="">MEMO</label>
                  <div className="">
                    <textarea className="form-control" type="text" />
                  </div>
              </div>
              <div className="text-center">
                <input className="btn btn-primary" type="submit" value="적용"/>
              </div>
          </form>
      );
   }

   renderBookModify(){
    return(
        <form enctype="multipart/form-data">
            <input type="file" 
                   className="form-control" 
                   accept=".jpg, .jpeg, .png"
                   name="bookImage"
            />
            <div className="mypage-text">
                <label className="">책명</label>
                <div className="">
                  <input className="form-control" type="text" />
                </div>
            </div>
            <div className="mypage-text">
                <label className="">저자</label>
                <div className="">
                  <input className="form-control" type="text" />
                </div>
            </div>
            <div className="mypage-text">
                <label className="">발행일</label>
                <div className="">
                  <input className="form-control" type="text" />
                </div>
            </div>
            <div className="mypage-text">
                <label className="">MEMO</label>
                <div className="">
                  <textarea className="form-control" type="text" />
                </div>
            </div>
            <div className="text-center">
              <input className="btn btn-primary" type="submit" value="적용"/>
            </div>
        </form>
      );
  }

   renderBook(){
      return(
         <div className="mypage-book">
            <div className="mypage-book-top text-right">
               <button className="mypage-btn btn btn-primary" onClick={this.bookModifyModal}>수정</button>
               <button className="mypage-btn btn btn-danger">삭제</button>
             </div>
            <div className="mypage-book-content">
               <div>
                  <img src={require("../images/login_welcome.jpg")} 
                     width="300px"
                     height="300px" 
                     alt="welcome" 
                  />
               </div>
               <div className="mypage-text">
                  <label className="">책명</label>
                  <div className="">
                    <p>BOOK 1</p>
                  </div>
               </div>
               <div className="mypage-text">
                  <label className="">저자</label>
                  <div className="">
                    <p>ABC</p>
                  </div>
               </div>
               <div className="mypage-text">
                  <label className="">발행일</label>
                  <div className="">
                    <p>2018-06-06</p>
                  </div>
               </div>
               <div className="mypage-text">
                  <label className="">MEMO</label>
                  <div className="">
                    <p>BOOK1 IS ...</p>
                  </div>
               </div>
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
                  <button className="mypage-btn btn btn-primary" onClick={this.bookAddModal} >추가</button>
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

            {/* 책 추가 */}
            <div>
                <Modal show={this.state.isAdd}
                    onClose={this.bookAddModal}>
                    책 추가 모달
                    {this.renderBookAdd()}
                </Modal>
            </div>

             {/* 책 수정 */}
             <div>
                <Modal show={this.state.isModify}
                    onClose={this.bookModifyModal}>
                    책 수정 모달
                    {this.renderBookModify()}
                </Modal>
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
