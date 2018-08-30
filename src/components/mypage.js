
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchBooks } from '../actions';
import axios from 'axios';

import Modal from './modal';


class MyPage extends Component {

   constructor(props){

      super(props);
      this.state = {
        nickname: '',           //사용자의 닉네임

        isAdd: false,           //책 추가 모달(Modal) On/Off 상태
        isModify: false,        //책 수정 모달 On/Off 상태

        //책 정보
        bookName: '',
        author: '',
        pubDate: '',
        memo: '' 
      };

      this.bookAddModal = this.bookAddModal.bind(this);
      this.bookModifyModal = this.bookModifyModal.bind(this);
      this.bookDelete = this.bookDelete.bind(this);
      this.addSubmit = this.addSubmit.bind(this);
      this.modifySubmit = this.modifySubmit.bind(this);
      this.clickLogOut = this.clickLogOut.bind(this);

   }

   //세션 유무를 검사하여 로그인 확인
   componentDidMount(){
        axios.get('/api/sessionInfo')
                .then( (res) => {

                    if(res.data)
                        this.setState({nickname: res.data.nickname});
                    else{
                            window.alert('로그인이 필요합니다!');
                            this.props.history.push('/');
                    }
        });

        this.props.fetchBooks();
   }

   //로그아웃 처리
   clickLogOut(){
      axios.get('/api/auth/logout')
        .then( (res) => {
            this.props.history.push('/');
        });
   }

   //책 추가 모달에서 Form 정보를 서버로 전송하여 책 정보를 추가
   addSubmit(event){
      event.preventDefault();
      
      if(window.confirm('추가하시겠습니까?')){
        let addForm = document.getElementById('addForm');
        let addData = new FormData(addForm);


        /* 브라우저별 FormData 처리 */
        //IE
        if(navigator.userAgent.toLowerCase().indexOf('trident')>-1){
            window.alert('인터넷 익스플로러에서 사용 불가능 합니다! 구글 크롬(Chrome)을 이용해주세요!');
        }
        //Chrome
        else {
            for(let value of addData.values()){
                if(value.size === 0 || value.length === 0){
                    window.alert('모든 데이터를 입력하셔야 합니다!');
                    return;
                }
            }
        }

        axios.post('/api/mypage/add', addData)
            .then( (res) => {
                if(res.data){
                    window.alert('성공적으로 책이 추가되었습니다!');
                    window.location.reload();
                } else{
                    window.alert('일시적인 오류로 다시 시도해주세요.');
                }
            });
      }
   }

   //책 수정 모달에서 Form 정보를 서버로 전송하여 책 정보를 수정
   modifySubmit(event){
     event.preventDefault();

     if(window.confirm('수정하시겠습니까?')){
        let modifyForm = document.getElementById('modifyForm');
        let modifyData = new FormData(modifyForm);
        
        /* 브라우저별 FormData 처리 */
        //IE
        if(navigator.userAgent.toLowerCase().indexOf('trident')>-1){
            window.alert('인터넷 익스플로러에서 사용 불가능 합니다! 구글 크롬(Chrome)을 이용해주세요!');
        }
        //Chrome
        else {
            for(let value of modifyData.values()){
                if(value.size === 0 || value.length === 0){
                    window.alert('모든 데이터를 입력하셔야 합니다!');
                    return;
                }
            }
        }

        axios.post('/api/mypage/modify', modifyData)
            .then( (res) => {
                if(res.data){
                    window.alert('성공적으로 책이 수정되었습니다!');
                    window.location.reload();
                } else{
                    window.alert('일시적인 오류로 다시 시도해주세요.');
                }
            });
     }
   }

   //책 추가 모달을 화면에 띄우기 위한 함수 - state값을 바꿔 주고, 화면 스크롤을 고정시킴
   bookAddModal(){
      this.setState({
        isAdd: !this.state.isAdd
      });

      document.querySelector('body').style.overflow = 'auto';
      //document.querySelector('body').style.paddingRight = '0';
   }
 
   //책 수정 모달을 화면에 띄우기 위한 함수 - state값을 바꿔 주고, 화면 스크롤을 고정시킴
   bookModifyModal(book){
      this.setState({
        isModify: !this.state.isModify,
        no: book.no,
        bookName: book.bookName,
        author: book.author,
        pubDate: book.pubDate,
        memo: book.memo
      });

      document.querySelector('body').style.overflow = 'auto';
      //document.querySelector('body').style.paddingRight = '0';
   }

   //책 정보를 삭제 - 서버에 책 정보 삭제를 요청
   bookDelete(bookImage){
       if(window.confirm('삭제하시겠습니까?')){
           axios.delete(`/api/mypage/delete?bookImage=${bookImage}`)
            .then( (res) => {
                if(res.data){
                    window.alert('성공적으로 책이 삭제되었습니다!');
                    window.location.reload();
                } else{
                    window.alert('일시적인 오류로 다시 시도해주세요.');
                }
            });
       }
   }

   //책 정보 UI
   renderBook(book){
      return(
        <div key={book.bookImage} className="mypage-book"> 
            <div className="mypage-book-top text-right">
                <button className="mypage-btn btn btn-primary" 
                    onClick={() => this.bookModifyModal(book)}
                >정보 수정하기</button>
                <button className="mypage-btn btn btn-danger" 
                    onClick={() => this.bookDelete(book.bookImage)} 
                >삭제하기</button>
            </div>
            <div>
                <div className="mypage-book-image-frame">
                    <img src={`/uploads/${book.nickname}/${book.bookImage}`}
                         className="mypage-book-image" 
                         alt="welcome" 
                    />
                </div>
                <div className="mypage-book-text">
                    <label>책 이름</label>
                    <div>
                        <p className="mypage-book-content">{book.bookName}</p>
                    </div>
                </div>
                <div className="mypage-book-text">
                    <label>저자</label>
                    <div>
                        <p className="mypage-book-content">{book.author}</p>
                    </div>
                </div>
                <div className="mypage-book-text">
                    <label>발행일</label>
                    <div>
                        <p className="mypage-book-content">{book.pubDate}</p>
                    </div>
                </div>
                <div className="mypage-book-text">
                    <label>나의 메모</label>
                    <div>
                        <p className="mypage-book-content">{book.memo}</p>
                    </div>
                </div>
            </div>
        </div>
      )
   }

   //책 추가 모달 UI
   renderBookAdd(){
      return(
          <form id="addForm" onSubmit={this.addSubmit} encType="multipart/form-data">
              <div>
                <label className="mypage-add-text">책 이미지</label>
                <input type="file"
                        name="bookImage" 
                        className="form-control mypage-add-image" 
                        accept=".jpg, .jpeg, .png"
                />
              </div>
              <div className="mypage-add-text">
                  <label>책 이름</label>
                  <div>
                        <input name="bookName" className="form-control" type="text" />
                  </div>
              </div>
              <div className="mypage-add-text">
                  <label>저자</label>
                  <div>
                        <input name="author" className="form-control" type="text" />
                  </div>
              </div>
              <div className="mypage-add-text">
                  <label>발행일</label>
                  <div>
                        <input 
                            name="pubDate" 
                            className="form-control" 
                            type="text" 
                            onFocus={() => document.querySelector('.modalContent').classList.add('mypage-modal-pubdate')} 
                            onBlur={() => document.querySelector('.modalContent').classList.remove('mypage-modal-pubdate')}
                        />
                  </div>
              </div>
              <div className="mypage-add-text">
                  <label>MEMO</label>
                  <div>
                        <textarea 
                            name="memo" 
                            className="form-control" 
                            type="text" 
                            rows="3"
                            onFocus={() => document.querySelector('.modalContent').classList.add('mypage-modal-memo')} 
                            onBlur={() => document.querySelector('.modalContent').classList.remove('mypage-modal-memo')}
                        />
                  </div>
              </div>
              <div className="mypage-add-footer text-center">
                    <input className="btn btn-primary" type="submit" value="추가하기"/>
              </div>
          </form>
      );
   }

   //책 수정 모달 UI
   renderBookModify(){
      return(
          <form id="modifyForm" onSubmit={this.modifySubmit} encType="multipart/form-data">
              <div className="mypage-modify-no">
                    <input name="no" 
                        className="form-control" 
                        type="text" 
                        value={this.state.no}
                        onChange={(e) => this.setState({no: e.target.value})}
                    />
              </div>
              <div className="mypage-modify-text">
                    <label>책 이름</label>
                    <div>
                        <input name="bookName" 
                               className="form-control" 
                               type="text" 
                               value={this.state.bookName}
                               onChange={(e) => this.setState({bookName: e.target.value})} 
                        />
                    </div>
              </div>
              <div className="mypage-modify-text">
                    <label>저자</label>
                    <div>
                        <input name="author" 
                               className="form-control" 
                               type="text" 
                               value={this.state.author}
                               onChange={(e) => this.setState({author: e.target.value})}  
                        />
                    </div>
              </div>
              <div className="mypage-modify-text">
                    <label>발행일</label>
                    <div>
                        <input name="pubDate" 
                               className="form-control" 
                               type="text" 
                               value={this.state.pubDate}
                               onChange={(e) => this.setState({pubDate: e.target.value})}
                               onFocus={() => document.querySelector('.modalContent').classList.add('mypage-modal-pubdate')} 
                               onBlur={() => document.querySelector('.modalContent').classList.remove('mypage-modal-pubdate')}
                        />
                    </div>
              </div>
              <div className="mypage-modify-text">
                    <label>MEMO</label>
                    <div>
                            <textarea name="memo" 
                                className="form-control" 
                                type="text"
                                rows="3" 
                                value={this.state.memo}
                                onChange={(e) => this.setState({memo: e.target.value})}
                                onFocus={() => document.querySelector('.modalContent').classList.add('mypage-modal-memo')} 
                                onBlur={() => document.querySelector('.modalContent').classList.remove('mypage-modal-memo')} 
                            />
                    </div>
              </div>
              <div className="mypage-modify-footer text-center">
                    <input className="btn btn-primary" type="submit" value="수정하기"/>
              </div>
          </form>
      );
  }

   //전체적인 '마이페이지' 화면 UI 렌더링
   render(){
      return(
         <div className="mypage-top">
            {/* 맨 윗줄 - 회원관리정보 */}
            <div>
               <span>
                  <button className="mypage-btn btn btn-primary" onClick={this.bookAddModal} >책 추가하기</button>
               </span>
               <span className="mypage-top-right">
                  <Link to="/home"
                        className="mypage-btn btn btn-primary mypage-home-btn"
                   >
                     홈 화면으로 돌아가기
                   </Link>
                  <button className="mypage-btn btn btn-danger" onClick={this.clickLogOut}>로그아웃</button>
               </span>
            </div>

            {/* 회원의 책 정보들 */}
            <div>
                { this.props.books.map( (book) => { return this.renderBook(book) }) }   
            </div>

            {/* 책 추가 */}
            <div>
                <Modal show={this.state.isAdd}
                       onClose={this.bookAddModal}
                >
                    {this.renderBookAdd()}
                </Modal>
            </div>

             {/* 책 수정 */}
             <div>
                <Modal show={this.state.isModify}
                       onClose={this.bookModifyModal}
                >
                    {this.renderBookModify()}
                </Modal>
              </div>
         </div>
      );
   }
}

//Redux를 사용하여 사용자의 책 정보들을 books로 가져옴
function mapStateToProps(state) {
    return { books: state.books }
}

//Redux를 연결한 MyPage 컴포넌트를 내보냄
export default connect(mapStateToProps, { fetchBooks })(MyPage);
