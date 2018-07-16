
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
        nickname: '',

        isAdd: false,
        isModify: false,

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

   componentDidMount(){
        axios.get('/api/sessionInfo')
                .then( (res) => {

                    console.log('MyPage Session Info');
                    console.log(res.data);

                    if(res.data)
                        this.setState({nickname: res.data.nickname});
                    // else{
                    //         window.alert('로그인이 필요합니다!');
                    //         this.props.history.push('/');
                    // }
        });

        this.props.fetchBooks();
   }

   clickLogOut(){
      axios.get('/api/auth/logout')
        .then( (res) => {
            this.props.history.push('/');
        });
   }

   addSubmit(event){
      //console.log(event.target);
      event.preventDefault();
      
      if(window.confirm('추가하시겠습니까?')){
        let addForm = document.getElementById('addForm');
        let addData = new FormData(addForm);

        for(let value of addData.values()){
            if(value.size === 0 || value.length === 0){
                window.alert('모든 데이터를 입력하셔야 합니다!');
                return;
            }
        }

        axios.post('/api/mypage/add', addData)
            .then( (res) => {
                //console.log(res.data);
                if(res.data){
                    window.alert('성공적으로 책이 추가되었습니다!');
                    //this.props.history.push('/mypage');
                    window.location.reload();
                } else{
                    window.alert('일시적인 오류로 다시 시도해주세요.');
                }
            });
      }
   }

   modifySubmit(event){
    //console.log(event.target);
     event.preventDefault();

     if(window.confirm('수정하시겠습니까?')){
        let modifyForm = document.getElementById('modifyForm');
        let modifyData = new FormData(modifyForm);
        
        for(let value of modifyData.values()){
            if(value.size === 0 || value.length === 0){
                window.alert('모든 데이터를 입력하셔야 합니다!');
                return;
            }
        }

        axios.post('/api/mypage/modify', modifyData)
            .then( (res) => {
                //console.log(res.data);
                if(res.data){
                    window.alert('성공적으로 책이 수정되었습니다!');
                    window.location.reload();
                } else{
                    window.alert('일시적인 오류로 다시 시도해주세요.');
                }
            });
     }
   }

   bookAddModal(){
      this.setState({
        isAdd: !this.state.isAdd
      });
   }
 
   bookModifyModal(book){
      this.setState({
        isModify: !this.state.isModify,
        no: book.no,
        bookName: book.bookName,
        author: book.author,
        pubDate: book.pubDate,
        memo: book.memo
      });
   }

   bookDelete(bookImage){
       if(window.confirm('삭제하시겠습니까?')){
           //console.log('삭제');
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
       else{
           //console.log('취소');
       }
   }

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
                    {/* <img src={`/uploads/${book.nickname}/${book.bookImage}`} */}
                    <img src={require(`../../server/uploads/${book.nickname}/${book.bookImage}`)} 
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

   renderBookAdd(){
      return(
          <form id="addForm" onSubmit={this.addSubmit} encType="multipart/form-data">
              <div>
                <label className="mypage-add-text">책 이미지</label>
                <input type="file"
                        name="bookImage" 
                        className="form-control mypage-add-text" 
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
                        <input name="pubDate" className="form-control" type="text" />
                  </div>
              </div>
              <div className="mypage-add-text">
                  <label>MEMO</label>
                  <div>
                        <textarea name="memo" className="form-control" type="text" rows="3"/>
                  </div>
              </div>
              <div className="mypage-add-footer text-center">
                    <input className="btn btn-primary" type="submit" value="추가하기"/>
              </div>
          </form>
      );
   }

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
                            />
                    </div>
              </div>
              <div className="mypage-modify-footer text-center">
                    <input className="btn btn-primary" type="submit" value="수정하기"/>
              </div>
          </form>
      );
  }

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
                    onClose={this.bookAddModal}>
                    {this.renderBookAdd()}
                </Modal>
            </div>

             {/* 책 수정 */}
             <div>
                <Modal show={this.state.isModify}
                    onClose={this.bookModifyModal}>
                    {this.renderBookModify()}
                </Modal>
              </div>
         </div>
      );
   }
}

function mapStateToProps(state) {
    return { books: state.books }
}

export default connect(mapStateToProps, { fetchBooks })(MyPage);
