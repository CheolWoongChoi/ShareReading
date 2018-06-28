
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
   }

   componentDidMount(){
      this.props.fetchBooks();
   }

   clickLogOut(){
      axios.get('/auth/logout');
   }

   addSubmit(event){
      //console.log(event.target);
      event.preventDefault();

      let addForm = document.getElementById('addForm');
      let formData = new FormData(addForm);
      console.log(formData);

      axios.post('/mypage/add', formData)
         .then( (res) => {
            console.log(res.data);
            this.props.history.push('/mypage');
        });
   }

   modifySubmit(event){
    //console.log(event.target);
    event.preventDefault();

    let modifyForm = document.getElementById('modifyForm');
    let formData = new FormData(modifyForm);
    
    axios.post('/mypage/modify', formData)
       .then( (res) => {
            console.log(res.data);
            this.props.history.push('/mypage');
      });
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
           axios.delete(`/mypage/delete?bookImage=${bookImage}`)
            .then( (res) => {
                this.props.history.push('/mypage');
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
                >정보 수정</button>
                <button className="mypage-btn btn btn-danger" 
                    onClick={() => this.bookDelete(book.bookImage)} 
                >삭제</button>
            </div>
            <div className="mypage-book-content">
                <div>
                    <img src={require(`../../server/uploads/${book.nickname}/${book.bookImage}`)} 
                        width="250px"
                        height="300px" 
                        alt="welcome" 
                    />
                </div>
                <div className="mypage-book-text">
                    <label className="">책명</label>
                    <div className="">
                        <p>{book.bookName}</p>
                    </div>
                </div>
                <div className="mypage-book-text">
                    <label className="">저자</label>
                    <div className="">
                        <p>{book.author}</p>
                    </div>
                </div>
                <div className="mypage-book-text">
                    <label className="">발행일</label>
                    <div className="">
                        <p>{book.pubDate}</p>
                    </div>
                </div>
                <div className="mypage-book-text">
                    <label className="">나의 메모</label>
                    <div className="">
                        <p>{book.memo}</p>
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
                  <label className="">책명</label>
                  <div className="">
                        <input name="bookName" className="form-control" type="text" />
                  </div>
              </div>
              <div className="mypage-add-text">
                  <label className="">저자</label>
                  <div className="">
                        <input name="author" className="form-control" type="text" />
                  </div>
              </div>
              <div className="mypage-add-text">
                  <label className="">발행일</label>
                  <div className="">
                        <input name="pubDate" className="form-control" type="text" />
                  </div>
              </div>
              <div className="mypage-add-text">
                  <label className="">MEMO</label>
                  <div className="">
                        <textarea name="memo" className="form-control" type="text" />
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
                    <label className="">책명</label>
                    <div className="">
                        <input name="bookName" 
                               className="form-control" 
                               type="text" 
                               value={this.state.bookName}
                               onChange={(e) => this.setState({bookName: e.target.value})} 
                        />
                    </div>
              </div>
              <div className="mypage-modify-text">
                    <label className="">저자</label>
                    <div className="">
                        <input name="author" 
                               className="form-control" 
                               type="text" 
                               value={this.state.author}
                               onChange={(e) => this.setState({author: e.target.value})}  
                        />
                    </div>
              </div>
              <div className="mypage-modify-text">
                    <label className="">발행일</label>
                    <div className="">
                        <input name="pubDate" 
                               className="form-control" 
                               type="text" 
                               value={this.state.pubDate}
                               onChange={(e) => this.setState({pubDate: e.target.value})} 
                        />
                    </div>
              </div>
              <div className="mypage-modify-text">
                    <label className="">MEMO</label>
                    <div className="">
                            <textarea name="memo" 
                                className="form-control" 
                                type="text" 
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
                  <button className="mypage-btn btn btn-primary" onClick={this.bookAddModal} >책 추가</button>
               </span>
               <span className="mypage-top-right">
                  <Link to="/home" className="mypage-btn btn btn-primary">홈 화면</Link>
                  <Link to="/" className="mypage-btn btn btn-danger" onClick={this.clickLogOut}>로그아웃</Link>
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
